import React from 'react';

interface EmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Emblem: React.FC<EmblemProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src="/team%20logo.jpeg"
        alt="Murugaiya Silamba Koodam Official Logo"
        className="w-full h-full object-contain rounded-full drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.tried) {
            target.dataset.tried = '1';
            target.src = '/team_logo.jpeg';
          }
        }}
      />
    </div>
  );
};
