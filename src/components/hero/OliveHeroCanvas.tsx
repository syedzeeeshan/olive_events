import React from 'react';
import { HeroLiquidGlass } from './HeroLiquidGlass';

export { HeroLiquidGlass };

interface OliveHeroCanvasProps {
  className?: string;
  mode?: 'hero' | 'gallery';
  cameraDistance?: number;
  externalProgress?: number;
}

export const OliveHeroCanvas: React.FC<OliveHeroCanvasProps> = (props) => {
  return <HeroLiquidGlass {...props} />;
};
