import React from 'react';
import TryButton from './TryButton';

export default function APIExample({ method, defaultParams = {} }) {
  return (
    <div style={{ 
      border: '1px solid var(--ifm-color-emphasis-300)', 
      borderRadius: '8px', 
      padding: '15px', 
      marginTop: '20px',
      backgroundColor: 'var(--ifm-background-surface-color)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '15px' 
      }}>
        <h4 style={{ margin: 0 }}>Try this API method</h4>
        <TryButton method={method} defaultParams={defaultParams} />
      </div>
      <p style={{ 
        margin: 0, 
        color: 'var(--ifm-color-secondary)', 
        fontSize: '0.9em' 
      }}>
        Test <code>{method}</code> directly in the API playground with pre-filled parameters.
      </p>
    </div>
  );
}