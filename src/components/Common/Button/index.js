import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

function Button({ text, onClick, outlined }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Only call handleClick if outlined is false (className is 'btn')
    if (!outlined) {  
     /* if (onClick) {
        onClick();  // Call the provided onClick function if it exists
      }*/
      navigate('/dashboard'); // Navigate to /dashboard
    }
  };

  return (
    <div className={outlined ? "outlined-btn" : 'btn'} onClick={handleClick}>
      {text}
    </div>
  );
}

export default Button;