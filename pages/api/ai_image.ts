import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY?.toString()
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vercel = setTimeout(
    () =>
      res.status(504).json({
        data: '因為沒有付錢，所以服務端的響應時間不能超過10秒。'
      }),
    1000 * 9
  )
  if (req.method === 'POST') {
    try {
      const response = await openai.createImage({
        prompt: `${req.body.text}`,
        n: 2,
        size: '512x512'
      })
      clearTimeout(vercel)
      res.status(200).send({ data: response.data.data })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
