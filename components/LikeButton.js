import React, {useState, useEffect} from 'react'
import {MdFavorite} from 'react-icons/md';
import useAuthStore from '../store/authStore';
function LikeButton({handleLike, handleDisLike, likes}) {
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const {userProfile, currentPost, setPost}  = useAuthStore();
    const filterLikes = likes && likes.filter(item => item?._ref === userProfile?._id)
    useEffect(() => {
        if (filterLikes && filterLikes.length > 0) {
            setAlreadyLiked(true);

        } else {
            setAlreadyLiked(false)
        }
    }, [likes, filterLikes])
  return (
    <div className='mt-4 flex flex-col justify-center items-center cursor-pointer '>
      {alreadyLiked ? (
        <div className='bg-primary rounded-full p-2 md:p-4 text-[#f55197]' onClick={handleDisLike}>
            <MdFavorite className='text-lg md:text-2xl'/>
        </div>
      ) : (
        <div className='text-[#000] rounded-full p-2 md:p-4' onClick={handleLike}>
            <MdFavorite className='text-lg md:text-2xl'/>
        </div>
      )}
      <p className='text-md font-semibold '>{filterLikes?.length || 0}</p>
      
    </div>
  )
}

export default LikeButton
