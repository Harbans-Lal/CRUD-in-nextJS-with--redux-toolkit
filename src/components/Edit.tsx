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
    // role:string()
})
interface formValue{
    firstName:string,
    lastName:string,
    // role:string

}
export const Type = ({allData, currentId, setAllUser,setEditToggle}) => {

    let currentUserData = allData.filter(item => item.id === currentId)
    let currentUser = currentUserData.reduce((acc,val)=> acc.val = val, {})
   console.log()
 
    const {register, handleSubmit,setValue, formState:{errors}} = useForm<formValue>({
        resolver:yupResolver(editVlaidation),
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            // role: currentUser.role
          }
    })

    const fName = useId("input-fName");
    const lName = useId("input-lName");
    // const role = useId("input-role");
    const styles = useStyles();



    React.useEffect(()=>{
    const fromFields= ["firstName","lastName","role"]

    fromFields.forEach((item)=> setValue(item,currentUser[item]))

    },[currentUser])




    const handleupdate = (data) =>{
    
    fetch(`https://dummyjson.com/users/${currentId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        firstName:data.firstName,
        lastName: data.lastName,
        // role:data.role
        })
    })
    .then(res => res.json())
    .then( data => {
        console.log(data,"response edit data")
        setAllUser(prevUsers => 
            prevUsers.map(user => 
                user.id === currentId ? { ...user, ...data } : user
            )
        );
        setEditToggle(false)

       
    })
 
    }

  return (
    <form onSubmit={handleSubmit(handleupdate)}  noValidate autoComplete="off" className={styles.root}>
        <h1 className="text-xl font-bold">User</h1>
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

      {/* <div>
        <Label htmlFor={role}>role</Label>
        <Input type="text"   id={role} {...register('role')} name="role"/>

      </div> */}
      <div>
        <Button type='submit'>Update</Button>
      </div>
    </form>
  );
};