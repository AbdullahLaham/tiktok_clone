import '../styles/globals.css'
import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(false);
  useEffect(() => {
    setIsSSR(true)
  }, [])
  
  return isSSR ?  
                    <div className='lg:w-[1200px] m-auto overflow-hidden '>
                    <Navbar />
                    <div className='flex gap-6 md:gap-20 '>
                      <div className='overflow-hidden xl:hover:overflow-auto'>
                        <Sidebar />
                      </div>
                      <div className='mt-4 flex flex-col gap-10 overflow-auto videos flex-1'>
                        <Component {...pageProps} />
                      </div>                  
                    </div>
                    
                  </div>
               : ''
}

export default MyApp
// w-full flex justify-between items-center border-b-2 border-grey-200 py-2 px-4 