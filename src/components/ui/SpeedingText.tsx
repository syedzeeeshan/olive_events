import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SpeedingTextProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const SpeedingText: React.FC<SpeedingTextProps> = ({
  value,
  suffix = '',
  duration = 2.2,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: duration,
          ease: 'power3.out',
          onUpdate: () => {
            setDisplayValue(Math.round(obj.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, duration]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline font-mono tracking-tight will-change-transform ${className}`}
    >
      <span>{displayValue.toLocaleString()}</span>
      {suffix && <span className="text-aged-gold ml-1 font-serif">{suffix}</span>}
    </span>
  );
};
