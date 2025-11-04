import React, { useContext, useState } from 'react'
import assets from '../assets/assets/assets'
import { AuthContext } from '../../context/AuthContext.jsx'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDtaSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)
  

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === 'Sign up' && !isDtaSubmitted){
      setIsDataSubmitted(true)
      return;
    }
    
    login(currState=== "Sign up" ? "Signup" : "login", {fullName, email, password, bio})
  
  }
  return (
    <div className='min-h-screen  bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* ------- left-----*/}
      <img src={assets.logo_big} alt="" className='w-45'/>

      {/*------right-----*/}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
      <h2 className='font-medium text-2xl flex justify-between items-center'>
        {currState}
        {isDtaSubmitted && <img  onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
}
      </h2>
      {currState === "Sign up" && !isDtaSubmitted &&  (
        <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
         type="text" className='p-2 border border-gray-500 rounded-md 
        focus:outline-none focus:ring-2' placeholder='Full Name' required/>
      )}
      {!isDtaSubmitted && (
        <>
        {/*------email------*/}
        <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 foucs:ring-indigo-500'/>
        {/*----password----*/}
        <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password" placeholder='PassWord' required className='p-2 border border-gray-500 rounded-md 
        focus:outline-none focus:ring-2 foucs:ring-indigo-500'/>
        </>
      )}

      {/*---bio-----*/}
      {currState === "Sign up" && isDtaSubmitted && (
        <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
        rows={4} className='p-2 border border-gray-500 rounded-md 
        focus:outline-none focus:ring-2 foucs:ring-indigo-500' placeholder='provide a short bio.....' required></textarea>
      )

      }
      <button type='submit' className='py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
        {currState === "Sign up" ? "create Account" : "Login Now"}

      </button>
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <input type="checkbox"/>
        <p> Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account?
            <span  onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login Here</span></p>
          ):(
            <p className='text-sm text-gray-600'> create an Account <span onClick={()=> setCurrState("Sign up")}
            className='font-medium text-violet-500 cursor-pointer'>Click Here</span></p>
          
          )}
        </div>

      </form>
    </div>


  )
}

export default LoginPage
