import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { HomeIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { modalState } from '../atoms/modalAtom'
import { useRouter } from 'next/router'

const Header = () => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  console.log(session)
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-6xl justify-between lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push('/')}
          className="relative  hidden  w-24 cursor-pointer lg:inline-grid"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className="relative  w-10 flex-shrink-0 cursor-pointer lg:hidden"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle - Search input field*/}
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3 ">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push('/')} />

          {session ? (
            <>
              <div className="navtBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 hidden h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white md:inline-flex">
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-16 sm:h-6 cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                src={session?.user?.image}
                alt="profile pic"
                className="h-10 cursor-pointer rounded-full"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
