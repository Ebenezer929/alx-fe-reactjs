// src/components/PostsComponent.jsx
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // Data becomes stale after 5 minutes
  });

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts</h2>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
      
      {isFetching && <div className="refreshing">Updating posts...</div>}
      
      <div className="posts-list">
        {data.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-id">Post ID: {post.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;