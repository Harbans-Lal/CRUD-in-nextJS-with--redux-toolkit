import React from 'react'
import { NavDrawerDefault } from '@/components/Nav';

 const addProduct = () => {
  return (
    <div className='flex'>
      <NavDrawerDefault />
      <div> 
        <h1 className='test'>Add product</h1>
      </div>
    </div>
  )
}

export default addProduct;