import { useState } from 'react'
import Canvas from './components/Canvas'

function App() {
  const [currentTool, setCurrentTool] = useState<'pencil' | 'eraser'>('pencil')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="h-12 bg-gray-800 text-white flex items-center px-4 text-lg font-semibold">
        Alex Paint Project
      </div>

      {/* Barre d'outils */}
      <div className="h-14 bg-white border-b border-gray-300 flex items-center px-4 gap-4">
        <button
          onClick={() => setCurrentTool('pencil')}
          className={`px-4 py-1 rounded ${currentTool === 'pencil' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          ✏️ Crayon
        </button>
        <button
          onClick={() => setCurrentTool('eraser')}
          className={`px-4 py-1 rounded ${currentTool === 'eraser' ?  'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          🧼 Gomme
        </button>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
          <label htmlFor="colorPicker" className="text-sm font-medium">Couleur:</label>
          <input 
            id="colorPicker"
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            disabled={currentTool === 'eraser'}
          />
        </div>

        <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
          <label htmlFor="brushSize" className="text-sm font-medium">Taille:</label>
          <input 
            id="brushSize"
            type="range" 
            min="1" 
            max="50" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          <span className="text-sm">{brushSize}px</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 overflow-auto p-4">
        <Canvas
          currentTool={currentTool}
          color={color}
          brushSize={brushSize}
        />
      </div>
    </div>
  )
}

export default App
