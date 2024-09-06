// Home.js
import React, { useEffect} from 'react';
import { Button } from '@fluentui/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost , deletePost, getSinglepost} from '@/Redux/postsSlice/postsSlice';
import AddPOst from '@/components/AddPostForm';
import UpdatePost from '@/components/UpdatePostForm';
import { NavDrawerDefault } from '../../../components/Nav';

const Home = () => {
  const dispatch = useDispatch();
  const postData = useSelector((data:any) => data.postReducer)

  const {posts} = postData;


  useEffect(() =>{
    dispatch(fetchPost());
  
  },[])

  const handleClick = (id) =>{
    dispatch(getSinglepost(id))
  }
 return(
    <div className='flex'>
        <NavDrawerDefault />
      <div className='flex justify-around'>
        {posts?.map(item =>{
          return (
            <div className='ml-7' key={item.id}>
              <p>{item.title}</p>
              <p>{item.body}</p>
              <Button appearance="primary" onClick={()=>dispatch(deletePost(item.id))}>Delete</Button>
              <Button onClick={() => handleClick(item.id)}>Edit</Button>
            </div>
          )
        })}
      </div>   
      <div className=' flex justify-around' >
        <AddPOst />
        <UpdatePost />
      </div>
    </div>
 );
};

export default Home;
