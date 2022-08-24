import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {FaCloudUploadAlt} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import axios from 'axios';
import { client } from '../utils/client';
// import {sanityAssetDocument} from '@sanity/client';
import {topics} from '../utils/constants'
import useAuthStore from '../store/authStore';

function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState(null);
  const [wrongType, setWrongType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const {userProfile} = useAuthStore();
  // router
  const router = useRouter();
  const uploadVideo =  async (data) => {
    const selectedFile = data.files[0];
    // const fileTpyes = ['video/mp4', 'video/webm', 'video/ogg']
    if (selectedFile.type.includes('video/')) {
      setIsLoading(true);
      await client.assets.upload('file', selectedFile, {
        currentType: selectedFile.type,
        filename: selectedFile.name,
      }).then((data) => {
        setVideoAsset(data)
        setIsLoading(false)
        console.log(data)
      }).catch(err => {
        console.log('err', err)
      })

    } else {
      setIsLoading(false)
      setWrongType(true)
    }
    

  }
  const handlePost = async () => {
    // console.log(caption, 'ddd', videoAsset, 'fff', category )
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
         asset: {
           _type: 'reference',
           _ref: videoAsset._id,
         }
       },      
       userId: userProfile?._id,
       postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
       },
       topic: category,

      }
      console.log('document', document)
      await axios.post(`${process.env.base_url}api/post`, document);
      console.log('succeed')
      router.push('/')
    }

  }
  return (
    <div className='flex w-full h-full  left-0 xs:mt-[10rem] items-center justify-center'>
      <div className='bg-white rounded-lg flex flex-col lg, md:flex-row items-start  lg, md:items-center justify-between '>
        <div className='mr-[4rem]'>
          <div>
            <p className='text-2xl font-bold'>upload video</p>
            <p className='text-md text-grey-400 mt-1'>post video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px]  p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {
              isLoading ? (
                <p>Uploading...</p>
              ) : (
                <div>
                  {videoAsset ? 
                  (
                    <div>
                      <video src={videoAsset.url} loop controls className='rounde-xl h-[450px] bg-black'>
                      

                      </video>
                    </div>
                  ) : 
                    <label className='cursor-pointer'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                          <p className='font-bold text-xl'>
                            <FaCloudUploadAlt className='text-grey-300 text-6xl'/> 
                          </p>
                          <p className='text-xl font-semibold text-center' >select video to upload</p>
                        </div>
                        <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                          MP4 or WebM or ogg <br />
                          720x1280 resolution or higher <br />
                          Up to 10 minutes <br />
                          Less than 2 GB
                        </p>
                        <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                          Select File
                        </p>
                      </div>
                      <input  className='w-0 h-0' type='file' name='upload video' onChange={(e) => uploadVideo(e.target)} />

                    </label>
                  }
                </div>
              )
            }
            {wrongType ? 
            <p className='text-xl text-center text-red-400 font-semibold mt-4 w-[250px]'>
              please select a video file
            </p> : ''}
          </div>
          
        </div>
          <div className='flex flex-col gap-3 pd-10 mt-[2rem] lg, md:mt-0'>
            <lable className='text-md font-medium'>Caption</lable>
            <input type='text' value={caption} onChange={(e) => setCaption(e.target.value)} className='rounded outline-none text-md border-2 border-grey-200 p-1' />
            <label className='text-md font-medium'>choose a category</label>
            <select onChange={(e) => setCategory(e.target.value)} className='text-md border-2 p-2 border-gray-200'>
              {topics.map(topic => (
                <option key={topic.name} className='text-gery-700 capitalize hover:bg-slate-300' value={topic.name}>{topic.name}</option>
              ))}
            </select>
            <div className='flex gap-6 md-10'>
              <button onClick={handlePost}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              >Discard</button>

              <button onClick={handlePost}
              type='button'
              className='bg-[#f51997] text-white border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              >Post</button>
            </div>
          </div>
      </div>
        
    </div>
  )
}

export default Upload
