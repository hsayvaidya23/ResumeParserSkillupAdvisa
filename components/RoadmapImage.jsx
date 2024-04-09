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
        
      </div>
      <img
        src={imageUrl}
        alt="Roadmap"
        className="roadmap-image rounded-lg shadow-md"
        style={{ transform: `scale(${scale})` }}
        loading="lazy"
      />
    </div>
  );
};

export default RoadmapImage;
