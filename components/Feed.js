import MiniProfile from './MiniProfile'
import Posts from './Posts'
import React from 'react'
import Stories from './Stories'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

function Feed() {
  const { data: session } = useSession()
  return (
    <div className={`mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${!session && "!grid-cols-1 !max-w-3xl"}`}>
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      <section>
        {/* mini profile */}
        {session && (
          <section className="hidden md:col-span-1 xl:inline-grid">
            <div className="fixed top-20">
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        )}
      </section>
    </div>
  )
}

export default Feed
