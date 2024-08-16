import React from 'react';

const Rectangle = ({ names, onNameClick }) => {
  return (
    <div style={styles.rectangle}>
      {names.map((name, index) => (
        <div 
          key={index} 
          style={styles.nameItem} 
          onClick={() => onNameClick(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

const styles = {
  rectangle: {
    border: '1px solid black',
    padding: '10px',
    width: '200px',
    height: '300px',
    overflowY: 'scroll',
    backgroundColor: '#f0f0f0',
  },
  nameItem: {
    padding: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    marginBottom: '5px',
    borderRadius: '3px',
    boxShadow: '0 0 2px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  },
  nameItemHover: {
    backgroundColor: '#e0e0e0',
  }
};

export default Rectangle;
