import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="card text-center">
        <motion.h1 
          className="title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          כפתור ופרח
        </motion.h1>
        <motion.h2 
          className="subtitle"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          משחק לניחוש צירופי לשון
        </motion.h2>
        
        <motion.div
          className="welcome-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p>ברוכים הבאים למשחק "כפתור ופרח"!</p>
          <p>במשחק זה תראו לוח ובו 9 מילים, ועליכם לנחש את המילים המקבילות בלוח הנסתר.</p>
          <p>הקשר בין המילים הוא דרך מילה מקשרת שיוצרת צירופים עם שתי המילים.</p>
          <p>לדוגמה: אם בלוח הגלוי מופיעה המילה "בית" ובלוח הנסתר המילה "מתח",<br />המילה המקשרת היא "ספר" (בית ספר, ספר מתח).</p>
        </motion.div>
        
        <motion.div 
          className="button-container flex flex-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/boards')}
          >
            בחר לוח משחק
          </button>
          <button 
            className="btn"
            onClick={() => navigate('/create')}
            style={{ marginRight: '1rem' }}
          >
            צור לוח חדש
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome; 