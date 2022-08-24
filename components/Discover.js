import React, {useState} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {topics} from '../utils/constants'
import { ImInsertTemplate } from 'react-icons/im';
function Discover() {
    const activeTopicStyle = 'xl:border-2 hover:bg-primary lg:border-red-500 px-3 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-red-500';
    const topicStyle = 'lg:border-2 hover:bg-primary lg:border-gray-300 px-3  rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';
    const router = useRouter();
    const [currentTopic, setCurrentTopic] = useState('');
  return (
    <div className='lg:border-b-2 lg:border-grey-200 pd-6 block'>
      <p className='text-grey-500 font-semibold mt-1 mb-2 hidden lg:block'>
        popular topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics.map(topic => {
            return (<Link href={`/?topic=${topic.name}`} key={topic.name}>
                <div className={topic.name == currentTopic ? activeTopicStyle : topicStyle}  onClick={() => setCurrentTopic(topic.name)}>
                    <span className='font-bold text-2xl lb:text-md'>{topic.icon}</span>
                    <span className='font-medium text-md hidden lg:block capitalize ' > {topic.name}</span>
                </div>
            </Link>)
        })}
      </div>
    </div>
  )
}

export default Discover
