import { FC, useState } from 'react'
import Loading from './Loading'
import Image from 'next/image'

type imageProp = {
  url: string
}

const ImageCard: FC<imageProp> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-[256px] md:w-[300px] lg:w-[384px]">
      {isLoading && <Loading />}
      <Image src={url} alt="" width={512} height={512} onLoadingComplete={() => setIsLoading(false)} />
    </div>
  )
}

export default ImageCard
