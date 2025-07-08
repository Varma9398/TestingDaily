import React, { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize confetti
    const colors = ['#f0abfc', '#a78bfa', '#93c5fd', '#fbbf24', '#f87171', '#34d399', '#60a5fa'];
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const confetti: ConfettiPiece[] = [];

    // Create confetti pieces from center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 100; i++) {
      const angle = (Math.PI * 2 * i) / 100;
      const velocity = Math.random() * 8 + 4;
      
      confetti.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    confettiRef.current = confetti;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activePieces = 0;

      confetti.forEach((piece) => {
        // Update position
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.3; // Gravity
        piece.rotation += piece.rotationSpeed;

        // Update velocity (air resistance)
        piece.vx *= 0.99;
        piece.vy *= 0.99;

        // Check if piece is still on screen
        if (piece.y < canvas.height + 50 && piece.x > -50 && piece.x < canvas.width + 50) {
          activePieces++;

          // Draw confetti piece
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate((piece.rotation * Math.PI) / 180);
          ctx.fillStyle = piece.color;

          switch (piece.shape) {
            case 'circle':
              ctx.beginPath();
              ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 'square':
              ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
              break;
            case 'triangle':
              ctx.beginPath();
              ctx.moveTo(0, -piece.size / 2);
              ctx.lineTo(-piece.size / 2, piece.size / 2);
              ctx.lineTo(piece.size / 2, piece.size / 2);
              ctx.closePath();
              ctx.fill();
              break;
          }
          ctx.restore();
        }
      });

      if (activePieces > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
}; 