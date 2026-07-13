import React from 'react'
import { useContext } from 'react'
import { useAuth } from '../context/auth.context'
import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Auth() {
 const navigate=useNavigate();
  const [currentState,setCurrentState]=useState('Login');

  const {token,setToken,backendUrl}=useAuth();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const onsumbitHandler=async(e)=>{
    e.preventDefault();
    try {
      if(currentState==='Sign up'){
        const response=await axios.post(backendUrl+"/api/auth/register",{name,email,password});
        console.log(response.data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendUrl+"/api/auth/login",{email,password});
        
        if(response.data.success){
          setToken(response.data.token);
          toast.success("user logged")
          console.log(token)
          localStorage.setItem('token',response.data.token); 
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }
  useEffect(()=>{
      if(token){
        navigate('/dashboard')
      }
    },[token])
  return (
    <form onSubmit={onsumbitHandler}  className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-4xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' required />}
       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email' required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800 ' placeholder='password' required />

        <div className='w-full flex justify-between text-sm -mt-8px]'>
          <p className='cursor-pointer'>Forgot Password?</p>
          {
            currentState==='Login'?
            <p className='cursor-pointer' onClick={()=>setCurrentState('Sign up')}>create account</p>
            :
            <p className='cursor-pointer' onClick={()=>setCurrentState('Login')}> Login here</p>
          }
        </div>
        <button className=' bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState==='Login'?'Login':'Sign Up'}
        </button>
    </form>
  )
}

export default Auth