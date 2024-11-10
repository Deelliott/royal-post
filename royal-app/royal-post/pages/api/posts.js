

let posts = [];

export default function handler(req, res) {

  console.log('Request method:', req.method);

  if (req.method ==='GET') {
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required.' 
      });

  
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      likes: 0,
      createdAt: new Date(),
    };

    posts.push(newPost);

    return res.status(201).json(newPost);
  
  }


  if (req.method === 'DELETE') {
    const { id } = req.query;
    posts = posts.filter((post) => post.id !== parseInt(id));
    return res.status(200).json({ message: `Post with id ${id} deleted.` });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const post =posts.find((p) => p.id === parseInt(id));

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes = (post.likes || 0) + 1;

    return res.status(200).json(post);
  }

  res.status(405).json({ message: 'Method not allowed' });
}

