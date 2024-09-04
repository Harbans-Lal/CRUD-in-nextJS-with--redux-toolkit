// import React, { useEffect, useState } from 'react'
// import { NavDrawerDefault } from '@/components/Nav';
// import { useRouter } from 'next/router';
// import CustomTable from '@/components/Table';
//  const users = () => {
//   const router = useRouter();
//   const [allUser, setAllUser] = useState({});
//   useEffect(()=>{
    
//     let token = JSON.parse(localStorage.getItem('dummyToken'));
//     if(!token){
//       router.push('/login');
//     }
//     fetch('https://dummyjson.com/users')
//     .then(res => res.json())
//     .then(data => setAllUser(data));
//   },[])

//   return (
//     <div className='flex'>
//         <NavDrawerDefault />
//         <CustomTable allUser={allUser} />
//     </div>
//   )
// }

// export default users;

"use client"
import React, { useEffect, useState } from 'react';
import { NavDrawerDefault } from '@/components/Nav';
import { useRouter } from 'next/router';
import CustomTable from '@/components/Table';

const Users = () => {
  const router = useRouter();
  const [allUser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('dummyToken')) : null;

    if (!token) {
      router.push('/login');
      return; // Ensure no further code execution
    }
    
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => {
        setAllUser(data.users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
      <NavDrawerDefault />
      <CustomTable allUser={allUser} setAllUser={setAllUser} />
    </div>
  );
};

export default Users;
