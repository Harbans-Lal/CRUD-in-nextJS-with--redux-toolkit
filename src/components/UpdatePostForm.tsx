import * as React from "react";
import { makeStyles, useId, Input, Label, Button, Textarea, Display } from "@fluentui/react-components";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

import { useDispatch,  useSelector } from "react-redux";
import { updatePost } from "@/Redux/postsSlice/postsSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    maxWidth: "400px",
    marginTop: "20px",
    justifyContent: "center"
  },
});

const formValidation = object({
    title: string().required("field is required"),
    body: string().min(5, "minimum 5 letters are required").required("field is required")
});

const UpdatePost = () => {
    const dispatch = useDispatch();
    const postData = useSelector((data:any) => data.postReducer)
    const {singlepost} = postData;


    const inputTitle = useId("input-title");
    const body = useId('textarea-body');
    const styles = useStyles();

    const {getValues, register, handleSubmit,setValue,resetField, reset,formState: { errors } } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: { userId: 0, title: '', body: '' } 
    });

   

    const handleUpdate = (data) => {
        if (singlepost) {
            dispatch(updatePost({ id: singlepost.id, data }));
        }
        reset()
    }
        

    console.log("getValues",getValues())
    
 
    React.useEffect(() =>{
        const values = ['id', 'title', 'body'];
        if(singlepost){
            values.forEach(val => setValue(val, singlepost[val]))

        }
    },[singlepost])

    return (
        <form onSubmit={handleSubmit(handleUpdate)}  className={styles.root} key={Math.random()}>
            <Display>Edit</Display>

           
            <Label htmlFor={inputTitle} required>
                Title
            </Label>
            <Input
                id={inputTitle}
                {...register('title')}
                name="title"
                placeholder="title of post"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <Label htmlFor={body} required>
                body
            </Label>
            <Textarea
                id={body}
                {...register('body')}
                rows={3}
                cols={50}
                name="body"
            />
            {errors.body && <p className="text-red-500">{errors.body.message}</p>}
            <Button appearance="primary" type="submit">
                Update
            </Button>
        </form>
    );
};

export default UpdatePost;
