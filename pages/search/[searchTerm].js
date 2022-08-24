import axios from 'axios'
import React from 'react'
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';

function Search({videos}) {
  const router = useRouter();
  console.log('routerQuery', router.query)
  console.log('videos', videos)
  // getting the searchTerm from the route
  const {searchTerm} = router.query;

  const {allUsers} = useAuthStore();
  const searchedAccounts = allUsers?.filter(user => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log('searchedAccounts', searchedAccounts)
  console.log('searchedUser', searchedAccounts)
  const [isAccounts, setIsAccounts] = useState(true)
  const [videosList, setVideosList] = useState([]);
  const accountsStyle = isAccounts ? 'border-b-2 border-black' : 'text-grey-200';
  const videosStyle = !isAccounts ? 'border-b-2 border-black' : 'text-grey-200';


  return (
    <div className='w-full '>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-grey-200 bg-white w-full'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accountsStyle}`} onClick={() => setIsAccounts(true)}>Accouts</p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${videosStyle}`} onClick={() => setIsAccounts(false)}>Videos</p>
      </div>
      <div>
        {isAccounts ? <div className='md:mt-16'>
          {searchedAccounts.length > 0 && 
            searchedAccounts.map((account, i) => {
              return <Link href={`/profile/${account._id}`} key={account._id}>
              <div className='flex items-center border-b-300'>
                <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                  <Image width={50} height={50} src={account.image} className='rounded-full' alt='user profile' />
                </div>
                <div className='block'>
                  <p className='flex gap-2'>
                    {account?.userName?.replaceAll(' ', '')}
                    <GoVerified className='text-blue-400' />
                  </p>
                  <p className='capitalize text-grey-400 text-xs'>
                    {account.userName}
                  </p>
                </div>
              </div>
            </Link>
            })
          }
        </div> : 

         <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
            {videos.length ? (
              videos.map((video, idx) => {
                return <div key={idx}>
                  {video.caption}
                </div>
              })
            ) : <NoResults text={`No video Results for ${searchTerm} seract Term `} />}
          </div>}
      </div>
    </div>
  )
}

export default Search
export const getServerSideProps = async ({params: {searchTerm}}) => {
    const res = await axios.get(`${process.env.base_url}api/search/${searchTerm}`)
    return {
        props: {
            videos: res.data,
        },
    }
}
