import React, { useEffect, useRef, useState } from 'react';
import './Lanyard.css';

/**
 * Lanyard - Interactive 3D Physics ID Badge Component (Large, Non-Flipping)
 * 
 * Props:
 * @param {string} frontImage - Path or URL to badge front image
 * @param {string} [strapImage] - Path or URL to repeating strap texture
 * @param {string} [cardColor] - Background color of the card
 */
export default function Lanyard({
  frontImage = '/card-front.png',
  strapImage = '/band.png',
  cardColor = '#0e1424'
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!container || !canvas || !card) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let rect = container.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const anchor = { x: rect.width / 2, y: 0 };
    const rest = { x: rect.width / 2, y: 145 };

    const state = {
      x: rest.x,
      y: rest.y,
      vx: 0,
      vy: 0,
      rotZ: 0,
      vRotZ: 0,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      lastMouseX: rest.x,
      lastMouseY: rest.y
    };

    const handleResize = () => {
      rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      anchor.x = rect.width / 2;
      rest.x = rect.width / 2;
    };
    window.addEventListener('resize', handleResize);

    const onPointerDown = (e) => {
      state.isDragging = true;
      setIsDragging(true);
      setHasDragged(true);
      const cRect = card.getBoundingClientRect();
      state.dragOffsetX = e.clientX - (cRect.left + cRect.width / 2);
      state.dragOffsetY = e.clientY - (cRect.top + 24);
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
      card.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!state.isDragging) return;
      const bRect = container.getBoundingClientRect();
      const targetX = e.clientX - bRect.left - state.dragOffsetX;
      const targetY = e.clientY - bRect.top - state.dragOffsetY;

      const dx = e.clientX - state.lastMouseX;
      const dy = e.clientY - state.lastMouseY;
      state.vx = dx * 0.45;
      state.vy = dy * 0.45;

      state.x = targetX;
      state.y = targetY;

      state.vRotZ = Math.max(-35, Math.min(35, dx * 0.85));
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
    };

    const onPointerUp = (e) => {
      if (state.isDragging) {
        state.isDragging = false;
        setIsDragging(false);
        try { card.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };

    card.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const springK = 0.046;
    const damping = 0.91;

    const animate = () => {
      if (!state.isDragging) {
        const fx = -springK * (state.x - rest.x);
        const fy = -springK * (state.y - rest.y);

        state.vx = (state.vx + fx) * damping;
        state.vy = (state.vy + fy) * damping;

        state.x += state.vx;
        state.y += state.vy;

        state.vRotZ = (state.vRotZ - 0.09 * (state.rotZ - state.vx * 1.5)) * 0.89;
        state.rotZ += state.vRotZ;
      } else {
        state.rotZ += (state.vRotZ - state.rotZ) * 0.35;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);
      const clipX = state.x;
      const clipY = state.y;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(anchor.x - 16, 0);
      ctx.quadraticCurveTo(
        anchor.x + (clipX - anchor.x) * 0.35 - 14,
        clipY * 0.5,
        clipX - 6,
        clipY - 18
      );
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#0d1424';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(anchor.x + 16, 0);
      ctx.quadraticCurveTo(
        anchor.x + (clipX - anchor.x) * 0.35 + 14,
        clipY * 0.5,
        clipX + 6,
        clipY - 18
      );
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#131d33';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(anchor.x - 24, 0);
      ctx.quadraticCurveTo(
        anchor.x + (clipX - anchor.x) * 0.35 - 22,
        clipY * 0.5,
        clipX - 12,
        clipY - 18
      );
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#d4af37';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(anchor.x + 24, 0);
      ctx.quadraticCurveTo(
        anchor.x + (clipX - anchor.x) * 0.35 + 22,
        clipY * 0.5,
        clipX + 12,
        clipY - 18
      );
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#d4af37';
      ctx.stroke();

      ctx.restore();

      card.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, 0) rotateZ(${state.rotZ}deg)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      card.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [strapImage]);

  return (
    <div className="lanyard-wrapper" ref={containerRef} style={{ width: '100%', height: '640px' }}>
      <canvas className="lanyard-canvas" ref={canvasRef} />
      
      {/* Header Drag Hint (Outside the card, below header, removed when dragged) */}
      {!hasDragged && (
        <div className={`header-drag-hint ${isDragging ? 'is-hidden' : ''}`} aria-hidden="true">
          <span className="hint-dot" />
          <span>Drag ID anywhere</span>
        </div>
      )}

      <div 
        className={`lanyard-card ${isDragging ? 'is-dragging' : ''}`} 
        ref={cardRef}
        title="Click & drag badge to swing"
        style={{ backgroundColor: cardColor }}
      >
        <div className="lanyard-clip">
          <div className="clip-loop" />
          <div className="clip-hook" />
        </div>

        <div className="card-face card-front">
          <img src={frontImage} alt="Credential Front" draggable="false" />
        </div>
      </div>
    </div>
  );
}
