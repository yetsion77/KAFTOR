import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';

const BoardCreator = () => {
  const navigate = useNavigate();
  const { createBoard } = useContext(GameContext);
  const [boardName, setBoardName] = useState('');
  const [phrases, setPhrases] = useState(['', '', '', '', '', '', '', '', '']);
  const [errors, setErrors] = useState([]);
  
  const handlePhraseChange = (index, value) => {
    const newPhrases = [...phrases];
    newPhrases[index] = value;
    setPhrases(newPhrases);
  };
  
  const validateBoard = () => {
    const newErrors = [];
    
    if (!boardName.trim()) {
      newErrors.push('יש להזין שם ללוח');
    }
    
    phrases.forEach((phrase, index) => {
      const words = phrase.trim().split(' ');
      if (words.length < 3) {
        newErrors.push(`שורה ${index + 1}: יש להזין 3 מילים מופרדות ברווח`);
      }
    });
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateBoard()) {
      const boardId = createBoard({
        name: boardName,
        phrases: phrases.filter(phrase => phrase.trim() !== '')
      });
      
      navigate(`/game/${boardId}`);
    }
  };
  
  return (
    <motion.div 
      className="board-creator-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h1 className="title">יצירת לוח חדש</h1>
        <p className="text-center">הזן 9 צירופי מילים בפורמט: "מילה1 מילה2 מילה3"</p>
        <p className="text-center">לדוגמה: "בית ספר מתח"</p>
        
        {errors.length > 0 && (
          <div className="message error">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>שם הלוח:</label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="הזן שם ללוח"
            />
          </div>
          
          <div className="phrases-container">
            {phrases.map((phrase, index) => (
              <div className="input-group" key={index}>
                <label>צירוף {index + 1}:</label>
                <input
                  type="text"
                  value={phrase}
                  onChange={(e) => handlePhraseChange(index, e.target.value)}
                  placeholder="מילה1 מילה2 מילה3"
                />
              </div>
            ))}
          </div>
          
          <div className="button-container flex flex-center">
            <button type="submit" className="btn">צור לוח</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              style={{ marginRight: '1rem' }}
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default BoardCreator; 