// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>React Query Demo - Posts from JSONPlaceholder</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;