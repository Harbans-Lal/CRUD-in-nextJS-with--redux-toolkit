import * as React from "react";
import { makeStyles, useId, Input, Label, Button } from "@fluentui/react-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateProduct } from "@/redux/productSlice/productSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
    "> div": { display: "flex", flexDirection: "column", gap: "2px" },
  },
});

const editValidation = object({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  price: number().required("Price is required").transform((value) => !value ? 0 : Number(value))
});

interface FormValue {
  title: string;
  description: string;
  price: number;
}

const EditProduct = ({editData,toggle}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue,formState: { errors } } = useForm<FormValue>({
    resolver: yupResolver(editValidation),
   
  });

  const title = useId("input-title");
  const description = useId("input-description");
  const price = useId("input-price");

  const styles = useStyles();

  const handleEdit = (data) => {
    console.log(data, "my edit data >>>>>>>> ")
    let role = JSON.parse(localStorage.getItem('role'));
    if(!data){
        
        router.push(`/${role}/products`);
        toggle(false)
    }else{
        dispatch(updateProduct({ id: editData.id, updates: data }));
        router.push(`/${role}/products`);
        toggle(false)
    }
  
  };
  React.useEffect(() =>{
    const formValue = ['title', 'description', 'price'];
    formValue.forEach(item => setValue(item, editData[item]))
  }, [editData])
  return (
    <form onSubmit={handleSubmit(handleEdit)} noValidate autoComplete="off" className={`${styles.root} w-[500px]`}>
      <h1 className="text-xl font-bold">Edit Product</h1>
      <div>
        <Label htmlFor={title}>Title</Label>
        <Input type="text" id={title} {...register("title") } name="title" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor={description}>Description</Label>
        <Input type="text" id={description} {...register('description')} name="description" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor={price}>Price</Label>
        <Input type="number" id={price} {...register('price')} name="price" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <Button type='submit'>update Product</Button>
      </div>
    </form>
  );
};

export default EditProduct;
