'use client';

import { useState, useEffect } from 'react';
import styles from './FlipCard.module.css';

interface FlipCardProps {
  emoji: string;
  animalName: string;
  onFlip?: () => void;
  autoFlip?: boolean;
}

export default function FlipCard({ emoji, animalName, onFlip, autoFlip = false }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip effect
  useEffect(() => {
    if (autoFlip) {
      // Small delay before auto-flip to let card appear first
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
        if (onFlip) {
          // Additional delay to sync with flip animation
          setTimeout(() => {
            onFlip();
          }, 600);
        }
      }, 500);

      return () => clearTimeout(flipTimer);
    }
  }, [autoFlip, onFlip]);

  const handleClick = () => {
    if (!isFlipped && !autoFlip) {
      setIsFlipped(true);
      if (onFlip) {
        // Delay callback to sync with animation
        setTimeout(() => {
          onFlip();
        }, 600);
      }
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        {/* Card Back */}
        <div className={styles.cardBack}>
          <div className={styles.backContent}>
            <div className={styles.backPattern}>
              <div className={styles.zodiacSymbol}>十二生肖</div>
              <div className={styles.yearText}>Year Animal</div>
              <div className={styles.questionMark}>?</div>
              <p className={styles.clickPrompt}>Click to reveal</p>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div className={styles.cardFront}>
          <div className={styles.frontContent}>
            <div className={styles.emojiContainer}>
              <span className={styles.emoji} role="img" aria-label={`${animalName} emoji`}>
                {emoji}
              </span>
            </div>
            <div className={styles.shine}></div>
          </div>
        </div>
      </div>
    </div>
  );
}