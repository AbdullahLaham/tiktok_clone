import React, { useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {GoVerified} from 'react-icons/go'
import useAuthStore from '../store/authStore'
import {BiCommentX} from 'react-icons/bi';
import NoResults from './NoResults'
import { MdPowerSettingsNew } from 'react-icons/md'
import axios from 'axios'
function Comments({comments, comment, setComment, addComment, isPosting, userProfile}) {
  // const comments = [];
  const {allUsers} = useAuthStore();
  const isCommenting = false;
  console.log('comments', comments)
  return (
    <div className='border-t-2 border-grey-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-auto'>
        {comments ? (
          
          comments.map((comment, i) => (
            <div key={i*i*i}>
              {allUsers?.map((user) => {
                 
                 return user._id === comment.postedBy._ref && (
                  <div className='p-2 flex  items-center' key={i}>
                    <Link href={`/profile/${user._id}`}>
                      <div className='flex items-start gap-3'>
                        <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                          <Image width={34} height={34} src={user.image} className='rounded-full' alt='user profile' />
                        </div>
                        <div className='flex flex-col gap-3  xl:block'>
                            <div>
                              <p className='flex'>
                                {user?.userName?.replaceAll(' ', '')}
                                <GoVerified className='text-blue-400' />
                              </p>
                              <p className='capitalize text-grey-400 text-xs'>
                                {user.userName}
                              </p>
                            </div>
                            <p className='capitalize text-grey-400 '>
                              {comment.comment}
                            </p>
                        </div>
                      </div>
                      </Link>
                  </div>
                ) 
              })}
            </div>
          ))
        ) : <NoResults text='No comments yet' />}

      </div>
      {userProfile && (
        <div className=' left-0 bottom-0 pb-6 px-2 md:px-10 '>
          <form onSubmit={addComment} className='flex gap-4 '>
            <input
            value={comment}
            onChange={(e) => {setComment(e.target.value.trim())}}
            placeholder='Add Comment...'
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button onClick={addComment}></button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
