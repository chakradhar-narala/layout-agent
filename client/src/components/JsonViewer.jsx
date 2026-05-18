import React, { useState } from 'react';

export default function JsonViewer({ layout }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4 flex flex-col max-h-[400px]">
      <div 
        className="bg-gray-800 px-4 py-2 flex justify-between items-center cursor-pointer text-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold text-sm tracking-wider uppercase text-gray-400">Layout JSON</span>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className="p-4 overflow-auto text-xs font-mono text-green-400 bg-gray-900">
          <pre>{JSON.stringify(layout, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
