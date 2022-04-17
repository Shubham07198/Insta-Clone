import {getProviders, signIn} from "next-auth/react"

import Header from "../../components/Header"
import React from 'react'

function signin({providers}) {
  return (
    <>
    <Header/>

    <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">
        <img src="https://links.papareact.com/ocw" alt="" className="h-24"/> 
        <p className="font-xs italic">
            This is not a REAL App, it is built for educational purpose only
        </p>
        <div className="mt-40">
        {
            Object.values(providers)?.map(provider=>(
                <div key={provider?.name}>
                    <button onClick={()=> signIn(provider?.id,{callbackUrl: "/"})}
                    className="p-3 bg-blue-500 rounded-lg text-white"
                    >
                        Sign in with {provider?.name}
                    </button>
                </div>
            ))
        }
        </div>
    </div>
    
   
    </>
  )
}

export async function getServerSideProps(){
    const providers =  await getProviders();
    return {
        props:{
            providers
        }
    }
}

export default signin