// Utility functions for logo conversion

export interface LogoPath {
  d: string
  fill?: string
  stroke?: string
  strokeWidth?: number
  opacity?: number
  strokeLinecap?: 'round' | 'square' | 'butt'
}

export interface LogoData {
  viewBox: string
  paths: LogoPath[]
  circles?: Array<{
    cx: number
    cy: number
    r: number
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
  }>
}

// Example: Convert a simple logo to SVG code
export function createLogoFromPaths(logoData: LogoData) {
  return {
    svg: `
      <svg viewBox="${logoData.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${logoData.paths.map(path => `
          <path 
            d="${path.d}" 
            ${path.fill ? `fill="${path.fill}"` : 'fill="none"'}
            ${path.stroke ? `stroke="${path.stroke}"` : ''}
            ${path.strokeWidth ? `stroke-width="${path.strokeWidth}"` : ''}
            ${path.opacity ? `opacity="${path.opacity}"` : ''}
            ${path.strokeLinecap ? `stroke-linecap="${path.strokeLinecap}"` : ''}
          />
        `).join('')}
        ${logoData.circles?.map(circle => `
          <circle 
            cx="${circle.cx}" 
            cy="${circle.cy}" 
            r="${circle.r}"
            ${circle.fill ? `fill="${circle.fill}"` : 'fill="none"'}
            ${circle.stroke ? `stroke="${circle.stroke}"` : ''}
            ${circle.strokeWidth ? `stroke-width="${circle.strokeWidth}"` : ''}
            ${circle.opacity ? `opacity="${circle.opacity}"` : ''}
          />
        `).join('') || ''}
      </svg>
    `,
    reactComponent: `
      import React from 'react';
      
      interface LogoProps {
        size?: string;
        color?: string;
        className?: string;
      }
      
      export default function Logo({ size = "w-8 h-8", color = "currentColor", className = "" }: LogoProps) {
        return (
          <svg 
            className={\`\${size} \${className}\`}
            viewBox="${logoData.viewBox}" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            ${logoData.paths.map((path, index) => `
            <path 
              key={${index}}
              d="${path.d}" 
              ${path.fill ? `fill="${path.fill}"` : 'fill="none"'}
              ${path.stroke ? `stroke="${path.stroke}"` : ''}
              ${path.strokeWidth ? `stroke-width="${path.strokeWidth}"` : ''}
              ${path.opacity ? `opacity="${path.opacity}"` : ''}
              ${path.strokeLinecap ? `stroke-linecap="${path.strokeLinecap}"` : ''}
            />`).join('')}
            ${logoData.circles?.map((circle, index) => `
            <circle 
              key={${index + logoData.paths.length}}
              cx="${circle.cx}" 
              cy="${circle.cy}" 
              r="${circle.r}"
              ${circle.fill ? `fill="${circle.fill}"` : 'fill="none"'}
              ${circle.stroke ? `stroke="${circle.stroke}"` : ''}
              ${circle.strokeWidth ? `stroke-width="${circle.strokeWidth}"` : ''}
              ${circle.opacity ? `opacity="${circle.opacity}"` : ''}
            />`).join('') || ''}
          </svg>
        );
      }
    `
  };
}

// Example SraCos logo data
export const sraCosLogoData: LogoData = {
  viewBox: "0 0 100 100",
  paths: [
    {
      d: "M50 15C40 15 35 25 35 35C35 45 40 55 50 65C60 55 65 45 65 35C65 25 60 15 50 15Z",
      fill: "#10b981",
      stroke: "#10b981",
      strokeWidth: 2
    },
    {
      d: "M42 35H58M50 27V43",
      stroke: "white",
      strokeWidth: 3,
      strokeLinecap: "round"
    },
    {
      d: "M25 20L75 20M25 80L75 80",
      stroke: "#10b981",
      strokeWidth: 2,
      opacity: 0.3
    }
  ],
  circles: [
    {
      cx: 20,
      cy: 50,
      r: 4,
      fill: "#10b981",
      opacity: 0.6
    },
    {
      cx: 80,
      cy: 50,
      r: 4,
      fill: "#10b981",
      opacity: 0.6
    }
  ]
}
