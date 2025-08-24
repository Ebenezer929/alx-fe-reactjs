import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  )
}

export default App