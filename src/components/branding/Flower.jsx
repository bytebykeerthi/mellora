import './Flower.css';

export default function Flower({ size = 'md', rotation = 0 }) {
  const sizeClass = `flower-${size}`;
  
  return (
    <svg
      viewBox="0 0 100 100"
      className={`mellora-flower ${sizeClass}`}
      style={{ '--rotation': `${rotation}deg` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Five petals */}
      {[0, 72, 144, 216, 288].map((angle, index) => (
        <g key={index} transform={`rotate(${angle} 50 50)`}>
          <ellipse
            cx="50"
            cy="20"
            rx="10"
            ry="18"
            fill="#f4c2c2"
            opacity="0.95"
          />
          <ellipse
            cx="50"
            cy="18"
            rx="6"
            ry="12"
            fill="#f4a8a8"
            opacity="0.6"
          />
        </g>
      ))}
      
      {/* Flower center */}
      <circle cx="50" cy="50" r="8" fill="#fef9f3" />
      <circle cx="50" cy="50" r="5" fill="#f4c2c2" opacity="0.4" />
      
      {/* Center highlight */}
      <circle cx="51" cy="49" r="2" fill="#fef9f3" opacity="0.8" />
    </svg>
  );
}
