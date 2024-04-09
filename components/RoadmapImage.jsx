import React, { useState } from "react";

const RoadmapImage = ({ imageUrl }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.2) {
      setScale(scale - 0.1);
    }
  };

  return (
    <div className="roadmap-image-container">
      <div className="zoom-buttons flex justify-center space-x-4 mb-4">
        <button onClick={handleZoomIn} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Zoom In
        </button>
        <button onClick={handleZoomOut} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Zoom Out
        </button>
      </div>
      <img
        src={imageUrl}
        alt="Roadmap"
        className="roadmap-image rounded-lg shadow-md"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
};

export default RoadmapImage;
