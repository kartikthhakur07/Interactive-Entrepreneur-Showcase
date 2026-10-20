import React, { useRef, useEffect, Children, cloneElement } from 'react';
import './ScrollStack.css';

/**
 * ScrollStackItem - Individual card inside the ScrollStack
 */
export function ScrollStackItem({ children, className = '', style = {}, ...props }) {
  return (
    <div className={`scroll-stack-item ${className}`} style={style} {...props}>
      <div className="scroll-stack-item-inner">
        {children}
      </div>
    </div>
  );
}

/**
 * ScrollStack - Sticky Stacking Cards Scroll Container
 * 
 * Props:
 * @param {React.ReactNode} children - List of ScrollStackItem elements
 * @param {number} [itemOffset=18] - Pixel offset between stacked card tops
 * @param {number} [scaleStep=0.032] - Scale reduction for each covered card
 * @param {number} [dimStep=0.07] - Brightness reduction for covered cards
 * @param {string} [className='']
 * @param {React.CSSProperties} [style={}]
 */
export default function ScrollStack({
  children,
  itemOffset = 18,
  scaleStep = 0.032,
  dimStep = 0.07,
  className = '',
  style = {},
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.scroll-stack-item');
    if (!items.length) return;

    const handleScroll = () => {
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        let coveredBy = 0;
        for (let j = index + 1; j < items.length; j++) {
          const nextRect = items[j].getBoundingClientRect();
          if (nextRect.top <= itemRect.top + itemOffset + 12) {
            coveredBy++;
          }
        }

        const scale = Math.max(0.76, 1 - coveredBy * scaleStep);
        const brightness = Math.max(0.42, 1 - coveredBy * dimStep);
        const inner = item.querySelector('.scroll-stack-item-inner');
        if (inner) {
          inner.style.transform = `scale(${scale})`;
          inner.style.filter = `brightness(${brightness})`;
          inner.style.opacity = coveredBy > 5 ? '0.35' : '1';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [children, itemOffset, scaleStep, dimStep]);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-container ${className}`}
      style={style}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!child) return null;
        return cloneElement(child, {
          style: {
            top: `calc(88px + ${index * itemOffset}px)`,
            zIndex: index + 1,
            ...(child.props.style || {})
          },
          'data-index': index
        });
      })}
    </div>
  );
}
