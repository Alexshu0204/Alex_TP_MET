// On définit tous les types pour rendre le code plus lisible et éviter les erreurs de type
export type Tool =
    | 'pencil'
    | 'eraser'
    | 'rectangle'
    | 'line'
    | 'ellipse'
    | 'bucket'

// On définit l'interface pour l'état du canvas
export interface CanvasState {
    color: string;
    brushSize: number;
    currentTool: Tool;
}