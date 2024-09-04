import * as React from "react";
import { makeStyles, useId, Input, Label, Button } from "@fluentui/react-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import {object, string} from 'yup'
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": { display: "flex", flexDirection: "column", gap: "2px" },
  },
});
const editVlaidation = object({
    firstName:string().min(3,"minimum 3 letters is required").required("field is required"),
    lastName:string().min(2,"minimum 2 letters is required").required('field is reaquired'),
    role:string(),
    email:string().required('emai is required >>>>>>>>>>')
})
interface formValue{
    firstName:string,
    lastName:string,
    role:string,
    email:string

}
export const AddUser = ({setAddToggle ,setAllUser }) => {

 
    const {register, handleSubmit,setValue, formState:{errors}} = useForm<formValue>({
        resolver:yupResolver(editVlaidation),
       
    })

    const fName = useId("input-fName");
    const lName = useId("input-lName");
    const role = useId("input-role");
    const email = useId("input-email")
    const styles = useStyles();




    const handleAdd = (data) =>{
      console.log(data, ">>>>>>>>>>>>>>>>>>")

      fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:data.firstName,
         lastName:data.lastName,
         email:data.email,
         role:data.role
        })
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data, "new user data>>>>>>>>>>")
        setAllUser(prev => [...prev, data] )
        setAddToggle(false)
      });
 
    }

  return (
    <form onSubmit={handleSubmit(handleAdd)}  noValidate autoComplete="off" className={styles.root}>
        <h1 className="text-xl font-bold">Add User</h1>
      <div>
        <Label htmlFor={fName}>firstname</Label>
        <Input type="text"   id={fName} 

            {...register("firstName") }
          name="firstName"/>
         {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <Label htmlFor={lName}>lastname</Label>
        <Input type="text" id={lName} {...register('lastName')} name="lastName"/>
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>
      <div>
        <Label htmlFor={email}>Email</Label>
        <Input type="email" id={email}  {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor={role}>role</Label>
        <Input type="text"   id={role} {...register('role')} name="role"/>

      </div>
      <div>
        <Button type='submit'>Add</Button>
      </div>
    </form>
  );
};