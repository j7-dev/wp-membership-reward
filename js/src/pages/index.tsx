import { useState } from 'react'
import reactLogo from '@/assets/images/react.svg'
import viteLogo from '@/assets/images/vite.svg'
import wpLogo from '@/assets/images/wp.png'
import GetPostsPage from '@/pages/getPosts'
import { Link } from 'react-router-dom'

function DefaultPage() {
  const [
    count,
    setCount,
  ] = useState(0)
  const [
    showPosts,
    setShowPosts,
  ] = useState(false)

  return (
    <div className="App py-20">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://wordpress.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={wpLogo} className="logo wp" alt="WordPress logo" />
        </a>
      </div>
      <h1>Vite + React + WordPress</h1>
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => setCount((theCount) => theCount + 1)}
        >
          Count is {count}
        </button>

        <button type="button" onClick={() => setShowPosts(!showPosts)}>
          Get Posts Example
        </button>

        <Link to="/about">
          <button>Go to About Page</button>
        </Link>
      </div>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite, React and WordPress logos to learn more
      </p>

      {showPosts && <GetPostsPage />}
    </div>
  )
}

export default DefaultPage
