import { useRef, useEffect, useState } from 'react';
import type { Tool } from '../types';

interface CanvasProps {
  currentTool: Tool;
  color: string;
  brushSize: number;
}

function Canvas({ currentTool, color, brushSize }: CanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialisation du canvas
  useEffect(() => {
    // On récupère le canvas et son contexte 2D
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // ---------- Configuration initiale ----------
      // On définit une taille fixe pour le canvas
      canvas.width = 800;
      canvas.height = 600;

      // On configure le contexte pour le dessin
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      ctxRef.current = ctx;

      // Fond blanc initial
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []); // Initialize canvas setup independently of color and brushSize

  // Mise à jour de la couleur et de la taille du pinceau
  useEffect(() => {
      const ctx = ctxRef.current;
      if (ctx) {
          ctx.strokeStyle = color;
          ctx.lineWidth = brushSize;
      }
  }, [color, brushSize]);

  // =========== Gestion du dessin ===========

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    setIsDrawing(true);

    // On commence un nouveau chemin de dessin
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Fonction pour dessiner pendant le mouvement de la souris
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const rect = canvas?.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'pencil' || currentTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  // Fonction pour arrêter de dessiner
  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.closePath();
    }
  };

  return (
    <div className="border-2 border-gray-400 bg-white shadow-lg">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="cursor-crosshair"
      />
    </div>
  )
}

export default Canvas;