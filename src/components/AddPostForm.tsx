import * as React from "react";
import { makeStyles, useId, Input, Label, Button, Textarea, Display } from "@fluentui/react-components";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

import {  useDispatch } from "react-redux";
import { addNewPost } from "@/Redux/postsSlice/postsSlice";

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

const AddPOst = () => {
    const dispatch = useDispatch();
    const inputTitle = useId("input-title");
    const body = useId('textarea-body');

    const styles = useStyles();

    const { register, handleSubmit, reset,formState: { errors } } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: { userId: 0, title: '', body: '' } // Set default values
    });

    const handleForm = (data) => {
        dispatch(addNewPost(data));
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} className={styles.root}>
            <Display>Add</Display>
         
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
                Post
            </Button>
        </form>
    );
};

export default AddPOst;
