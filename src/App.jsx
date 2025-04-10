import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Welcome from './components/Welcome';
import Game from './components/Game/Game';
import BoardCreator from './components/Admin/BoardCreator';
import BoardsList from './components/Admin/BoardsList';
import GameOver from './components/GameOver';
import './styles/main.css';
import './styles/animations.css';
import './styles/admin.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game/:boardId" element={<Game />} />
            <Route path="/create" element={<BoardCreator />} />
            <Route path="/boards" element={<BoardsList />} />
            <Route path="/game-over" element={<GameOver />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App; 