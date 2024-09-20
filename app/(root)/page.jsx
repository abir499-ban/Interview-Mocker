"use client"
import {useUser} from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Dashboard from '../../components/shared/Dashboard'

const page = () => {
  const signedinState = useUser();
  return (
    <div>
      <h1>
        page
      </h1>
      {signedinState.isSignedIn ? (
       <Dashboard/>
      ) : (
        <p>Hi</p>
      )}
    </div>
  )
}

export default page