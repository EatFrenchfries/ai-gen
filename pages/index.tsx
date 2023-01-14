import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-400 to-pink-400 ">
      <Head>
        <title>AI-Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mt-[200px] flex gap-5 flex-col sm:flex-row">
        <Link className="border-2 border-indigo-700 p-5 text-2xl text-indigo-700 rounded-xl shadow-lg hover:scale-105" href="/ChatGPT">
          Try ChatGPT
        </Link>
        <Link className="border-2 border-indigo-700 p-5 text-2xl text-indigo-700 rounded-xl shadow-lg hover:scale-105" href="/AI_Image">
          Try AI Image
        </Link>
      </div>
    </div>
  )
}

export default Home
