import React from 'react';

const PostList = ({ posts, onDelete }) => {
  return (
    <div>
      <h2>Posts</h2>
        <ul>
          {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => onDelete(post.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No posts available.</p>
        )}
        </ul>
    </div>
  );
};

export default PostList;