import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onLoaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded(); // Notify when the splash screen finishes
    }, 4000); // Display for 4 seconds

    return () => clearTimeout(timer);
  }, [onLoaded]);

  // Function to generate random stars
  const generateStars = () => {
    const stars = [];
    const numberOfStars = 100; // Adjust number of stars as needed

    for (let i = 0; i < numberOfStars; i++) {
      const left = Math.random() * 100; // Random position on X axis
      const top = Math.random() * 100; // Random position on Y axis
      const size = Math.random() * 2 + 1; // Random size for stars

      // Create a new star with random values
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${Math.random() * 2}s`, // Randomize animation delay for different timing
          }}
        ></div>
      );
    }

    return stars;
  };

  return (
    <div className="splash-container">
      <div className="stars">
        {generateStars()} {/* Render random stars */}
      </div>
      <div className="splash-snake">
        <h1 className="splash-title">KeyNotes</h1>
        <div className="snake-trail"></div> {/* Snake animation trail */}
      </div>
    </div>
  );
};

export default SplashScreen;
