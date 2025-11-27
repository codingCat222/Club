// src/components/Input.jsx
import React, { useState } from 'react';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const getInputType = () => {
    if (type === 'password' && showPassword) return 'text';
    return type;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
        {icon && <i className={`${icon} input-icon`}></i>}
        
        <input
          id={inputId}
          type={getInputType()}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field"
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        )}
      </div>
      
      {error && <div className="input-error">{error}</div>}
      {success && <div className="input-success">{success}</div>}
    </div>
  );
};

export default Input;