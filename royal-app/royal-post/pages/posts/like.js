// This handles updating the like count for a post
let posts = []; // You should replace this with your actual database or persistent storage

export default function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id } = req.query;
    const postId = parseInt(id, 10); // Convert to integer

    // Find the post that matches the given ID
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment the likes
    post.likes = (post.likes || 0) + 1;

    // Respond with the updated post
    return res.status(200).json(post);
  } else {
    // If the method is not PATCH, return a 405 Method Not Allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
