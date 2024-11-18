// SkeletonLoader.js
import React from "react";

// Skeleton component renders a placeholder loader
const Skeleton = () => {
  return (
    <div className="skeleton-card">  {/* Container for the skeleton card */}
      
      {/* Skeleton image placeholder */}
      <div className="skeleton-image"></div>
      
      {/* Skeleton text placeholder */}
      <div className="skeleton-text">
        
        {/* Placeholder lines to mimic text */}
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        
      </div>
    </div>
  );
};

export default Skeleton;  // Exporting the Skeleton component for use in other parts of the app
