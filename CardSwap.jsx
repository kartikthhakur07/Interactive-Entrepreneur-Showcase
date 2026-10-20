import React, { useState, useEffect, useRef } from 'react';
import './CardSwap.css';

/**
 * Card Component for CardSwap
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card-swap-item-content ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * CardSwap — ReactBits 3D stacked card deck with auto-swap animation
 * 
 * Supports two usage patterns:
 * 1. Data items: <CardSwap items={items} delay={4000} />
 * 2. Composable children: <CardSwap width={480} height={320}><Card>...</Card></CardSwap>
 * 
 * @param {Object} props
 * @param {Array} [props.items] - Array of { title, image, ... }
 * @param {React.ReactNode} [props.children] - Child Card elements
 * @param {number} [props.delay=4000] - Delay between card swaps in ms
 * @param {number} [props.width=460] - Card width in pixels
 * @param {number} [props.height=340] - Card height in pixels
 * @param {boolean} [props.pauseOnHover=true] - Pause auto-swap on hover
 */
export default function CardSwap({
  items,
  children,
  delay = 4000,
  width = 460,
  height = 340,
  pauseOnHover = true,
  pauseOnLastCard = true,
  showNextButton = false,
  onLastCardClick,
  scrollToSelector = '#sources',
  className = '',
  ...props
}) {
  const childArray = children ? React.Children.toArray(children) : [];
  const totalCards = items ? items.length : childArray.length;

  const [order, setOrder] = useState(() => Array.from({ length: totalCards }, (_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const isLastCard = order[0] === totalCards - 1;

  const handleCardClick = () => {
    if (isAnimating || totalCards <= 1) return;

    if (isLastCard) {
      if (onLastCardClick) {
        onLastCardClick();
      } else if (scrollToSelector) {
        const target = document.querySelector(scrollToSelector);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    swapToNext();
  };

  const swapToNext = () => {
    if (isAnimating || totalCards <= 1) return;
    setIsAnimating(true);

    // Front card moves to back
    setTimeout(() => {
      setOrder((prevOrder) => {
        const [first, ...rest] = prevOrder;
        return [...rest, first];
      });
      setIsAnimating(false);
    }, 450);
  };

  const jumpTo = (targetOriginalIndex) => {
    if (isAnimating) return;
    const currentFront = order[0];
    if (currentFront === targetOriginalIndex) return;

    const targetPosInOrder = order.indexOf(targetOriginalIndex);
    if (targetPosInOrder === -1) return;

    setIsAnimating(true);
    setTimeout(() => {
      setOrder((prevOrder) => {
        const toMove = prevOrder.slice(0, targetPosInOrder);
        const remainder = prevOrder.slice(targetPosInOrder);
        return [...remainder, ...toMove];
      });
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    if (!delay || delay <= 0 || isPaused || totalCards <= 1) return;
    if (pauseOnLastCard && isLastCard) return;

    timerRef.current = setInterval(() => {
      swapToNext();
    }, delay);

    return () => clearInterval(timerRef.current);
  }, [delay, isPaused, isAnimating, totalCards, isLastCard, pauseOnLastCard]);

  return (
    <div
      className={`card-swap-container ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      <div
        className="card-swap-viewport"
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={handleCardClick}
        role="region"
        aria-label="Interactive Card Swap Stack"
      >
        {order.map((originalIndex, visualStackIndex) => {
          const isTopCard = visualStackIndex === 0;
          const isLeaving = isTopCard && isAnimating;

          // Depth styling
          const translateY = visualStackIndex * 14;
          const scale = 1 - visualStackIndex * 0.045;
          const opacity = Math.max(0.65, 1 - visualStackIndex * 0.12);
          const zIndex = totalCards - visualStackIndex;

          let transform = `translate3d(0, ${translateY}px, -${visualStackIndex * 30}px) scale(${scale})`;
          if (isLeaving) {
            transform = `translate3d(0, -90px, 60px) rotate(-4deg) scale(1.03)`;
          }

          return (
            <div
              key={originalIndex}
              className={`card-swap-card ${isLeaving ? 'card-swapping-out' : ''} ${isTopCard ? 'card-top' : ''}`}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform,
                zIndex: isLeaving ? totalCards + 1 : zIndex,
                opacity: isLeaving ? 0.3 : opacity,
                pointerEvents: isTopCard ? 'auto' : 'none',
              }}
            >
              {items ? (
                <div className="card-swap-data-item">
                  {items[originalIndex].image && (
                    <img
                      src={items[originalIndex].image}
                      alt={items[originalIndex].title || ''}
                      className="card-swap-item-image"
                    />
                  )}
                  {items[originalIndex].title && (
                    <h3 className="card-swap-item-title">{items[originalIndex].title}</h3>
                  )}
                </div>
              ) : (
                childArray[originalIndex]
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="card-swap-controls">
        {showNextButton && (
          <button
            type="button"
            className="card-swap-btn"
            onClick={swapToNext}
            aria-label="Next card"
          >
            Next Card →
          </button>
        )}
        <div className="card-swap-dots" role="tablist" aria-label="Card pagination">
          {Array.from({ length: totalCards }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`card-swap-dot ${order[0] === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                jumpTo(idx);
              }}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
        <span className="card-swap-hint">
          {isLastCard
            ? 'Click card to explore Sources & Documentation ↓'
            : 'Click card to swap · Auto-swaps every 4s'}
        </span>
      </div>
    </div>
  );
}
