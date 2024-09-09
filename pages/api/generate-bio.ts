import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { interests, contentType } = req.body;

  if (!interests || !contentType) {
    res.status(400).json({ error: 'Interests and content type are required' });
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a TikTok bio generator.',
        },
        {
          role: 'user',
          content: `Generate a TikTok bio for someone who is interested in ${interests} and creates ${contentType}.`,
        },
      ],
    });

    const generatedBio = response.choices[0]?.message?.content?.trim();

    if (!generatedBio) {
      res.status(500).json({ error: 'Failed to generate bio' });
      return;
    }

    res.status(200).json({ bio: generatedBio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
