import React from 'react';

const sdkData = [
  { name: 'C# SDK', url: 'https://github.com/hypercore-one/znn_sdk_csharp', completion: 100 },
  { name: 'C++ SDK', url: 'https://github.com/dumeriz/zenon-sdk-cpp', completion: 20 },
  { name: 'Common Lisp SDK', url: 'https://github.com/dumeriz/cl-zenon', completion: 50 },
  { name: 'Go SDK', url: 'https://github.com/MoonBaZZe/znn-sdk-go', completion: 100 },
  { name: 'Java SDK', url: 'https://github.com/KingGorrin/znn_sdk_java', completion: 75 },
  { name: 'TypeScript SDK', url: 'https://github.com/DexterLabZ/znn.ts', completion: 100 },
  { name: 'Kotlin SDK', url: 'https://github.com/ItsChaceD/zenon-android', completion: 70 },
  { name: 'Rust SDK', url: 'https://github.com/2bonahill/znn_sdk_rust', completion: 50 },
  { name: 'Python SDK', url: 'https://github.com/xandrv/pyznn', completion: 85 },
  { name: 'Dart SDK', url: 'https://github.com/zenon-network/znn_sdk_dart', completion: 100 },
  { name: 'PHP SDK', url: 'https://github.com/digitalSloth/znn-php', completion: 85 },
];

const SDKGrid = () => {
  return (
    <div className="sdk-grid">
      {sdkData.map((sdk, index) => (
        <a
          key={index}
          href={sdk.url}
          className="button button--secondary"
          style={{ 
            border: '2px solid #6cef4b',
            color: 'white',
            backgroundColor: 'transparent',
            position: 'relative',
            overflow: 'hidden',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            const progressBar = e.currentTarget.querySelector('.progress-bar');
            progressBar.style.opacity = 1;
            progressBar.style.width = `${sdk.completion}%`;
          }}
          onMouseLeave={(e) => {
            const progressBar = e.currentTarget.querySelector('.progress-bar');
            progressBar.style.opacity = 0;
            progressBar.style.width = '0%';
          }}
        >
          <div className="progress-bar" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '4px',
            width: '0%',
            backgroundColor: '#6cef4b',
            opacity: 0,
            transition: 'width 0.5s ease-in-out, opacity 0.3s ease-in-out'
          }}></div>
          {sdk.name}
        </a>
      ))}
    </div>
  );
};

export default SDKGrid;