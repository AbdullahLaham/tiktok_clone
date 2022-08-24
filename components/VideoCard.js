import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import {BsPlay, BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go'
import useAuthStore from '../store/authStore';
import { useRouter } from 'next/router';
function VideoCard({post}) {
    // console.log(post.caption);
    const {setPost} = useAuthStore();
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef(null);
    const onVideoPress = () => {
      if (playing) {
        videoRef?.current?.pause();
        setPlaying(false)
      } else {
        videoRef?.current?.play();
        setPlaying(true)
      }
    }
  return (
    <div className='flex flex-col border-b-2 border-grey-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold  rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`profile/${post.postedBy._id}`}>
                    <div>
                        <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='profile photo' layout='responsive' />
                    </div>
                </Link>
            </div>
            
            <div>
              <Link href={`profile/${post.postedBy._id}`}>
                <div className='flex items-center gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} <GoVerified className='text-blue-400 text-md' /></p>
                  <p className='capitalize font-medium text-xs text-grey-500 hidden md:block'>{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='rounded-3xl'  onClick={() => setPost(post)}>
              <Link href={`/detail/${post._id}`}>
                <video src={post.video.asset.url} ref={videoRef} loop className='lg:w-[400px] lg:h[530px] w-[200px]  rounded-2xl ' >

                </video>
              </Link>
              {isHover && (
                  <div className='absolute bottom-0 cursot-pointer left-3 md:left-14 lg:left-0 flex gap-10 justify-between w-[100px] md:w-[50px] p-3'>
                    <div onClick={() => onVideoPress()}>{playing ? <button >< BsFillPauseFill className='text-block text-2xl lg:text-4xl ' /></button> : <button><BsFillPlayFill className='text-block text-2xl lg:text-4xl ' /></button>}</div>
                    <div>{isVideoMuted ? <button onClick={() => {setIsVideoMuted(false);videoRef.current.muted = isVideoMuted;}}>< HiVolumeOff className='text-block text-2xl lg:text-4xl ' /></button> : <button  onClick={() => {setIsVideoMuted(true); videoRef.current.muted = isVideoMuted;}}><HiVolumeUp className='text-block text-2xl lg:text-4xl ' /></button>}</div>
                  </div>
              )}
            </div>
      </div>
    </div>
  )
}

export default VideoCard
