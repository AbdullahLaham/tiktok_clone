import React, { Profiler, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
// import {userAuth} from '../context/AuthContext'
import { getAuth, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {GoogleButton} from 'react-google-button'
// import {auth} from '../utils/firebase';
import { searchPostsQuery } from '../utils/queries';
import {createOrGetUser} from '../utils';
import useAuthStore from '../store/authStore';

function Navbar() {
const {userProfile, addUser, deleteUser} = useAuthStore()
console.log('useAuthStore', useAuthStore())
// const user = ;
const [currentUserr, setCurrentUserr] = useState('')
const [value, setSearch] = useState('');
// const {setUser} = userAuth()
const router = useRouter();
const googleSignIn =  (provider) => {
  const auth = getAuth()
  signInWithPopup(auth, provider)
  // setUser(auth.currentUser)
  setCurrentUserr(auth?.currentUser)
  createOrGetUser(auth.currentUser, addUser)

}

  const user = false;
  // const {googleSignIn} = userAuth();
  const handleGoogleSignIn = () => {
    try {
      const provider = new GoogleAuthProvider();
       googleSignIn(provider);
    }
    catch(err) {
      console.log(err)
    }
  }
  const handleGoogleSignout = () => {
    const auth = getAuth()
    signOut(auth);
    console.log('loggedOut successfully')
    deleteUser()
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if (value) {
      router.push(`/search/${value}`)
    }
  }
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 mr-15'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
            <Image className='cursor-pointer' src={Logo} alt='tiktik' layout='responsive' />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 left-20 bg-white'
        >
          <input type='text' value={value} onChange={(e) => setSearch(e.target.value)} placeholder='Search accounts and videos' className='w-[350px] rounded-full p-3 focus:outline-none focus:border-grey-400 font-medium focus:border-2 '/>
          <button className=' p-4 absolute right-2 top-1' onClick={handleSearch}><BiSearch /></button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
          <Link href='/upload'>
            <button className='border-2 p-2 md:p-4 text-md font-semibold flex items-center gap-2 '>
              <IoMdAdd className='text-xl font-semibold' />
              <span className='hidden lg:block'>Upload</span>
            </button>
          </Link>
          {userProfile?.image && 
          <Link href='/'>
              <>
               {userProfile?.image && (<Image width={62}
                height={62}
                className='rounded-full'
                src={`${userProfile?.image}`}
                alt='profile photo cursor-pointer'
                />)}
              </>
          </Link>}
          <button type='button' className='px-2' onClick={() => handleGoogleSignout()}><AiOutlineLogout  color="red" fontSize={30}/></button>
        </div>
        ): <GoogleButton onClick={() => handleGoogleSignIn()} />}
      </div>
    </div>
  )
}

export default Navbar
// w-full => full width of screen
// py => padding y
// px => padding x
// md => medium devices
// xl => extra Large devices