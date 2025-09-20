import React from 'react';
import SimpleAnimatedBox from '../components/SimpleAnimatedBox';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Animation Test</h1>
        <p className="mb-4">This is a test paragraph to verify rendering.</p>
        <div style={{ border: '2px solid red', padding: '10px' }}>
          <SimpleAnimatedBox />
        </div>
        <p className="mt-4">If you can see this text, the component is rendering.</p>
      </div>
    </div>
  );
};

export default TestPage;