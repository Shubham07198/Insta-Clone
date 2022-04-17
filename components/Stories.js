import faker from "faker"
import React, { useEffect } from 'react'

import Story from './Story'
import {useSession}  from "next-auth/react"

function Stories() {
  const [suggestions, setSuggestions] = React.useState([])
  const {data: session} = useSession()
  useEffect(() => {
    
    fetch("https://dummyapi.io/data/v1/user?page=1&limit=20",{
      headers:{
       "app-id": "625c196c3fdb32abfd072a5b"
      }
    }).then(res=>res.json()).then(data=>{
      console.log(data?.data)
      setSuggestions(data?.data)
    })
   
  }, [])
  return (
    <div className="mt-8 flex space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-6 scrollbar-thin scrollbar-thumb-black">
     {
       session && (
         <Story img={session?.user?.image}
         username={session?.user?.username}/>
       )
     }
      {suggestions?.map((profile) => (
        <Story
          key={profile?.id}
          img={profile?.picture}
          username={profile?.firstName}
        />
      ))}
    </div>
  )
}

export default Stories
