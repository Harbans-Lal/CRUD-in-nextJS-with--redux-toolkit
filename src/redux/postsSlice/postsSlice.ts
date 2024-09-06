import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface IaddPost{
    id:number,
    title:string,
    description:string
}

interface IintialState {
    posts: IaddPost[],
    singlepost: IaddPost | null,
    status: 'loading' | 'success' | 'error' | 'pending',
}
//fetch all post >>>>>>>>>>>>>>>

export const fetchPost = createAsyncThunk('posts/fetchPosts' , async () =>{
    const response = await fetch('https://66daccf2f47a05d55be608d4.mockapi.io/products/procuts')
    const data = await response.json();
    return data;
    
})


//fetch single post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const fetchSinglePost = createAsyncThunk('posts/singlePost',async (id)=>{
     const response = await  fetch(`https://dummyjson.com/posts/${id}`)
     const data = response.json();
     return data;
})


//add new post >>>>>>>>>>>>>>>>>>>>>>

export const addNewPost = createAsyncThunk('posts/addPost', async(data) =>{
    const response  = await fetch('https://66daccf2f47a05d55be608d4.mockapi.io/products/procuts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
     const newData = await response.json();
     return newData;
})


//get single user >>>>>>>>>>>>>>>>>>>>>

export const getSinglepost = createAsyncThunk('post/singlePost', async(id)=>{
    const response = await fetch(`https://66daccf2f47a05d55be608d4.mockapi.io/products/procuts/${id}`);
    const data = await response.json();
    return data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async(id) =>{
    const response = await fetch(`https://66daccf2f47a05d55be608d4.mockapi.io/products/procuts/${id}`, {
        method:'DELETE'
    })
    const data = await response.json();
    return data;
})

//update post >>>>>>>>>>>>>>>>>>

export const updatePost = createAsyncThunk('posts/updatePost', async({ id, data }) => {
    const response = await fetch(`https://66daccf2f47a05d55be608d4.mockapi.io/products/procuts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
});



const initalState: IintialState = {
    posts: [],
    singlepost: null,
    status: 'pending'
}

const postSlice = createSlice({
    name: 'allPost',
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts = action.payload;
            })
            .addCase(fetchPost.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(fetchSinglePost.pending, (state) => {
                state.status = 'pending';
                state.singlepost = null;
            })
            .addCase(fetchSinglePost.fulfilled, (state, action) => {
                state.status = 'success';
                state.singlepost = action.payload;
            })
            .addCase(fetchSinglePost.rejected, (state) => {
                state.status = 'error';
                state.singlepost = null;
            })

             //add new post >>>>>>>>>>>>>>>>>>>>>>>>>>>>
            .addCase(addNewPost.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts.push(action.payload)
            })
            .addCase(addNewPost.rejected, (state) => {
                state.status = 'error';
            })

            //delete a post >>>>>>>>>>>>>>>
        
            .addCase(deletePost.pending,(state) =>{
                state.status = 'pending'
            })
            .addCase(deletePost.fulfilled,(state, action) =>{
                state.status = 'success',
                state.posts = state.posts.filter((item) => item.id !==action.payload.id)
            })
            .addCase(deletePost.rejected, (state) =>{
                state.status = 'error'
            })


            //get single data >>>>>>>>>>>>>>>>>>>>>

            .addCase(getSinglepost.pending, (state) =>{
                state.status = 'pending'
            })
            .addCase(getSinglepost.fulfilled, (state, action) =>{
                state.status = 'success',
                state.singlepost = action.payload
            })
            .addCase(getSinglepost.rejected, (state) =>{
                state.status = 'error'
            })

            .addCase(updatePost.pending, (state) =>{
                state.status = 'pending'
            })
            .addCase(updatePost.fulfilled , (state, action) =>{
               const updatedPostt = action.payload;
                const index = state.posts.findIndex(post => post.id === updatedPostt.id)
                if(index !== -1){
                    state.posts[index] = updatedPostt
                }
            })
            .addCase(updatePost.rejected, (state) =>{
                state.status = 'error'
            })
    }
});



export default postSlice.reducer;