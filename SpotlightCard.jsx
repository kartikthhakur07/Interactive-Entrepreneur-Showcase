import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard — ReactBits inspired cursor-tracking luminous card
 * Features smooth radial-gradient border masking and ambient glow following cursor
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.spotlightColor]
 * @param {number} [props.spotlightSize]
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 102, 204, 0.5)',
  spotlightSize = 350,
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: -999, y: -999, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setCoords(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`reactbits-spotlight-card ${className}`}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
        '--spotlight-color': spotlightColor,
        '--spotlight-size': `${spotlightSize}px`,
        '--spotlight-opacity': coords.opacity
      }}
      {...props}
    >
      <div className="reactbits-spotlight-content">
        {children}
      </div>
    </div>
  );
}
