import React from 'react';

interface BimSpeedLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BimSpeedLogo: React.FC<BimSpeedLogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={` h-10 flex items-center justify-center`}>
        <img 
          src="/bimspeed logo.avif" 
          alt="BimSpeed Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
 
    </div>
  );
};

export default BimSpeedLogo;
