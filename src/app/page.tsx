"use client"
import dynamic from 'next/dynamic';
import './globals.css';


function Home() {
  const Map = dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <div className='mapLoaderCls'><p>Loading map...</p></div>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  )
  return (<div>
      <Map />
    </div>)
}

export default Home
