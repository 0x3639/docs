import React, { useEffect, useState } from 'react';
import { getMethodByName, PARAM_TYPES } from '../../data/apiMethods';
import styles from './styles.module.css';

export default function ParameterBuilder({ method, parameters, onParametersChange }) {
  const methodInfo = getMethodByName(method);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    // Initialize parameters with defaults when method changes
    if (methodInfo) {
      const defaultParams = {};
      methodInfo.params.forEach((param, index) => {
        if (param.default !== undefined) {
          defaultParams[index] = param.default;
        } else if (!param.required) {
          defaultParams[index] = '';
        }
      });
      onParametersChange(defaultParams);
    }
  }, [method]);

  if (!methodInfo) return null;

  const handleParamChange = (index, value) => {
    const newParams = { ...parameters };
    
    // Convert value based on type
    const param = methodInfo.params[index];
    if (param.type === 'number' && value !== '') {
      newParams[index] = parseInt(value, 10);
    } else if (param.type === 'array' || param.type === 'object') {
      try {
        newParams[index] = JSON.parse(value);
      } catch (e) {
        newParams[index] = value; // Keep as string if invalid JSON
      }
    } else {
      newParams[index] = value;
    }
    
    onParametersChange(newParams);
  };

  const validateParam = (param, value) => {
    // If field has a default value, it's not invalid
    if (param.default !== undefined) return true;
    
    // If required and empty, it's invalid
    if (param.required && (!value || value === '')) return false;
    
    // If not required and empty, it's valid
    if (!param.required && (!value || value === '')) return true;
    
    // If has value, validate the type
    const typeInfo = PARAM_TYPES[param.type];
    if (typeInfo && value) {
      return typeInfo.validate(value);
    }
    return true;
  };

  const getFieldClassName = (param, value, index) => {
    const baseClass = styles.paramInput;
    const isTextarea = param.type === 'object' || param.type === 'array';
    const textareaClass = isTextarea ? styles.paramTextarea : '';
    
    // Check if field is focused
    const isFocused = focusedField === index;
    
    // Check if field is invalid (required and empty, no default)
    const isInvalid = param.required && 
                     (!value || value === '') && 
                     param.default === undefined;
    
    // Determine state class
    let stateClass = '';
    if (isFocused) {
      stateClass = styles.focused;
    } else if (isInvalid) {
      stateClass = styles.invalid;
    }
    
    return `${baseClass} ${textareaClass} ${stateClass}`.trim();
  };

  return (
    <div className={styles.parameterBuilder}>
      {methodInfo.params.length === 0 ? (
        <p className={styles.noParams}>This method has no parameters</p>
      ) : (
        methodInfo.params.map((param, index) => {
          const value = parameters[index] || '';
          const typeInfo = PARAM_TYPES[param.type];
          
          return (
            <div key={index} className={styles.parameterField}>
              <label className={styles.paramLabel}>
                {param.name}
                {param.required && <span className={styles.required}>*</span>}
              </label>
              <div className={styles.paramDescription}>{param.description}</div>
              {param.type === 'object' || param.type === 'array' ? (
                <textarea
                  value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                  onChange={(e) => handleParamChange(index, e.target.value)}
                  onFocus={() => setFocusedField(index)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={typeInfo?.placeholder || ''}
                  className={getFieldClassName(param, value, index)}
                  rows={4}
                />
              ) : (
                <input
                  type={param.type === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => handleParamChange(index, e.target.value)}
                  onFocus={() => setFocusedField(index)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={typeInfo?.placeholder || ''}
                  className={getFieldClassName(param, value, index)}
                />
              )}
              {typeInfo && (
                <div className={styles.paramHint}>{typeInfo.description}</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}