import React from 'react';

export default function WireframePreview({ layout }) {
  if (!layout || !layout.rootNodes || layout.rootNodes.length === 0) return null;

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  const aspectRatio = artboard.height / artboard.width;

  const getColorForType = (type) => {
    return {
      image: 'rgba(59, 130, 246, 0.2)', // blue-500
      text: 'rgba(245, 158, 11, 0.2)', // amber-500
      shape: 'rgba(239, 68, 68, 0.2)' // red-500
    }[type] || '#f3f4f6'; // gray-100
  };

  const getBorderColorForType = (type) => {
    return {
      image: 'rgba(59, 130, 246, 0.8)',
      text: 'rgba(245, 158, 11, 0.8)',
      shape: 'rgba(239, 68, 68, 0.8)'
    }[type] || '#d1d5db';
  };

  return (
    <div className="w-full flex justify-center items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div
        className="shadow-lg relative overflow-hidden transition-all duration-500"
        style={{
          width: '100%',
          maxWidth: '500px',
          paddingBottom: `${aspectRatio * 100}%`,
          background: artboard.data?.backgroundColor || '#ffffff',
          containerType: 'inline-size'
        }}
      >
        {artboard.children.map((id) => {
          const node = layout.nodes[id];
          if (!node) return null;
          
          return (
            <div
              key={id}
              className="absolute flex items-center justify-center text-center overflow-hidden transition-all duration-500 shadow-sm"
              style={{
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                backgroundColor: node.type !== 'image' ? getColorForType(node.type) : 'transparent',
                backgroundImage: node.type === 'image' && node.data?.sourceUrl ? `url(${node.data.sourceUrl})` : 'none',
                backgroundSize: node.data?.fit || 'cover',
                backgroundPosition: 'center',
                border: `1px solid ${getBorderColorForType(node.type)}`,
                borderRadius: node.style?.visual?.borderRadius || (node.type === 'shape' && node.data?.shapeType === 'circle' ? '50%' : '0'),
                fontSize: node.style?.visual?.fontSize ? `calc(${node.style.visual.fontSize} / ${artboard.width} * 100cqw)` : '10px',
                color: node.style?.visual?.color?.value || '#374151',
                fontWeight: node.type === 'text' ? 'bold' : 'normal',
                padding: '4px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              title={node.name}
            >
              {node.type === 'text' && (node.data?.content || node.name)}
              {node.type !== 'text' && node.type !== 'image' && node.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
