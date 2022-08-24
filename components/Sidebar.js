import React, {useState} from 'react'
import {NextPage} from 'next';
import {useRouter} from 'next/router'
import Link from 'next/link';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
function Sidebar() {
    const [showSide, setShowSide] = useState(true);
    const normalLink = 'h-[1rem] flex gap-3 pb-2 items-center gap-3 hover:bg-primary p-3 lg:justify-start cursor-pointer font-semibold text-[#f519970] rounded m-auto w-[100%]';
    // const userProfile = false;
  return (
    <div className='lg:max-w-[400px] lg:w-[300px] w-[60px] sticky'>
      <div className='block lg:hidden m-2 ml-4 text-xl  ' onClick={() => setShowSide(showSide => !showSide)}>
        {showSide ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSide && <div className=' flex flex-col justify-start mb-3 border-r-2 border-gray-100 lg:border-0 p-3'>
            <div className='lg:border-b-2 border-gray-200 lg:pb-4'>
                <Link href="/">
                    <div className={normalLink}>
                        <p className='text-2xl'>
                            <AiFillHome />
                        </p>
                        <span className='text-xl hidden lg:block'>
                            For You
                        </span>
                    </div>
                </Link>
            </div>
        
          <div className='px-2 hidden lg:block'>
            <p className='text-grey-400'>
              Login to like and comment on videos
            </p>
            </div>
            
            <Discover />
            <SuggestedAccounts />
            <Footer />
        </div>}
    </div>
  )
}

export default Sidebar
