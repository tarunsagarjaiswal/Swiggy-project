import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { removeCredential, setCredential } from '../utils/authSlice';
import { useNavigate } from 'react-router-dom';
import toogleSlice from "../utils/store"
import { toogleSignIn } from '../utils/toggleSlice';

function SignInBtn() {
    const dispatch = useDispatch();
    const navig = useNavigate();
    const userData = useSelector(state => state.authSlice.userData);
    const SignInVisible = useSelector((state) => state.toogleSlice.signInToogle)

  async function handleAuth() {
     let data = await signInWithPopup(auth, provider)
    //  console.log(data)    

     let userData = {
        name : data.user.displayName,
        pic : data.user.photoURL,
     }

     dispatch(setCredential(userData));
     dispatch(toogleSignIn());
     navig('/Cart');
  }
  
  async function handleLogout() {
        await signOut(auth);        //ends the current user’s session.
        dispatch(removeCredential());
  }
  
  return (
    <div>
    {!userData && <button onClick={handleAuth} className='mt-5 p-2 bg-[#ff5200] text-white text-xl font-semibold tracking-tight w-[60%]'>Google Login</button>}
     {userData && <button onClick={handleLogout} className='mt-5 p-2 bg-red-500 text-white text-xl font-semibold tracking-tight w-[60%]'>Logout</button>  } 
    </div>
  )
}

export default SignInBtn;