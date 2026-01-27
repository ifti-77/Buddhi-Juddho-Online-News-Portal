import dbConnect from '../../../lib/mongodb';
import News from '../../../lib/models/newsCollection';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { title, content, author, category } = req.body;

      const newNews = new News({
        title,
        content,
        author,
        category,
      });

      const savedNews = await newNews.save();

      res.status(201).json({ success: true, data: savedNews });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}