import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY?.toString()
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response: any = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${req.body.result}`,
        temperature: 0.6,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
      const data = response.data.choices[0].text.trim().length < 1 ? 'Hi' : response.data.choices[0].text
      res.status(200).send({ id: response.data.id, data })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
