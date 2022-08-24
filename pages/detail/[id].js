import React, {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {GoVerified} from 'react-icons/go';
import {MdOutlineCancel} from 'react-icons/md';
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

function DetailPage({postDetails}) {
    const {currentPost, setPost} = useAuthStore();
    console.log(currentPost)
    // const [post, setPost] = useState(currentPost);
    const [playing, setPlaying] = useState('');
    const [isVideoMuted, setVideoMuted] = useState(false);
    const videoRef = useRef(null);
    const router = useRouter()
    console.log('postDetails', postDetails)
    // onVideoClick function
    const onVideoClick = () => {
        if (!playing) {
            setPlaying(true);
            videoRef.current.play();
        } else {
            setPlaying(false);
            videoRef.current.pause();
        }
    }
    const onSoundClick = () => {
        if (!isVideoMuted) {
            setVideoMuted(true);
        } else {
            setVideoMuted(false);
        }
        videoRef.current.muted = isVideoMuted;
    }
    const handleLike = async () => {
        const {data} = await axios.put(`${process.env.base_url}api/post/like`, {
            userId: postDetails._id,
            postId: currentPost._id,
            like: true,
        })
        setPost({...currentPost, likes: data.likes})
    }
    const handleDisLike = async () => {
        const {data} = await axios.put(`${process.env.base_url}api/post/like`, {
            userId: postDetails._id,
            postId: currentPost._id,
            like: false,
        })
        setPost({...currentPost, likes: data.likes})
        console.log(currentPost)
    }

    const [comment, setComment] = useState('');
    const [isPosting, setPosting] = useState(false);
    const addComment = async (e) => {
        e.preventDefault();
        if (postDetails && comment) {
        setPosting(true);
        const {data} = await axios.put(`${process.env.base_url}api/post/${currentPost._id}`, {
            userId: postDetails.postedBy._id,
            comment,
        });
        console.log('data', 'data',data)
        setPosting(false);
        setPost({...currentPost, comments: data.comments})
        setComment('')
        console.log('currentPost', currentPost)
        }
  }
  return (
    currentPost && <div className='flex lg:flex-row lg:justify-between flex-col w-full absolute left-0 top-0 bg-black flex-wrap lg:flex-nowrap'>
        <div className='relative flex-2 w-[100%] lg:max-w-[50%]  lg:w-9/12 flex justify-center items-center bg-blured-img bg-no-repeat bg-cover bg-center mr-[3rem]'>
            <div className='absolute top-8 left-2 lg:left-6 flex gap-6 z-50' onClick={() => {router.back()}}>
                <p>
                    <MdOutlineCancel className='text-white text-[35px] cursor-pointer '/>
                </p>
            </div>
            <div className='relative'>
                <div className='lg:h-[100vh] h-[60vh] ml-[6rem]'>
                    <video src={currentPost.video.asset.url}
                    ref={videoRef}
                    loop
                    className='h-full'>
                    </video>
                    <div className='absolute left-[50%] top-[45%]' onClick={() => onVideoClick()} >
                        {!playing && (
                            <button className='cursor-pointer'>
                                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                            </button>
                        )}
                        {playing && (
                            <button className='cursor-pointer'>
                                <BsFillPauseFill className='text-white text-6xl lg:text-8xl' />
                            </button>
                        )}
                    </div>
                    <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer' onClick={() => onSoundClick()}>
                        {!isVideoMuted ? (
                            <button className='cursor-pointer'>
                                <HiVolumeUp className='text-black text-2xl lg:text-5xl' />
                            </button>
                        ):
                        (
                            <button className='cursor-pointer'>
                                <HiVolumeOff className='text-black text-2xl lg:text-5xl' />
                            </button>
                        )}
                    </div>
                </div>
                
                <div className=''>
                    
                    
                </div>
                
            </div>
        </div>
        <div className='relative w-[100%] lg:max-w-[50%] bg-white'>
            <div className='flex flex-col lg:mt-20 mt-10'>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold items-center  rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href='/'>
                    <div>
                        <Image width={62} height={62} className='rounded-full' src={currentPost.postedBy.image} alt='profile photo' layout='responsive' />
                    </div>
                </Link>
            </div>
            
            <div>
              <Link href="/">
                <div className='flex flex-col items-center gap-2 h-auto'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{currentPost.postedBy.userName} <GoVerified className='text-blue-400 text-md' /></p>
                  <p className='capitalize font-medium text-xs text-grey-500'>{currentPost.postedBy.userName}</p>
                </div>
              </Link>
            </div>
            
        </div>
                <p className='px-10 text-lg text-grey-600'>
                    {currentPost.caption}
                    <div className='flex flex-start mt-10 px-10'>
                    {postDetails && (
                        <LikeButton likes={currentPost.likes} handleLike={() => handleLike(true)} handleDisLike={() => handleDisLike(false)} />
                    )}
                    </div>
                </p>
                
                <Comments comment={comment} setComment={setComment} userProfile={postDetails} addComment={addComment} comments={currentPost.comments} isPosting={isPosting}  />              
            </div>
        </div>
    </div>
  )
}
export default DetailPage;

export const getServerSideProps = async ({params: {id}}) => {
    const res = await axios.get(`${process.env.base_url}api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
}

