import React from 'react'
import Maincontent from './partials/maincontent'
import Sidebar from './partials/sidebar'

const page = () => {
  return (
    <div>
      <div className='flex h-screen bg-gray-100'>
        <Sidebar />
        <Maincontent/>
      </div>
    </div>
  )
}

export default page
