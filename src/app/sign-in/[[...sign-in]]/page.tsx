import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
        <SignIn 
        appearance={{
            elements: {
                rootBox: 'mx-auto',
                card: 'shadow-lg',
            }
        }}
        />
        
    </div>
  )
}
