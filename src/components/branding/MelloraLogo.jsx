import './MelloraLogo.css';

export default function MelloraLogo({ size = 'md', showText = true, animated = false }) {
  const sizeClass = `logo-${size}`;
  
  return (
    <div className={`mellora-logo-container ${sizeClass} ${animated ? 'animated' : ''}`}>
      <svg
        viewBox="0 0 100 100"
        className="mellora-logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower petals */}
        <g className="flower">
          {/* Top petal */}
          <ellipse
            cx="50"
            cy="25"
            rx="8"
            ry="14"
            fill="#f4c2c2"
            opacity="0.9"
          />
          {/* Right petal */}
          <ellipse
            cx="72"
            cy="39"
            rx="8"
            ry="14"
            fill="#f4c2c2"
            opacity="0.9"
            transform="rotate(72 72 39)"
          />
          {/* Bottom right petal */}
          <ellipse
            cx="65"
            cy="70"
            rx="8"
            ry="14"
            fill="#f4c2c2"
            opacity="0.9"
            transform="rotate(144 65 70)"
          />
          {/* Bottom left petal */}
          <ellipse
            cx="35"
            cy="70"
            rx="8"
            ry="14"
            fill="#f4c2c2"
            opacity="0.9"
            transform="rotate(216 35 70)"
          />
          {/* Left petal */}
          <ellipse
            cx="28"
            cy="39"
            rx="8"
            ry="14"
            fill="#f4c2c2"
            opacity="0.9"
            transform="rotate(288 28 39)"
          />
          
          {/* Flower center */}
          <circle cx="50" cy="50" r="6" fill="#fef9f3" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="#f4c2c2" strokeWidth="0.5" opacity="0.5" />
        </g>
      </svg>
      
      {showText && (
        <div className="mellora-logo-text">
          <h1>MELLORA</h1>
          <p>Fresh. Simple. Good.</p>
        </div>
      )}
    </div>
  );
}
