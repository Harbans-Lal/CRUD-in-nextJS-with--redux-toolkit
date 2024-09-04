import * as React from "react";
import { makeStyles, useId, Input, Label, Button } from "@fluentui/react-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from '../../../redux/productSlice/productSlice';

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
  image: string(), 
  price: number().required("Price is required").transform((value) => !value ? 0 : Number(value))
});

interface FormValue {
  title: string;
  description: string;
  image: string; 
  price: number;
}

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValue>({
    resolver: yupResolver(editValidation),
  });

  const title = useId("input-title");
  const description = useId("input-description");
  const image = useId("input-image");
  const price = useId("input-price");

  const styles = useStyles();

  const handleAdd = async (data) => {
    console.log(data, "add data>>>>>>>>>>>>>>>>>>");
  
    const formattedData = {
      ...data,
      images: [data.image] 
    };

  

    dispatch(addProduct(formattedData));

   
    let role = JSON.parse(localStorage.getItem('role'));
    console.log(role, "role")
    router.push(`/${role}/products`);
  };

  return (
    <>
      <div className="flex justify-center">
      <form onSubmit={handleSubmit(handleAdd)} noValidate autoComplete="off" className={`${styles.root} w-[500px] `}>
      <h1 className="text-xl font-bold">Add Product</h1>
      <div>
        <Label htmlFor={title}>Title</Label>
        <Input type="text" id={title} {...register("title")} name="title" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor={description}>Description</Label>
        <Input type="text" id={description} {...register('description')} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor={image}>Image URL</Label>
        <Input type="url" id={image} {...register('image')} />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <div>
        <Label htmlFor={price}>Price</Label>
        <Input type="number" id={price} {...register('price')} name="price" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <Button type='submit'>Add Product</Button>
      </div>
    </form>
      </div>
    </>
  
  );
};

export default AddProduct;
