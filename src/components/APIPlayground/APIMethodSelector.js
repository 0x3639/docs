import React, { useState } from 'react';
import { API_METHODS } from '../../data/apiMethods';
import styles from './styles.module.css';

export default function APIMethodSelector({ selectedMethod, onMethodSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleMethodSelect = (methodName) => {
    onMethodSelect(methodName);
  };

  const filteredCategories = Object.entries(API_METHODS).filter(([namespace, category]) => {
    if (!searchTerm) return true;
    
    // Check if category name matches
    if (category.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    
    // Check if any method in category matches
    return Object.entries(category.methods).some(([methodName, methodInfo]) => 
      methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      methodInfo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getFilteredMethods = (methods) => {
    const entries = Object.entries(methods);
    if (!searchTerm) return entries;
    
    return entries.filter(([methodName, methodInfo]) =>
      methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      methodInfo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className={styles.methodSelector}>
      <div className={styles.filterControls}>
        <input
          type="text"
          placeholder="Search methods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedMethod || ''}
          onChange={(e) => handleMethodSelect(e.target.value)}
          className={styles.methodDropdown}
        >
          <option value="">Select an API method...</option>
          {filteredCategories.map(([namespace, category]) => (
            <optgroup key={namespace} label={category.name}>
              {getFilteredMethods(category.methods).map(([methodName, methodInfo]) => (
                <option key={methodName} value={methodName}>
                  {methodName} - {methodInfo.description}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {selectedMethod && (
        <div className={styles.selectedMethod}>
          <div className={styles.methodName}>{selectedMethod}</div>
          <div className={styles.methodDescription}>
            {(() => {
              for (const [namespace, category] of Object.entries(API_METHODS)) {
                if (category.methods[selectedMethod]) {
                  return category.methods[selectedMethod].description;
                }
              }
              return '';
            })()}
          </div>
        </div>
      )}
    </div>
  );
}