import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  dark?: boolean;
  enableTilt?: boolean;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor,
  dark = false,
  enableTilt = true,
  onClick,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (enableTilt && window.innerWidth >= 1024) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.2;
      const rotateY = ((x - centerX) / centerX) * 2.2;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const defaultGlow = dark
    ? 'rgba(0, 113, 227, 0.22)'
    : 'rgba(0, 102, 204, 0.09)';

  const borderGlow = dark
    ? 'rgba(96, 165, 250, 0.45)'
    : 'rgba(0, 102, 204, 0.28)';

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.6 }}
      style={{ transformPerspective: 1200 }}
      className={`group relative overflow-hidden rounded-3xl transition-shadow duration-300 ${
        dark
          ? 'bg-[#141417] border border-white/10 text-white hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)]'
          : 'bg-white border border-black/[0.08] text-[#1D1D1F] hover:border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
      } ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''} ${className}`}
    >
      {/* Radial Surface Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${
            spotlightColor || defaultGlow
          }, transparent 45%)`,
        }}
      />

      {/* Crisp Border Rim Illumination */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(260px circle at ${position.x}px ${position.y}px, ${borderGlow}, transparent 65%)`,
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
