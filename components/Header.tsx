import Link from 'next/link'

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-2 px-4 text-sm sm:text-lg font-light text-white shadow-md bg-[rgba(0,0,0,0.8)] sticky top-0 z-20">
      <Link href="/" className="text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-bold">
        AI Generator
      </Link>
      <div className="flex justify-between items-center gap-3 font-semibold sm:gap-5">
        <Link href="/ChatGPT" className="rounded-lg px-4 py-1 hover:shadow-lg hover:scale-105 borderwgite border border-pink-300 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          ChatGPT
        </Link>
        <Link href="/AI_Image" className="rounded-lg px-4 py-1 hover:shadow-lg hover:scale-105 borderwgite border border-pink-300  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          AI Image
        </Link>
      </div>
    </div>
  )
}

export default Header
