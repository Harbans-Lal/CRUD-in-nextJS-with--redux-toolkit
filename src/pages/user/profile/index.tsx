import React, { useEffect } from 'react'
import { NavDrawerDefault } from '@/components/Nav';
import { useRouter } from 'next/router';
 const profile = () => {
  const router = useRouter();
  useEffect(()=>{
    
    let token = JSON.parse(localStorage.getItem('dummyToken'));
    if(!token){
      router.push('/login');
    }
  },[])
  return (
    <div className='flex'>
      <NavDrawerDefault />
      <div> 
        <h1>Wecomwe to home</h1>
      </div>
    </div>
  )
}

export default profile;