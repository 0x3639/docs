import React from 'react';
import Layout from '@theme/Layout';
import { WebSocketProvider } from '../contexts/WebSocketContext';
import APIPlayground from '../components/APIPlayground/APIPlayground';

export default function APIPlaygroundPage() {
  return (
    <Layout title="API Playground" description="Test Zenon RPC API methods">
      <WebSocketProvider>
        <APIPlayground />
      </WebSocketProvider>
    </Layout>
  );
}