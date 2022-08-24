import axios from 'axios';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BASE_URL from '../utils'

function Home({videos}) {
  console.log('videos', videos)
  console.log('env', process.env.customKey)
  return (
    <div className='flex flex-col gap-10 videos h-full '>
      {videos?.length ? (
        videos.map(video => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : <NoResults text='No Videos' />}
    </div>
  )
}
export default Home

export const getServerSideProps = async ({query: {topic}}) => {
  let response = null;
    if (topic) {
      response = await axios.get(`${process.env.base_url}api/discover/${topic}`)
    } else {
      response = await axios.get(`${process.env.base_url}api/post`);
    }
    console.log(response);
    return {
      props: {
        videos: response.data,
      }
    }
}
