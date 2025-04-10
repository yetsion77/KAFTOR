import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { GameContext } from '../context/GameContext';

const GameOver = () => {
  const navigate = useNavigate();
  const { visibleBoard, hiddenBoard, connectingWords, currentBoard } = useContext(GameContext);
  
  if (!currentBoard) {
    navigate('/');
    return null;
  }
  
  return (
    <motion.div 
      className="game-over-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.1}
      />
      
      <div className="card text-center">
        <motion.h1 
          className="title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          כל הכבוד!
        </motion.h1>
        <h2 className="subtitle">השלמת את כל הלוח בהצלחה!</h2>
        
        <div className="summary-container">
          <h3>סיכום הצירופים:</h3>
          <div className="phrases-grid">
            {visibleBoard.map((word, index) => (
              <motion.div 
                key={index}
                className="phrase-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <p>
                  <strong>{visibleBoard[index]}</strong> {connectingWords[index]} <strong>{hiddenBoard[index]}</strong>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="button-container flex flex-center">
          <button 
            className="btn"
            onClick={() => navigate(`/game/${currentBoard.id}`)}
          >
            שחק שוב
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/boards')}
            style={{ marginRight: '1rem' }}
          >
            בחר לוח אחר
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOver; 