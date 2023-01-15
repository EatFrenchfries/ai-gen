import Head from 'next/head'
import Header from '../components/Header'
import React, { memo, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type conversationType = { id: string; user: string; text: string }[]

const ChatGPT = memo(() => {
  const [prompt, setPrompt] = useState('')
  const [isFetching, serIsFetching] = useState(false)
  const [conversation, setConversation] = useState<conversationType>([])
  const view = useRef<HTMLDivElement>(null)

  useEffect(() => {
    view.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [conversation])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleClick = async () => {
    if (prompt.trim().length < 1) return
    serIsFetching(true)
    setConversation([...conversation, { id: uuidv4(), user: 'user', text: `${prompt}` }])
    const result = prompt
    setPrompt('')
    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    })
    let data: { id: string; data: string }
    serIsFetching(false)
    if (res.ok) {
      data = await res.json()
    } else {
      data = { id: uuidv4(), data: '對不起，我不知道要怎麼回覆你。' }
    }
    setConversation(prev => [...prev, { id: data.id, user: 'ai', text: `${data.data.trim()}` }])
  }

  return (
    <div className="w-full h-full max-h-screen min-h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-400 to-pink-400">
      <Head>
        <title>ChatGPT</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="ChatGPT" />
        <meta property="og:url" content="https://ai-gen-eatfrenchfries.vercel.app/ChatGPT" />
        <meta property="og:image" content="/ai-gen.png" />
        <meta property="og:description" content="ChatGPT can answer your question automatically." />
      </Head>
      <Header />
      <div className="w-full min-h-0 flex-1 max-w-3xl flex flex-col gap-4 p-2 pt-4 justify-between bg-gradient-to-tr from-indigo-300 to-pink-300 md:m-5 md:rounded-lg md:relative ">
        <div className="w-full min-h-0 flex-1 pr-6 overflow-scroll scrollbar-hide">
          {conversation.map(talk => (
            <div key={talk.id} className="flex">
              <span className="text-indigo-700 m-2 w-11 text-right">{talk.user === 'user' ? 'User :' : 'AI :'}</span>
              <div ref={view} className="whitespace-pre-wrap break-words min-w-0 flex-1 my-2">
                {talk.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <textarea className="w-full outline-none p-3 border border-indigo-300 rounded-lg resize-none scrollbar-hide bg-[#ffffff73]" placeholder={isFetching ? 'ChatBot is thinking...' : 'Type something...'} cols={30} rows={3} value={prompt} onChange={handleChange}></textarea>
          <button disabled={isFetching} onClick={handleClick} className="self-end lg:absolute lg:bottom-1 lg:-right-[100px] w-fit px-3 py-2 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-md border-2 border-indigo-100 text-indigo-700 font-bold hover:shadow-md disabled:opacity-30">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
})

export default ChatGPT
