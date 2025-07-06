import React from 'react';
import styles from './styles.module.css';

export default function TryButton({ method, defaultParams = {}, className = '' }) {
  const openInPlayground = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      method: method,
      params: JSON.stringify(defaultParams)
    });
    const url = `${baseUrl}/api-playground?${params.toString()}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      className={`${styles.tryButton} ${className}`}
      onClick={openInPlayground}
      title={`Try ${method} in API Playground`}
    >
      Try it
    </button>
  );
}