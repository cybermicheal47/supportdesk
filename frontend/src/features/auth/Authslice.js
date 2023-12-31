import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Authservice from "./Authservice";
//import user from local storage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {

    user: user ? user: null,
    isError : false,
    isSuccess : false,
    isLoading: false,
    message: ''
}

//Register new user
export const register = createAsyncThunk(
    'auth/register',
    async(user,thunkAPI) =>{
  try {
    return await Authservice.register(user)
  } catch (error) {
    const message =  (
        error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString()


    return thunkAPI.rejectWithValue(message)
  }




    }
)

//login user
export const login = createAsyncThunk(
    'auth/login',
    async(user,thunkAPI) =>{
      try {
        return await Authservice.login(user)
      } catch (error) {
        const message =  (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()


        return thunkAPI.rejectWithValue(message)
        }    
    }
)

//logout user 

export const logout = createAsyncThunk('auth/logout', async() => {
  await Authservice.logout()
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
 reset : (state) =>{
    state.isLoading= false
    state.isError = false
    state.isSuccess = false
    state.message = ''
 }


    },
    extraReducers: (builder) =>{
     builder
     .addCase(register.pending, (state)=>{
        state.isLoading = true
     })
     .addCase(register.fulfilled,(state,action)=>{
        state.isLoading =false
        state.isSuccess = true
        state.user =action.payload
     })

     .addCase(register.rejected,(state,action)=>{
        state.isLoading =false
        state.isError = true
        state.user =null
        state.message = action.payload
     })



     .addCase(login.pending, (state)=>{
      state.isLoading = true
   })
   .addCase(login.fulfilled,(state,action)=>{
      state.isLoading =false
      state.isSuccess = true
      state.user =action.payload
   })

   .addCase(login.rejected,(state,action)=>{
      state.isLoading =false
      state.isError = true
      state.user =null
      state.message = action.payload
   })



     .addCase(logout.fulfilled, (state) =>{
      state.user = null
     })

    },
})
 export const {reset} =authSlice.actions
export default authSlice.reducer