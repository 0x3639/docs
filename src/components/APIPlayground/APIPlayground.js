import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { getMethodByName } from '../../data/apiMethods';
import APIMethodSelector from './APIMethodSelector';
import ParameterBuilder from './ParameterBuilder';
import RequestResponseViewer from './RequestResponseViewer';
import styles from './styles.module.css';

export default function APIPlayground() {
  const { wsUrl, setWsUrl, isConnected, isConnecting, error, connect, disconnect, sendRequest } = useWebSocket();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [parameters, setParameters] = useState({});
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customUrl, setCustomUrl] = useState(wsUrl);
  const [shareableUrl, setShareableUrl] = useState('');
  const [shouldAutoConnect, setShouldAutoConnect] = useState(true);
  const [userDisconnected, setUserDisconnected] = useState(false);
  const [userChangedNode, setUserChangedNode] = useState(false);
  const [initialAutoConnectDone, setInitialAutoConnectDone] = useState(false);
  const [sharedUrlExecuted, setSharedUrlExecuted] = useState(false);

  // Parse URL parameters and auto-connect for shared URLs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const methodParam = urlParams.get('method');
      
      if (methodParam) {
        // Convert clean method name back to full method name
        let actualMethod = methodParam;
        
        // Handle embedded contracts (add embedded. prefix if needed)
        if (!methodParam.startsWith('ledger.') && 
            !methodParam.startsWith('stats.') && 
            !methodParam.startsWith('subscribe.') && 
            !methodParam.startsWith('embedded.')) {
          // Check if it's an embedded contract method
          const embeddedPrefixes = ['pillar.', 'plasma.', 'sentinel.', 'token.', 'stake.', 'swap.', 'accelerator.', 'spork.', 'htlc.', 'bridge.', 'liquidity.'];
          for (const prefix of embeddedPrefixes) {
            if (methodParam.startsWith(prefix)) {
              actualMethod = `embedded.${methodParam}`;
              break;
            }
          }
        }
        
        setSelectedMethod(actualMethod);
        
        // Parse parameters from clean URL format
        const methodInfo = getMethodByName(actualMethod);
        if (methodInfo) {
          const parsedParams = {};
          methodInfo.params.forEach((param, index) => {
            const value = urlParams.get(param.name);
            if (value !== null) {
              // Convert value based on parameter type
              if (param.type === 'number') {
                parsedParams[index] = parseInt(value, 10);
              } else if (param.type === 'array' || param.type === 'object') {
                try {
                  parsedParams[index] = JSON.parse(value);
                } catch (e) {
                  parsedParams[index] = value;
                }
              } else {
                parsedParams[index] = value;
              }
            }
          });
          setParameters(parsedParams);
          
          // Auto-connect to default node for shared URLs (only if user hasn't manually disconnected)
          if (!isConnected && !isConnecting && !userDisconnected && !initialAutoConnectDone) {
            setInitialAutoConnectDone(true);
            connect();
          }
        }
      }
    }
  }, [connect, isConnected, isConnecting]);

  // Auto-execute query when connected and we have a shared URL with parameters
  useEffect(() => {
    const executeSharedQuery = async () => {
      if (!selectedMethod || !isConnected) return;

      setIsLoading(true);
      setResponse(null);

      const paramsArray = Object.values(parameters);
      const requestObj = {
        jsonrpc: '2.0',
        id: Date.now(),
        method: selectedMethod,
        params: paramsArray
      };

      setRequest(requestObj);

      try {
        const result = await sendRequest(selectedMethod, paramsArray);
        setResponse(result);
      } catch (err) {
        setResponse({
          error: {
            code: -1,
            message: err.message
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected && selectedMethod && Object.keys(parameters).length > 0 && !response && !sharedUrlExecuted) {
      // Check if this came from a shared URL
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const hasSharedParams = urlParams.get('method') && 
          urlParams.toString().includes('=') && 
          urlParams.toString() !== `method=${selectedMethod}`;
        
        if (hasSharedParams) {
          setSharedUrlExecuted(true);
          executeSharedQuery();
        }
      }
    }
  }, [isConnected, selectedMethod, parameters, response, sendRequest]);

  // Auto-connect when first visiting the playground (not from shared URL)
  useEffect(() => {
    if (shouldAutoConnect && !isConnected && !isConnecting && !userDisconnected && !initialAutoConnectDone && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const hasMethod = urlParams.get('method');
      
      // Only auto-connect if it's a fresh visit (no method in URL)
      if (!hasMethod) {
        setInitialAutoConnectDone(true);
        connect();
        setShouldAutoConnect(false);
      }
    }
  }, [shouldAutoConnect, isConnected, isConnecting, connect, userDisconnected, initialAutoConnectDone]);

  const handleConnect = () => {
    // Reset user intent flags when manually connecting
    setUserDisconnected(false);
    setWsUrl(customUrl);
    connect();
  };

  const handleDisconnect = () => {
    // Set flag to indicate user manually disconnected
    setUserDisconnected(true);
    disconnect();
  };

  const resetToDefaultNode = () => {
    setCustomUrl(wsUrl);
    setUserChangedNode(false);
  };

  // Generate clean shareable URL similar to ZenonHub format
  const generateShareableUrl = (method, params) => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      const urlParams = new URLSearchParams();
      
      // Use clean method name format (like ZenonHub: Ledger.getAccountBlocksByHeight)
      const cleanMethodName = method.replace(/^embedded\./, '').replace(/\./g, '.');
      urlParams.set('method', cleanMethodName);
      
      // Only add parameters if they have values
      const hasParams = Object.values(params).some(value => 
        value !== '' && value !== null && value !== undefined
      );
      
      if (hasParams) {
        Object.entries(params).forEach(([index, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            const paramName = getParameterName(method, parseInt(index));
            urlParams.set(paramName, value);
          }
        });
      }
      
      return `${baseUrl}?${urlParams.toString()}`;
    }
    return '';
  };

  // Helper function to get parameter names for clean URLs
  const getParameterName = (method, index) => {
    const methodInfo = getMethodByName(method);
    if (methodInfo && methodInfo.params[index]) {
      return methodInfo.params[index].name;
    }
    return `param${index}`;
  };

  const handleExecute = async () => {
    if (!selectedMethod || !isConnected) return;

    setIsLoading(true);
    setResponse(null);
    setShareableUrl('');

    // Build params array from parameters object
    const paramsArray = Object.values(parameters);

    const requestObj = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: selectedMethod,
      params: paramsArray
    };

    setRequest(requestObj);

    try {
      const result = await sendRequest(selectedMethod, paramsArray);
      setResponse(result);
      
      // Generate clean shareable URL (without response data)
      const shareUrl = generateShareableUrl(selectedMethod, parameters);
      setShareableUrl(shareUrl);
      
      // Update browser URL without page reload
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', shareUrl);
      }
      
      // Auto-focus on response tab and scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('.results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      const errorResponse = {
        error: {
          code: -1,
          message: err.message
        }
      };
      setResponse(errorResponse);
      
      // Generate shareable URL even for errors
      const shareUrl = generateShareableUrl(selectedMethod, parameters);
      setShareableUrl(shareUrl);
    } finally {
      setIsLoading(false);
    }
  };

  const copyShareableUrl = () => {
    if (shareableUrl && navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
    }
  };

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <h1>API Playground</h1>
        <p>Test Zenon RPC API methods in real-time</p>
      </div>

      <div className={styles.connectionSection}>
        <h2>Connection</h2>
        <div className={styles.connectionControls}>
          <input
            type="text"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              // Track that user changed from default node
              if (e.target.value !== wsUrl) {
                setUserChangedNode(true);
              }
            }}
            placeholder="WebSocket URL"
            className={styles.urlInput}
            disabled={isConnected}
          />
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={styles.connectButton}
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className={styles.disconnectButton}
            >
              Disconnect
            </button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.connectionStatus}>
          Status: <span className={isConnected ? styles.connected : styles.disconnected}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          {userChangedNode && customUrl !== wsUrl && (
            <button 
              onClick={resetToDefaultNode}
              className={styles.resetButton}
              disabled={isConnected}
            >
              Reset to Default Node
            </button>
          )}
        </div>
      </div>

      <div className={styles.methodSection}>
        <h2>Method Selection</h2>
        <APIMethodSelector
          selectedMethod={selectedMethod}
          onMethodSelect={(method) => {
            // Clear previous request/response when method changes
            if (method !== selectedMethod) {
              setRequest(null);
              setResponse(null);
              setShareableUrl('');
              setParameters({});
              
              // Update URL immediately when method changes
              if (typeof window !== 'undefined') {
                const baseUrl = window.location.origin + window.location.pathname;
                const newUrl = method ? `${baseUrl}?method=${method}` : baseUrl;
                window.history.pushState({}, '', newUrl);
              }
            }
            setSelectedMethod(method);
          }}
        />
      </div>

      {selectedMethod && (
        <div className={styles.parametersSection}>
          <h2>Parameters</h2>
          <ParameterBuilder
            method={selectedMethod}
            parameters={parameters}
            onParametersChange={setParameters}
          />
          <button
            onClick={handleExecute}
            disabled={!isConnected || isLoading}
            className={styles.executeButton}
          >
            {isLoading ? 'Executing...' : 'Execute'}
          </button>
        </div>
      )}

      {(request || response) && (
        <div className={`${styles.resultsSection} results-section`}>
          <RequestResponseViewer
            request={request}
            response={response}
            isLoading={isLoading}
            shareableUrl={shareableUrl}
            onCopyUrl={copyShareableUrl}
            autoFocusResponse={!isLoading && response}
          />
        </div>
      )}
    </div>
  );
}