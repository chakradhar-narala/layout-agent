import React from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import JsonViewer from './components/JsonViewer';
import WireframePreview from './components/WireframePreview';
import { useLayoutAgent } from './hooks/useLayoutAgent';

function App() {
  const { layout, messages, loading, sendMessage } = useLayoutAgent();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Left Column - Chat */}
      <div className="w-full md:w-1/3 border-r border-gray-200 bg-white flex flex-col shadow-lg z-10">
        <div className="p-4 bg-white border-b border-gray-200 shadow-sm flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Layout Agent</h1>
            <p className="text-xs text-gray-500">AI Design Assistant</p>
          </div>
        </div>
        
        <ChatWindow messages={messages} isLoading={loading} />
        <ChatInput onSendMessage={sendMessage} disabled={loading} />
      </div>

      {/* Right Column - Preview & JSON */}
      <div className="w-full md:w-2/3 flex flex-col h-screen overflow-y-auto bg-gray-50">
        <div className="p-6 flex-1 flex flex-col max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Wireframe Preview
            </h2>
            <WireframePreview layout={layout} />
          </div>

          <div className="mt-auto">
            <JsonViewer layout={layout} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
