import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { interests, contentType } = req.body;

    try {
      const prompt = `Generate a TikTok bio for a person who loves ${interests} and creates ${contentType} content.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
      });

      const generatedBio = completion.choices[0].message.content.trim();

      res.status(200).json({ bio: generatedBio });
    } catch (error) {
      console.error('Error generating bio:', error);
      res.status(500).json({ message: 'Error generating bio' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}