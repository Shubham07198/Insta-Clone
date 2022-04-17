import React, { useEffect } from 'react'

import faker from 'faker'

function Suggestions() {
  const [suggestions, setSuggestions] = React.useState([])

  useEffect(() => {
    
    fetch("https://dummyapi.io/data/v1/user?page=1&limit=5",{
      headers:{
       "app-id": "625c196c3fdb32abfd072a5b"
      }
    }).then(res=>res.json()).then(data=>{
      console.log(data?.data)
      setSuggestions(data?.data)
    })
   
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-gray-4000 text-sm font-bold">
          Suggestions for you
        </h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>

      {suggestions?.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            className="h-10 w-10 rounded-full border p-[2px]"
            src={profile?.picture}
            alt=""
          />
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">
              {profile?.firstName}{" "}{profile?.lastName}
              <h3 className="truncate text-sm text-gray-400">
                From {profile?.company?.name}
              </h3>
            </h2>
          </div>
          <button className="text-sm text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
