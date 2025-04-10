import React from 'react';
import { motion } from 'framer-motion';

const Cell = ({ index, word, isSelected, isGuessed, onClick, type }) => {
  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    guessed: {
      backgroundColor: 'rgba(46, 204, 113, 0.2)',
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className={`cell ${isSelected ? 'selected' : ''} ${isGuessed ? 'revealed' : ''}`}
      variants={cellVariants}
      initial="hidden"
      animate={isGuessed ? "guessed" : "visible"}
      custom={index}
      onClick={onClick}
      whileHover={type === "visible" ? { scale: 1.05 } : {}}
      whileTap={type === "visible" ? { scale: 0.95 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        repeat: 0 
      }}
    >
      {type === "hidden" && isGuessed ? (
        <motion.span
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5, repeat: 0 }}
        >
          {word}
        </motion.span>
      ) : (
        <span>{word}</span>
      )}
    </motion.div>
  );
};

export default Cell; 