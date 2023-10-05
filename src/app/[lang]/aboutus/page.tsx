import Link from 'next/link'
import React from 'react'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function AboutUs({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return null;
  }
  const {page} = dictionary
  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className='text-xl '>About Us</div>
      <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
        <Link href="/" className="flex items-center  text-blue-900"> Home </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        <p>About us</p>
        
      </div>
      <div className='container'>
        <h1 className='text-3xl font-bold'>{page.about.title}</h1>
        <p className='text-gray-500'>{page.about.description}</p>
        
      </div>
      
    </div>
  )
}

