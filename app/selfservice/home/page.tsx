import React from 'react'
import Programs from '@/components/Programs';
import Card from '@components/Card';
import { Program } from '@/components/Programs';

interface MyPageProps {
  data: Program[];
}
async function Page({ data }: MyPageProps) {
  const fetchedData = await getData()

  return (
    <div className='p-4'>
      <Programs programs={fetchedData}/>
      <Card/>
    </div>

  )
}

async function getData<MyPageProps>() {
  const res = await fetch('http://localhost:8000/programs/')
  if (!res.ok) {
    
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export default Page