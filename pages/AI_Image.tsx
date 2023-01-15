import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import Loading from '../components/Loading'
import ImageCard from '../components/ImageCard'

type AIRes = {
  url: string
}[]

const AI_Image = () => {
  const [prompt, setPrompt] = useState('')
  const [results, setResults] = useState<AIRes>([])
  const [isFetching, setIsFetching] = useState(false)

  const handleClick = async () => {
    setIsFetching(true)
    setResults([])
    const text = prompt.length > 0 ? prompt : 'A cute cat'
    setPrompt('')
    const res = await fetch('/api/ai_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    if (res.ok) {
      const data = await res.json()
      if (res.status === 504) {
        alert(data.data)
      } else {
        setResults(data.data)
      }
    } else {
      alert('請重新嘗試')
    }
    setIsFetching(false)
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-400 to-pink-400 gap-5 relative">
      <Head>
        <title>AI-Image</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="AI-Image" />
        <meta property="og:url" content="https://ai-gen-eatfrenchfries.vercel.app/AI_Image" />
        <meta property="og:image" content="/ai-gen.png" />
        <meta property="og:description" content="AI-Image can generate pictures depend on the text." />
      </Head>
      <Header />
      <div className="w-full h-full flex flex-col gap-4 items-center mb-4 overflow-y-auto">
        <input className="w-full max-w-xs sm:max-w-lg outline-none p-2 rounded-md text-lg" type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
        <button disabled={isFetching} className="w-fit px-3 py-2 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-md border-2 border-indigo-100 text-indigo-700 font-bold hover:shadow-md disabled:opacity-30" onClick={handleClick}>
          Submit
        </button>
        <div className="flex flex-col sm:flex-row px-5 sm:p-0 gap-5">{!isFetching && results.map(result => <ImageCard key={result.url} url={result.url} />)}</div>
      </div>
      {isFetching && <Spinner />}
    </div>
  )
}

export default AI_Image
