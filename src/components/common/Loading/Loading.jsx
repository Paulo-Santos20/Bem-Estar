import React from 'react';
import './Loading.css';

export const Loading = ({ 
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text = 'Carregando...',
  showText = true,
  overlay = false,
  fullscreen = false,
  className = ''
}) => {
  const getLoadingContent = () => {
    switch (type) {
      case 'spinner':
        return <div className="loading__spinner"></div>;
      
      case 'dots':
        return (
          <div className="loading__dots">
            <div className="loading__dot"></div>
            <div className="loading__dot"></div>
            <div className="loading__dot"></div>
          </div>
        );
      
      case 'pulse':
        return <div className="loading__pulse"></div>;
      
      case 'bars':
        return (
          <div className="loading__bars">
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
            <div className="loading__bar"></div>
          </div>
        );
      
      case 'wave':
        return (
          <div className="loading__wave">
            <div className="loading__wave-bar"></div>
            <div className="loading__wave-bar"></div>
            <div className="loading__wave-bar"></div>
            <div className="loading__wave-bar"></div>
            <div className="loading__wave-bar"></div>
          </div>
        );
      
      case 'skeleton':
        return (
          <div className="loading__skeleton">
            <div className="loading__skeleton-line loading__skeleton-line--title"></div>
            <div className="loading__skeleton-line"></div>
            <div className="loading__skeleton-line"></div>
            <div className="loading__skeleton-line loading__skeleton-line--short"></div>
          </div>
        );
      
      case 'pharmacy':
        return (
          <div className="loading__pharmacy">
            <div className="loading__pharmacy-cross">
              <div className="loading__pharmacy-cross-horizontal"></div>
              <div className="loading__pharmacy-cross-vertical"></div>
            </div>
            <div className="loading__pharmacy-pills">
              <div className="loading__pill loading__pill--1"></div>
              <div className="loading__pill loading__pill--2"></div>
              <div className="loading__pill loading__pill--3"></div>
            </div>
          </div>
        );
      
      case 'heartbeat':
        return (
          <div className="loading__heartbeat">
            <div className="loading__heart">♥</div>
            <div className="loading__heartbeat-line">
              <svg viewBox="0 0 100 20" className="loading__heartbeat-svg">
                <polyline
                  points="0,10 20,10 25,5 30,15 35,5 40,15 45,10 100,10"
                  className="loading__heartbeat-path"
                />
              </svg>
            </div>
          </div>
        );
      
      default:
        return <div className="loading__spinner"></div>;
    }
  };

  const containerClasses = [
    'loading',
    `loading--${type}`,
    `loading--${size}`,
    `loading--${color}`,
    overlay ? 'loading--overlay' : '',
    fullscreen ? 'loading--fullscreen' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="loading__content">
        {getLoadingContent()}
        {showText && text && (
          <div className="loading__text">
            {text}
          </div>
        )}
      </div>
    </div>
  );

  // Se for fullscreen ou overlay, renderizar em portal
  if (fullscreen || overlay) {
    return (
      <>
        {overlay && <div className="loading__backdrop"></div>}
        {content}
      </>
    );
  }

  return content;
};

// Componentes especializados para casos específicos
export const LoadingSpinner = (props) => (
  <Loading type="spinner" {...props} />
);

export const LoadingDots = (props) => (
  <Loading type="dots" {...props} />
);

export const LoadingPulse = (props) => (
  <Loading type="pulse" {...props} />
);

export const LoadingBars = (props) => (
  <Loading type="bars" {...props} />
);

export const LoadingWave = (props) => (
  <Loading type="wave" {...props} />
);

export const LoadingSkeleton = (props) => (
  <Loading type="skeleton" showText={false} {...props} />
);

export const LoadingPharmacy = (props) => (
  <Loading type="pharmacy" text="Carregando produtos..." {...props} />
);

export const LoadingHeartbeat = (props) => (
  <Loading type="heartbeat" text="Verificando saúde..." {...props} />
);

// Loading para páginas inteiras
export const PageLoading = ({ text = 'Carregando página...' }) => (
  <Loading 
    type="pharmacy" 
    size="large" 
    text={text} 
    fullscreen 
    overlay 
  />
);

// Loading para componentes
export const ComponentLoading = ({ text = 'Carregando...', type = 'spinner' }) => (
  <div className="loading-component">
    <Loading 
      type={type} 
      size="small" 
      text={text} 
    />
  </div>
);

// Loading para botões
export const ButtonLoading = ({ size = 'small' }) => (
  <Loading 
    type="spinner" 
    size={size} 
    showText={false} 
    className="loading--button"
  />
);

export default Loading;