import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const buttonClass = `
    btn 
    btn--${variant} 
    btn--${size} 
    ${icon ? 'btn--with-icon' : ''} 
    ${loading ? 'btn--loading' : ''} 
    ${disabled ? 'btn--disabled' : ''} 
    ${className}
  `.trim();

  return (
    <button 
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
    </button>
  );
};

export default Button;