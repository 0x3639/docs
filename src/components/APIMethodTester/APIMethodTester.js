import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { getMethodByName, PARAM_TYPES } from '../../data/apiMethods';
import styles from './styles.module.css';

export default function APIMethodTester({ method, defaultParams = {} }) {
  const { isConnected, sendRequest, connect } = useWebSocket();
  const [parameters, setParameters] = useState(defaultParams);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const methodInfo = getMethodByName(method);

  useEffect(() => {
    // Initialize parameters with defaults
    if (methodInfo && Object.keys(parameters).length === 0) {
      const defaultParams = {};
      methodInfo.params.forEach((param, index) => {
        if (param.default !== undefined) {
          defaultParams[index] = param.default;
        }
      });
      setParameters(defaultParams);
    }
  }, [methodInfo, parameters]);

  const handleTryClick = () => {
    if (!isConnected) {
      connect();
    }
    setShowForm(true);
  };

  const handleParameterChange = (index, value) => {
    const newParams = { ...parameters };
    const param = methodInfo.params[index];
    
    if (param.type === 'number' && value !== '') {
      newParams[index] = parseInt(value, 10);
    } else if (param.type === 'array' || param.type === 'object') {
      try {
        newParams[index] = JSON.parse(value);
      } catch (e) {
        newParams[index] = value;
      }
    } else {
      newParams[index] = value;
    }
    
    setParameters(newParams);
  };

  const handleExecute = async () => {
    if (!isConnected) {
      setError('WebSocket is not connected');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    const paramsArray = Object.values(parameters);

    try {
      const result = await sendRequest(method, paramsArray);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openInPlayground = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      method: method,
      params: JSON.stringify(parameters)
    });
    const url = `${baseUrl}/api-playground?${params.toString()}`;
    window.open(url, '_blank');
  };

  if (!methodInfo) {
    return null;
  }

  return (
    <div className={styles.methodTester}>
      <div className={styles.header}>
        <button 
          className={styles.tryButton}
          onClick={handleTryClick}
        >
          Try it
        </button>
        <button 
          className={styles.playgroundButton}
          onClick={openInPlayground}
        >
          Open in Playground
        </button>
      </div>

      {showForm && (
        <div className={styles.form}>
          <div className={styles.connectionStatus}>
            Status: <span className={isConnected ? styles.connected : styles.disconnected}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {methodInfo.params.length > 0 && (
            <div className={styles.parameters}>
              <h4>Parameters</h4>
              {methodInfo.params.map((param, index) => {
                const value = parameters[index] || '';
                const typeInfo = PARAM_TYPES[param.type];
                
                return (
                  <div key={index} className={styles.paramField}>
                    <label className={styles.paramLabel}>
                      {param.name}
                      {param.required && <span className={styles.required}>*</span>}
                    </label>
                    <div className={styles.paramDescription}>{param.description}</div>
                    {param.type === 'object' || param.type === 'array' ? (
                      <textarea
                        value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                        onChange={(e) => handleParameterChange(index, e.target.value)}
                        placeholder={typeInfo?.placeholder || ''}
                        className={styles.paramInput}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={param.type === 'number' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) => handleParameterChange(index, e.target.value)}
                        placeholder={typeInfo?.placeholder || ''}
                        className={styles.paramInput}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className={styles.actions}>
            <button
              onClick={handleExecute}
              disabled={!isConnected || isLoading}
              className={styles.executeButton}
            >
              {isLoading ? 'Executing...' : 'Execute'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {response && (
            <div className={styles.response}>
              <h4>Response</h4>
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1e1e1e',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  margin: 0,
                  minHeight: '150px',
                  maxHeight: '400px',
                  overflow: 'auto',
                  fontSize: '0.9em',
                  lineHeight: '1.4'
                }}
              >
                {JSON.stringify(response, null, 2)}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </div>
  );
}