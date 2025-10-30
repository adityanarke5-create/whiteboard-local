'use client';

import { useState } from 'react';
import { 
  FiMousePointer, 
  FiEdit3, 
  FiSquare, 
  FiCircle, 
  FiType, 
  FiMove, 
  FiZoomIn, 
  FiZoomOut, 
  FiRotateCcw,
  FiTrash2,
  FiDownload,
  FiShare2,
  FiSave,
  FiUsers,
  FiMinus,
  FiTriangle
} from 'react-icons/fi';

interface ToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  strokeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onExport: (format: string) => void;
  onClear: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onShare?: () => void;
  onSave?: () => void;
  collaboratorCount?: number;
}

const tools = [
  { id: 'select', icon: FiMousePointer, label: 'Select', shortcut: 'V' },
  { id: 'pen', icon: FiEdit3, label: 'Pen', shortcut: 'P' },
  { id: 'rectangle', icon: FiSquare, label: 'Rectangle', shortcut: 'R' },
  { id: 'circle', icon: FiCircle, label: 'Circle', shortcut: 'C' },
  { id: 'line', icon: FiMinus, label: 'Line', shortcut: 'L' },
  { id: 'triangle', icon: FiTriangle, label: 'Triangle', shortcut: 'T' },
  { id: 'text', icon: FiType, label: 'Text', shortcut: 'X' },
  { id: 'pan', icon: FiMove, label: 'Pan', shortcut: 'H' },
];

const colors = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
];

const strokeWidths = [1, 2, 4, 6, 8, 12];

export default function EnhancedToolbar({
  activeTool,
  onToolChange,
  strokeColor,
  onColorChange,
  strokeWidth,
  onStrokeWidthChange,
  onExport,
  onClear,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onShare,
  onSave,
  collaboratorCount = 0
}: ToolbarProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStrokeMenu, setShowStrokeMenu] = useState(false);

  const handleExport = (format: string) => {
    onExport(format);
    setShowExportMenu(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Drawing tools */}
        <div className="flex items-center space-x-2">
          {/* Tool buttons */}
          <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => onToolChange(tool.id)}
                  className={`p-2 rounded-md transition-colors relative group ${
                    activeTool === tool.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  title={`${tool.label} (${tool.shortcut})`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Color picker */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded-md border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: strokeColor }}
              title="Color"
            />
            {showColorPicker && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-3 z-50">
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        onColorChange(color);
                        setShowColorPicker(false);
                      }}
                      className={`w-6 h-6 rounded-md border-2 ${
                        strokeColor === color ? 'border-gray-400' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-full h-8 rounded border"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stroke width */}
          <div className="relative">
            <button
              onClick={() => setShowStrokeMenu(!showStrokeMenu)}
              className="px-3 py-2 bg-gray-50 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              title="Stroke Width"
            >
              {strokeWidth}px
            </button>
            {showStrokeMenu && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-2 z-50">
                {strokeWidths.map((width) => (
                  <button
                    key={width}
                    onClick={() => {
                      onStrokeWidthChange(width);
                      setShowStrokeMenu(false);
                    }}
                    className={`block w-full px-3 py-2 text-left rounded hover:bg-gray-100 ${
                      strokeWidth === width ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="bg-gray-800 rounded-full"
                        style={{ width: `${width}px`, height: `${width}px` }}
                      />
                      <span>{width}px</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Zoom controls */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
          <button
            onClick={onZoomOut}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            title="Zoom Out"
          >
            <FiZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onResetZoom}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            title="Reset Zoom"
          >
            100%
          </button>
          <button
            onClick={onZoomIn}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            title="Zoom In"
          >
            <FiZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Collaborators indicator */}
          {collaboratorCount > 0 && (
            <div className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
              <FiUsers className="w-4 h-4" />
              <span>{collaboratorCount}</span>
            </div>
          )}

          {/* Save button */}
          {onSave && (
            <button
              onClick={onSave}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Save"
            >
              <FiSave className="w-4 h-4" />
            </button>
          )}

          {/* Share button */}
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Share"
            >
              <FiShare2 className="w-4 h-4" />
            </button>
          )}

          {/* Export menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Export"
            >
              <FiDownload className="w-4 h-4" />
            </button>
            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border py-2 z-50 min-w-[120px]">
                <button
                  onClick={() => handleExport('png')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PNG
                </button>
                <button
                  onClick={() => handleExport('jpg')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as JPEG
                </button>
                <button
                  onClick={() => handleExport('svg')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as SVG
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as JSON
                </button>
              </div>
            )}
          </div>

          {/* Clear button */}
          <button
            onClick={onClear}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Clear Canvas"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}