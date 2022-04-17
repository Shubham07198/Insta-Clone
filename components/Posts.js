import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import Post from './Post'
import { db } from '../firebase';

function Posts() {
  const [posts,setPosts]=useState([]);
  

  useEffect(()=>{
 const subscribe =  onSnapshot(query(collection(db, 'posts'),orderBy('timestamp','desc')), snapshot =>{
      setPosts(snapshot?.docs)
    })

    return(()=>{
      subscribe;
    })
  },[db])

  console.log("ss",posts)
  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post?.id}
          id={post?.id}
          username={post?.data().username}
          userImg={post?.data().profileImg}
          img={post?.data().image}
          caption={post?.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
