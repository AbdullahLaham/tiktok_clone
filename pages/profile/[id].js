import {useState, useEffect} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';

const Profile = ({data}) => {
    const {user, userVideos, userLikedVideos} = data;
    const [showVideos, setShowVideos] = useState(true)
    const [videosList, setVideosList] = useState([]);
    const videos = showVideos ? 'border-b-2 border-black' : 'text-grey-400';
    const liked = !showVideos ? 'border-b-2 border-black' : 'text-grey-400';
    useEffect(() => {
        if (!showVideos) {
            setVideosList(userVideos)
        } else {
            setVideosList(userLikedVideos)
        }
    }, [showVideos, userVideos, userLikedVideos])
    user = user[0];
    console.log('data', 'data',data);
    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                    <div className='flex flex-col items-start gap-3'>
                        <div className='flex'>
                            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                                <Image width={34} height={34} src={user.image} className='rounded-full' alt='user profile' />
                            </div>
                            <div className='flex flex-col gap-3  xl:block'>
                                <div className='flex flex-col justify-center'>
                                    <p className='flex lg:text-2xl justify-center'>
                                    {user?.userName?.replaceAll(' ', '')}
                                    <GoVerified className='text-blue-400' />
                                    </p>
                                    <p className='capitalize text-grey-400 text-xs'>
                                    {user.userName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-grey-200 bg-white w-full'>
                                <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowVideos(true)}>Videos</p>
                                <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowVideos(false)}>Liked</p>
                            </div>
                            <div className='flex gap-6 flex-wrap justify-start'>
                                {videosList?.length > 0 ?
                                (videosList.map((item, i) => (
                                    <VideoCard post={item} key={i} />
                                ))) 
                                : <NoResults text={`No ${showVideos ? 'videos' : 'liked Videos'} Yet`} />}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default Profile

export const getServerSideProps = async ({params: { id }}) => {
    const response = await axios.get(`${process.env.base_url}api/profile/${id}`);
    return {
        props: {
            data: response.data,
        },
    }
}