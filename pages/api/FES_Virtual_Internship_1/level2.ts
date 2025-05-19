import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, Location, Image } = req.body;

    if (!name || !Location || !Image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('User submitted:', { name, Location, Image });

    // Simulate a success response (in a real app you'd save this data somewhere)
    return res.status(200).json({ message: 'User data received successfully' });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}


