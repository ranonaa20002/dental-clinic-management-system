import React from 'react';

export const Tooth = ({ style, opacity = 0.08, size = 64, fill = '#3B9EFF' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute', opacity, ...style }}>
    <path
      d="M50 8c-9 0-14 6-22 6-11 0-18 9-18 22 0 14 6 24 11 34 4 8 6 20 13 20 8 0 8-16 16-16s8 16 16 16c7 0 9-12 13-20 5-10 11-20 11-34 0-13-7-22-18-22-8 0-13-6-22-6z"
      fill={fill}
    />
  </svg>
);

export default function ToothBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Tooth style={{ top: '6%', left: '8%', animation: 'floatA 9s ease-in-out infinite' }} size={50} opacity={0.05} />
      <Tooth style={{ top: '18%', left: '85%', animation: 'floatB 11s ease-in-out infinite' }} size={68} opacity={0.06} />
      <Tooth style={{ top: '46%', left: '18%', animation: 'floatC 13s ease-in-out infinite' }} size={38} opacity={0.045} />
      <Tooth style={{ top: '60%', left: '92%', animation: 'floatA 10s ease-in-out infinite' }} size={46} opacity={0.05} fill="#F2B134" />
      <Tooth style={{ top: '78%', left: '35%', animation: 'floatB 12s ease-in-out infinite' }} size={58} opacity={0.045} />
      <Tooth style={{ top: '86%', left: '65%', animation: 'floatC 8.5s ease-in-out infinite' }} size={34} opacity={0.05} fill="#FF6B5B" />
    </div>
  );
}