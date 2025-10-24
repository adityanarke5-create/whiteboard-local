'use client';

import { useState } from 'react';
import { 
  FaMousePointer, 
  FaHandPaper, 
  FaRegSquare, 
  FaRegCircle, 
  FaSlash, 
  FaFont, 
  FaEraser,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaDownload,
  FaTrash
} from 'react-icons/fa';

interface ToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  strokeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onExport: (format: string) => void;
  onClear: () => void;
  // Add new props for pan and zoom
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
}

export default function Toolbar({
  activeTool,
  onToolChange,
  strokeColor,
  onColorChange,
  strokeWidth,
  onStrokeWidthChange,
  onExport,
  onClear,
  // Add new props for pan and zoom
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: ToolbarProps) {
  // Remove 'pen' tool from the tools array
  const tools = [
    { id: 'select', icon: <FaMousePointer className="w-4 h-4" />, label: 'Select', category: 'selection' },
    { id: 'pan', icon: <FaHandPaper className="w-4 h-4" />, label: 'Pan', category: 'selection' },
    { id: 'rectangle', icon: <FaRegSquare className="w-4 h-4" />, label: 'Rectangle', category: 'shapes' },
    { id: 'circle', icon: <FaRegCircle className="w-4 h-4" />, label: 'Circle', category: 'shapes' },
    { id: 'line', icon: <FaSlash className="w-4 h-4" />, label: 'Line', category: 'shapes' },
    { id: 'text', icon: <FaFont className="w-4 h-4" />, label: 'Text', category: 'shapes' },
    { id: 'eraser', icon: <FaEraser className="w-4 h-4" />, label: 'Eraser', category: 'tools' }, // Moved eraser to its own category
  ];

  const exportOptions = [
    { format: 'png', label: 'PNG' },
    { format: 'jpg', label: 'JPG' },
    { format: 'svg', label: 'SVG' },
    { format: 'json', label: 'JSON' },
  ];

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  const handleToolChange = (toolId: string) => {
    onToolChange(toolId);
  };

  const handleColorChange = (color: string) => {
    onColorChange(color);
  };

  const handleStrokeWidthChange = (width: number) => {
    onStrokeWidthChange(width);
  };

  const handleExport = (format: string) => {
    onExport(format);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-6">
        {/* Tool Categories */}
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category} className="flex items-center">
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              {categoryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolChange(tool.id)}
                  className={`p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                    activeTool === tool.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  title={tool.label}
                >
                  {tool.icon}
                </button>
              ))}
            </div>
            <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              {category}
            </span>
          </div>
        ))}
        
        {/* Color Picker */}
        <div className="flex items-center ml-2 pl-4 border-l border-gray-200">
          <label className="text-sm text-gray-700 mr-2 font-medium">Color:</label>
          <div className="relative">
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer bg-white"
            />
            <div 
              className="absolute inset-1 rounded pointer-events-none border border-gray-300"
              style={{ backgroundColor: strokeColor }}
            ></div>
          </div>
        </div>
        
        {/* Stroke Width */}
        <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
          <label className="text-sm text-gray-700 mr-3 font-medium">Size:</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="50"
              value={strokeWidth}
              onChange={(e) => handleStrokeWidthChange(parseInt(e.target.value))}
              className="w-24 accent-indigo-600"
            />
            <span className="text-sm text-gray-700 ml-3 w-8 font-medium">{strokeWidth}</span>
          </div>
        </div>
      </div>
      
      {/* Pan and Zoom Controls */}
      <div className="flex items-center space-x-2">
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          <button
            onClick={onZoomIn}
            className="p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            title="Zoom In (Ctrl +)"
          >
            <FaSearchPlus className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomOut}
            className="p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            title="Zoom Out (Ctrl -)"
          >
            <FaSearchMinus className="w-4 h-4" />
          </button>
          <button
            onClick={onResetZoom}
            className="p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            title="Reset Zoom (Ctrl + 0)"
          >
            <FaExpand className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Export Options */}
      <div className="flex items-center space-x-3">
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {exportOptions.map((option) => (
            <button
              key={option.format}
              onClick={() => handleExport(option.format)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FaDownload className="w-3 h-3" />
              {option.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm flex items-center gap-2"
        >
          <FaTrash className="w-3 h-3" />
          Clear Canvas
        </button>
      </div>
    </div>
  );
}