import React, {useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {GoVerified} from 'react-icons/go'
import useAuthStore from '../store/authStore'

function SuggestedAccounts() {
  const {fetchAllUsers, allUsers, currentPost} = useAuthStore();
  // useEffect(() => {
  //   fetchAllUsers();
  //   console.log('allUsers', allUsers);
  //   console.log('currentPost', currentPost)
  // }, [])
  return (
    <div className='xl:border-b-2 borde-grey-200 pd-4'>
      <p className='text-grey-500 font-semibold mt-2 xl:block'>Suggested Accouunts</p>
      <div>
        {allUsers ? allUsers.length && allUsers.map((user) => (

          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex'>
              <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                <Image width={34} height={34} src={user.image} className='rounded-full' alt='user profile' />
              </div>
              <div className='hidden lg:block'>
                <p className=''>
                  {user?.userName?.replaceAll(' ', '')}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-grey-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>) )
        : ''}
      </div>
    </div>
  )
}

export default SuggestedAccounts
