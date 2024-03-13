import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <div className='rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2'>
        <div className='text-xl'>
              <div className="flex items-center justify-center h-screen">
                <CircularProgress />
              </div>
        </div>
    </div>
  )
}
