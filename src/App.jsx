import React from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      {/* Vite Demo Section (optional) */}
      <section className="demo-section">
        <div className="logo-group">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src="/react.svg" className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
      </section>

      {/* ALX Task Components */}
      <WelcomeMessage />
      <Header />
      <MainContent />
      <UserProfile 
        name="Alice" 
        age={25} 
        bio="Loves hiking and photography" 
      />
      <Footer />
    </div>
  );
}

export default App;
