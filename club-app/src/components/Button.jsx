// src/components/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  ...props 
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="btn-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {icon && !loading && <i className={`${icon} btn-icon`}></i>}
      {children}
    </button>
  );
};

export default Button;