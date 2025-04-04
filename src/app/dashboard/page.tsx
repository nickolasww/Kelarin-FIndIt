import React from 'react'
import Maincontent from './partials/maincontent'
import Sidebar from './partials/sidebar'

const page = () => {
  return (
    <div>
      <div className='flex min-h-screen'>
        <Sidebar />
        <Maincontent/>
      </div>
    </div>
  )
}

export default page
