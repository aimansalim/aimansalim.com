import React from 'react';

export const CornerDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-gray-800"></div>
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-gray-800"></div>
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-gray-800"></div>
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gray-800"></div>
    </div>
  );
};
