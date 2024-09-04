import React, { useEffect, useState } from 'react'
import { NavDrawerDefault } from '@/components/Nav';
import ImageCard from '@/components/ImageCard';
import { Button } from '@fluentui/react-components';
import {AddFilled} from '@fluentui/react-icons'
 const products = () => {
    const [allProducts, setAllProducts] = useState([])
    useEffect(()=>{
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            setAllProducts(data.products)
        });
    },[])
  return (
    <div className='flex'>
      <NavDrawerDefault />
        <div className='flex w-full flex-wrap'> 
            <h1 className='text-2xl  text-center'>Products</h1>
           
            {allProducts.map((item, ind)=>{
                return   <ImageCard key={ind} id={ind} items={item} />
            })}
           
        </div>
    
    </div>
  )
}

export default products;