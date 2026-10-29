import React from 'react'
import { Button } from "@/components/ui/button"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '@/firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '@/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const GoogleAuth = () => {

  const auth = getAuth(app)
  const dispatch= useDispatch()
  const navigate = useNavigate()
    const handleGoogleClick=async ()=> {
    // toast.info("Google signup clicked", {
    //   description: "Connect Google authentication to continue.",
    //   position: "bottom-right",
    // })
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:"select_account"})

    try{
      const firebaseResponse = await signInWithPopup(auth, provider)

      const res = await fetch("/api/auth/google",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:firebaseResponse.user.displayName,
          email:firebaseResponse.user.email,
          profilePhotoUrl:firebaseResponse.user.photoURL
        })
      })

      const data = await res.json()
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }catch(error){
      console.log(error)
    }

  }
  return (
    <div>
      <Button
          type="button"
          onClick={handleGoogleClick}
          className="w-full bg-green-400 text-white hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="mr-2 h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.75 13.72 17.9 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.93 46.98 31.82 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.6.28-3.14.79-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.48-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.1 0-11.25-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Continue with Google
        </Button>
    </div>
  )
}

export default GoogleAuth
