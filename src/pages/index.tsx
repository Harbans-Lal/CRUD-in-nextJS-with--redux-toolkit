import * as React from "react";
import { Spinner } from "@fluentui/react-components";
import type { SpinnerProps } from "@fluentui/react-components";
import { useRouter } from "next/router";
const Home = (props: Partial<SpinnerProps>) => {
  const router = useRouter();
  React.useEffect(() => {
   setTimeout(()=>{
    let role = JSON.parse(localStorage.getItem('role'));
    if(role){
      router.push(`/${role}/home`)
    }else{
      router.push('/login')
    }
   },4000)

  }, []); 

  return (
    <div className="flex justify-center items-center flex-col mt-8 gap-10">
      <h1 className="text-4xl">Welcome Home</h1>
      <Spinner size="huge" {...props} />
    </div>
  );
};

export default Home;
