import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';
import Board from './Board';
import GuessInput from './GuessInput';

const Game = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { loadBoard, isGameOver, guessedCells, hiddenBoard } = useContext(GameContext);
  
  useEffect(() => {
    const boardLoaded = loadBoard(boardId);
    if (!boardLoaded) {
      navigate('/');
    }
  }, [boardId, loadBoard, navigate]);
  
  useEffect(() => {
    if (isGameOver) {
      navigate('/game-over');
    }
  }, [isGameOver, navigate]);
  
  return (
    <motion.div 
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="game-header">
        <h1 className="title">כפתור ופרח</h1>
        <div className="progress-container">
          <p>התקדמות: {guessedCells.length} / {hiddenBoard.length}</p>
        </div>
      </div>
      
      <Board />
      <GuessInput />
      
      <div className="game-footer">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/boards')}
        >
          חזרה ללוחות
        </button>
      </div>
    </motion.div>
  );
};

export default Game; 