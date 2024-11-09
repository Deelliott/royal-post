import React, { useState, useEffect } from 'react';



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] =
  useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.log('Fetched posts:', data);
       
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Error fetching posts');
    }
  };

  fetchPosts();
}, []);

const handleCreatePost = async (e) => {
  e.preventDefault();

  if (!title || !content) {
    setError('Title and content are required');
    return;
  }

  setLoading(true);

  const postData ={
    title,
    content,
  };

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(postData),
     
    });
    
    if (response.ok) {
      const data = await response.json();
      setPosts([data, ...posts]);
      setTitle('');
      setContent('');
      setError('');
    } else {
      const data = await response.json();
      setError(data.message || 'Error creating post');

    }
  } catch (err) {
    setError('Error creating post');
  }
  setLoading(false);
};

const handleDeletePost = async (id) => {
  try {
    const response = await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      const data = await response.json();
      setError(data.message || 'Error deleting post');
    }
  } catch (err) {
    setError('Error deleting post');
  }
};

return (
  <div>
    <h1>Royal Post</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleCreatePost}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" required />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter post content" required />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Create Post'}</button>
    </form>

    <h2>Posts</h2>
    <ul>
      {posts.length > 0 ? (
        posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))
      ) : (
        <p>No posts available.</p>
      )}
      </ul>
  </div>
);
}