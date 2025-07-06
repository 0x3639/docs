import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './styles.module.css';

export default function RequestResponseViewer({ request, response, isLoading, shareableUrl, onCopyUrl, autoFocusResponse }) {
  const [activeTab, setActiveTab] = useState('request');

  // Auto-focus response tab when response arrives
  React.useEffect(() => {
    if (autoFocusResponse && response && !isLoading) {
      setActiveTab('response');
    }
  }, [autoFocusResponse, response, isLoading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatJSON = (obj) => {
    if (!obj) return '';
    return JSON.stringify(obj, null, 2);
  };

  // Custom style to match the example
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#1e1e1e',
      margin: 0,
      padding: '15px',
      borderRadius: '4px',
      fontSize: '0.9em',
      lineHeight: '1.4',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'none',
      fontSize: 'inherit',
    }
  };

  return (
    <div className={styles.requestResponseViewer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'request' ? styles.active : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Request
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'response' ? styles.active : ''}`}
          onClick={() => setActiveTab('response')}
        >
          Response
        </button>
        {shareableUrl && (
          <button
            className={`${styles.tab} ${activeTab === 'share' ? styles.active : ''}`}
            onClick={() => setActiveTab('share')}
          >
            Share
          </button>
        )}
      </div>

      {activeTab === 'request' && (
        <div className={styles.tabContent}>
          <div className={styles.codeHeader}>
            <h3>Request</h3>
            {request && (
              <button
                onClick={() => copyToClipboard(formatJSON(request))}
                className={styles.copyButton}
              >
                Copy
              </button>
            )}
          </div>
          <div className={styles.codeContainer}>
            <SyntaxHighlighter
              language="json"
              style={customStyle}
              customStyle={{
                background: '#1e1e1e',
                border: '1px solid #444',
                borderRadius: '4px',
                margin: 0,
                minHeight: '200px',
                maxHeight: '500px',
                overflow: 'auto'
              }}
            >
              {request ? formatJSON(request) : 'No request generated yet'}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {activeTab === 'response' && (
        <div className={styles.tabContent}>
          <div className={styles.codeHeader}>
            <h3>Response</h3>
            {response && (
              <button
                onClick={() => copyToClipboard(formatJSON(response))}
                className={styles.copyButton}
              >
                Copy
              </button>
            )}
          </div>
          <div className={styles.codeContainer}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <span>Waiting for response...</span>
                </div>
              </div>
            ) : (
              <SyntaxHighlighter
                language="json"
                style={customStyle}
                customStyle={{
                  background: '#1e1e1e',
                  border: `1px solid ${response?.error ? '#f87171' : '#444'}`,
                  borderLeft: response?.error ? '4px solid #f87171' : '4px solid #10b981',
                  borderRadius: '4px',
                  margin: 0,
                  minHeight: '200px',
                  maxHeight: '500px',
                  overflow: 'auto'
                }}
              >
                {response ? formatJSON(response) : 'No response yet'}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      )}

      {activeTab === 'share' && shareableUrl && (
        <div className={styles.tabContent}>
          <div className={styles.codeHeader}>
            <h3>Shareable URL</h3>
          </div>
          <div className={styles.shareSection}>
            <p>Share this URL to let others see this exact query and response:</p>
            <div className={styles.urlContainer}>
              <input
                type="text"
                value={shareableUrl}
                readOnly
                className={styles.shareInput}
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={onCopyUrl}
                className={styles.copyUrlButton}
              >
                Copy
              </button>
            </div>
            <p className={styles.shareNote}>
              This URL contains the method and parameters. 
              When someone clicks this link, it will auto-connect and execute the query to show fresh results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}