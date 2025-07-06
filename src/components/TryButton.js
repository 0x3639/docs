import React from 'react';
import { WebSocketProvider } from '../contexts/WebSocketContext';
import APIMethodTester from './APIMethodTester/APIMethodTester';

export default function TryButton({ method, defaultParams = {} }) {
  return (
    <WebSocketProvider>
      <APIMethodTester method={method} defaultParams={defaultParams} />
    </WebSocketProvider>
  );
}