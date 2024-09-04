import React, { useEffect, useState } from 'react'
import { NavDrawerDefault } from '@/components/Nav';
import { useRouter } from 'next/router';
import SelectableIndCaricator from '@/components/Card';


 const home = () => {
  const [userData, setUserData] = useState({});
  const router = useRouter();
  useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('dummyToken'));
    if(!token){
      router.push('/login');
    }
    /* providing token in bearer */
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      }, 
    })
    .then(res => res.json())
    .then(data => setUserData(data))
    .catch(err => console.log(err))
  },[])

  return (
    <div className='flex'>
      <NavDrawerDefault />
      <div> 
        <h1 className='text-4xl bold  mt-7 ml-5'>Welcome {userData.firstName} {userData.lastName} </h1>
      </div>
      <div className='flex mt-32 flex-col'>
          <SelectableIndCaricator />
      </div>
    </div>
  )
}

export default home;