import React from 'react'
import Link from 'next/link'
function ContactUs() {
  return (
    <div className="bg-gray-200 rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className='text-gray-700 text-xl '>Contact Us</div>
      <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
        <Link href="/programs" className="flex items-center  text-orange-400"> Home </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        <p>Contact us</p>
      </div>
      
    </div>
  )
}

export default ContactUs