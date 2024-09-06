import React, { useEffect, useState } from 'react'
import { NavDrawerDefault } from '@/components/Nav';
import ImageCard from '@/components/ImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/productSlice/productSlice';
import EditProduct from '@/components/EditProduct';

 const Products = () => {
  const [editData, setEditData] = useState({});
  const [toggleEditForm, setToggleEditForm] = useState(false);
    const dispatch = useDispatch();
   
  const products = useSelector((state: any) => state.products);
  const {status} = products;
 
    
      // useEffect(() =>{
      //   dispatch(fetchProducts())
      
      // },[])

      useEffect(() => {
        if (status === 'idle' || status === 'failed') {
          dispatch(fetchProducts());
        }
      }, [status, dispatch]);

      const handleEDitid = (id) =>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setEditData(data));
      }

      
  return (
    <div className='flex'>
      <NavDrawerDefault  />
        <div className='flex w-full flex-wrap'> 
            <h1 className='text-2xl  text-center'>Products</h1>
            {toggleEditForm && <EditProduct toggle={setToggleEditForm} editData = {editData} />}
            {products?.products?.map((item, ind)=>{
                return   <ImageCard key={ind} id={ind} items={item} editId={handleEDitid} toggle={setToggleEditForm} />
            })}
           
        </div>
    
    </div>
  )
}

export default Products;