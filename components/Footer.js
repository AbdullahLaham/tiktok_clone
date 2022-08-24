import React from 'react'
import {footerList1, footerList2, footerList3} from '../utils/constants';

function Footer() {
    const List = ({items}) => (
        <div className='flex flex-wrap gap-2 hidden lg:block'>
            {items.map(item => 
                <p key={item} className='text-grey-400 text-sm hover:underline cursor-pointer '>
                    {item}
                </p>
            )}
        </div>
        
    )
  return (
    <div className='mt-3'>
      <List items={footerList1} />
      <List items={footerList2} />
      <List items={footerList3} />
      {/* <p className='text-grey-400 text-sm mt-3'>2022 Abdullah TikTok</p> */}
    </div>
  )
}

export default Footer
