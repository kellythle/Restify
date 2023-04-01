import React from 'react';
import './App.css';
import Properties from './components/Properties';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Frontend for Restify</h1>
      </header>
      <div className="App-content">
        <Properties />
      </div>
    </div>
  );
}

export default App;
