
import Error from 'next/error'
import Link from 'next/link'
// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <main>
      <h2>There was a problem</h2>
      <p>We could not find the page you are looking for</p>
      <Link href="/" className='bg-blue-500 text-center'>Home</Link>
    </main>

  )
}