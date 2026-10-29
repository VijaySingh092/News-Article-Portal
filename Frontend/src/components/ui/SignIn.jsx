
import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {Link, useNavigate} from "react-router-dom"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { signInFailure, signInStart, signInSuccess } from "@/redux/user/userSlice"
import GoogleAuth from "../shared/GoogleAuth"

const formSchema = z.object({
  email: z
    .string()
    .email({message:"Please enter a valid email address."}),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
})

export function SignIn() {

  const navigate = useNavigate()
  const {loading,error:errorMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  // define submit handler
  async function onSubmit(values) {
    try{
      dispatch(signInStart())
      
    //   const res = await fetch('/api/auth/signin',{
    //     method:"POST",
    //     headers:{"Content-Type" : "application/json"},
    //     body: JSON.stringify(values),
    //   })
    
      
    //   const data = await res.json()

    //    if (!res.ok || data.success === false) {
    //     const message =
    //       typeof data.message === "string"
    //         ?  data.message  
    //         : "Sign in failed! Please try again."

    //      setErrorMessage(message)
    //     toast.error("Sign in failed! Please try again.")
    //     return 
    //   }
      
        // toast.success("Sign in successful!")
        // navigate("/")


        // 

const res = await fetch("/api/auth/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});

const data = await res.json();

if (!res.ok || data.success === false) {
  const message =
    typeof data.message === "string"
      ? data.message
      : "Sign in failed! Please try again.";

  toast.error(message);
  dispatch(signInFailure(data.message))
  return
}

  dispatch(signInSuccess(data))
toast.success("Sign in successful!");
navigate("/");

        // 
      
    }catch(error){
      console.error("Sign-in error:", error);
      dispatch(signInFailure(error.message))
      toast.error("Something went wrong!")
    }
  }


  return (
    <>
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign in to your Account</CardTitle>
        <CardDescription>
          Enter your details or continue with Google.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={loading}
          form="signup-form"
          className="w-full bg-blue-500 text-white hover:bg-green-700"
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ):(
            <span>Sign In</span>
          )}
        </Button>

        <GoogleAuth/>
      </CardFooter>
      
    </Card>
    <div className="flex gap-2 text-2 text-sm mt-5">
        <span>Don't have an account?</span>
        <Link to="/sign-up" className="text-blue-500">Sign Up</Link>
      </div>
      {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
    </>
  )
}
