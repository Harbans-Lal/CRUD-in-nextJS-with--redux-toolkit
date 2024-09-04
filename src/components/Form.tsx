import * as React from "react";
import { makeStyles, useId, Input, Label ,Button} from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { string, object } from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    maxWidth: "400px",
    "> div": { display: "flex", flexDirection: "column", gap: "2px" },
  },
});

 const Form = () => {
  const emailId = useId("input-email");
  const passwordId = useId("input-password");
  const userName = useId("input-username")
  const styles = useStyles();
  const [toggle, setToggle] = React.useState(true);


  const loginValidation = object({
    username:string().required("username is required").min(4,"username muser have 4 leeters"),
    password:string().required("passwrod is required").min(6,"password must have 6 letters")
  })
  interface formValue{
    username:string,
    password:string
  }

  const {register, handleSubmit,formState:{errors}} = useForm<formValue>(
    {
      resolver:yupResolver(loginValidation),
      defaultValues:{username:"", password:""}
    }
  );
  const router = useRouter();


  const handleLogin =  (data:any) =>{
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({     
        username: data.username,
        password: data.password,
      })
    })
    .then(res => {
      console.log(res, "res in login form>>>>>>>>>>>>>>>>>>")
          if(res?.ok){
            return res.json()
          }
    })
    .then(val =>{
      console.log(val,"api data>>>>>>>>>>>>>>>>")
      localStorage.setItem("dummyToken",JSON.stringify(val.token))
    })
    .catch(err => console.log('..............m',err))
   }

  const checkRole = (role:string) =>{
    if(role=='admin'){
      return 'admin'
    }else if(role=='user'){
      return 'user'
    }
  }
  React.useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('dummyToken'));
    if(!token){
      router.push('/login')
    }else{
     
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        }, 
      })
      .then(res => res.json())
      .then(data=>{ 
        
       const theRole = data.role;
       localStorage.setItem('role', JSON.stringify(theRole));
       const theLocalStorgeRole = JSON.parse(localStorage.getItem('role'));
        
       if(theLocalStorgeRole){
        router.push(`/${theLocalStorgeRole}/home`)
       }else{
        router.push('/login')
       }
       
      })
      .catch(err => console.log(err))
     
    }
  },[router])

  return (
    <>
      {toggle?
         <form onSubmit={handleSubmit(handleLogin)}  noValidate autoComplete="off" className={styles.root}>
           <div>
            <Label htmlFor={userName}>User Name</Label>
            <Input type="text" placeholder="johndoe" id={userName}

              {...register("username", {
                required: true,
              })} 
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div>
            <Label htmlFor={passwordId}>Password </Label>
            <Input type="password" placeholder="password" id={passwordId} 
              {
                ...register("password" , {
                  required:true,
                  minLength:6
                })
              }
             />
             {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          </div>
  
          <div>
          <Button type="submit">Login</Button>
          <p>new here? <a className="cursor-pointer" onClick={()=> setToggle(!toggle)}>Sign up</a></p>
          </div>
        </form>:

        <form noValidate autoComplete="off" className={styles.root}>
          <div>
            <Label htmlFor={userName}>User Name</Label>
            <Input type="text" placeholder="John" id={userName}  />
          </div>
          <div>
            <Label htmlFor={emailId}>Email </Label>
            <Input type="email" placeholder="john@gmail.com" id={emailId} />
          </div>
          <div>
            <Label htmlFor={passwordId}>Password </Label>
            <Input type="password" placeholder="password" id={passwordId} />
          </div>

          <div>
          <Button >Sign Up</Button>
          <p>Already exist ? <a className="cursor-pointer" onClick={()=> setToggle(!toggle)}>Log in</a></p>
          </div>
        </form>
       
      }
       

      
    </>
   
    

  );
};

export default Form;