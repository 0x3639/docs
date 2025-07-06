import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [wsUrl, setWsUrl] = useState('wss://my.hc1node.com:35998');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);
  
  const ws = useRef(null);
  const requestId = useRef(1);
  const pendingRequests = useRef(new Map());

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        
        // Reject all pending requests
        pendingRequests.current.forEach((resolve, reject) => {
          reject(new Error('WebSocket connection closed'));
        });
        pendingRequests.current.clear();
      };

      ws.current.onerror = (event) => {
        setError('WebSocket connection error');
        setIsConnecting(false);
      };

      ws.current.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          setLastResponse(response);
          
          if (response.id && pendingRequests.current.has(response.id)) {
            const { resolve } = pendingRequests.current.get(response.id);
            pendingRequests.current.delete(response.id);
            resolve(response);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };
    } catch (err) {
      setError(err.message);
      setIsConnecting(false);
    }
  }, [wsUrl]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const sendRequest = useCallback((method, params = []) => {
    return new Promise((resolve, reject) => {
      if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket is not connected'));
        return;
      }

      const id = requestId.current++;
      const request = {
        jsonrpc: '2.0',
        id,
        method,
        params
      };

      pendingRequests.current.set(id, { resolve, reject });

      try {
        ws.current.send(JSON.stringify(request));
      } catch (err) {
        pendingRequests.current.delete(id);
        reject(err);
      }

      // Timeout after 30 seconds
      setTimeout(() => {
        if (pendingRequests.current.has(id)) {
          pendingRequests.current.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const value = {
    wsUrl,
    setWsUrl,
    isConnected,
    isConnecting,
    error,
    lastResponse,
    connect,
    disconnect,
    sendRequest
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};