import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

import {CameraIcon} from "@heroicons/react/outline"
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'

function Modal() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [selectedFile,setSelectedFile]=useState(null)
  const [loading,setLoading]=useState(false)

  const uploadPost =async()=>{
    console.log("wqdwdwqdqwd",loading)
    if(loading) return;
    console.log("wqdwdwqdqwaaad")
    setLoading(true)

    // 1. create a post and add to firestore 'posts' collection
    // 2. get the post ID for the newly created post
    // 3. upload the image to firebasese storage with the post ID
    // 4. get a download URL from fb storage and update the original post with image
    // 1.
    console.log("ehyy sesin",session)
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user?.username,
      caption: captionRef?.current?.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp()
    })

    console.log("new doc added ==>",docRef.id)

      //2.

    const imageRef = ref(storage, `posts/${docRef?.id}/image`);
      //3.
      await uploadString(imageRef, selectedFile, "data_url").then(async(snapshot)=>{
          const downloadURL  = await getDownloadURL(imageRef);
          //4.
          await updateDoc(doc(db, 'posts', docRef.id),{
            image: downloadURL
          })
      })

      setOpen(false)
      setLoading(false)
      setSelectedFile(null)
  }

  const addImageToPost = (e)=>{
    const reader = new FileReader();
    if (e.target.files[0]) 
      reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
  }
}
  console.log("sqwdwdewdwedwE",selectedFile,loading,open, !captionRef?.current?.value)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={()=>{setOpen(false);setLoading(false);}}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 sm:translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="align-bottom sm:align-middle inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5
                pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                {
                  selectedFile ? (
                      <img src={selectedFile}  onClick={()=>{setSelectedFile(null)}} className="h-56 w-full object-contain"/>
                  ):(
                    <div
                    onClick={() => filePickerRef.current.click() }
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100  cursor-pointer">
                                                                                                  
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                      />
                      </div>
                  )
                }
            
    </div>

              <div>
      
    <div className="mt-3 text-center sm:mt-5">
      <Dialog.Title
        as="h3"
        className="text-lg leading-6 font-medium text-gray-900">
        Upload a photo
      </Dialog.Title>
      <div>
        <input
          ref={filePickerRef}
          type="file"
          hidden
         onChange={addImageToPost}
        />
        </div>
     <div className="mt-2">
        <input
          className="border-none focus:ring-0 w-full text-center"
          type="text"
          ref={captionRef}
          placeholder="Please enter a caption..."
          />
      </div>
      </div>
      </div>
              <div className="mt-5 sm:mt-6">

 <button
   disabled={(!selectedFile) ?  true : false}
   type="button"
   className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
   px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
   focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
   disabled:cursor-not-allowed hover:disabled:bg-gray-300"
   onClick={uploadPost}
   >
 {!loading ?  `Upload Post` : `...Uploading`}
 </button>
 </div>

</div>

          </Transition.Child>
</div>
</Dialog>
</Transition.Root>
  )
}

export default Modal
