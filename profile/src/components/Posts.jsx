import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for HTTP requests
import './Posts.css'; // Optional, for styling

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts data from the API
  useEffect(() => {
    // Using axios to fetch data from the API
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data); // Set posts data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Error fetching posts'); // Handle any errors
        setLoading(false); // Set loading to false on error
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading posts...</div>; // Display loading text while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div className="posts-container">
      <h1>All Posts</h1>

      {/* Display list of posts */}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p><strong>Author:</strong> {post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;