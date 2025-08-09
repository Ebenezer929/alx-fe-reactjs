import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfile from './components/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Original Vite + React demo content */}
      <div className="text-center py-8">
        <div className="flex justify-center gap-4 mb-4">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-4">Vite + React</h1>
        <div className="card bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-4">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-700">
            Edit <code className="bg-gray-100 px-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      {/* Your UserProfile component */}
      <UserProfile />
    </div>
  )
}

export default App
