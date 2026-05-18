import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

const UploadZone = ({ onFilesSelected }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center p-12 transition-all duration-300 min-h-[500px] border-2 border-dashed rounded-lg
      ${isDragging 
        ? 'bg-blue-500/10 border-blue-400 scale-[0.99]' 
        : 'bg-app-panelSolid/20 border-app-border hover:bg-app-panelSolid/30'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`mb-6 p-6 rounded-full transition-colors duration-300 
        ${isDragging ? 'bg-blue-500/20' : 'bg-app-panelSolid/60 border border-app-border'}`}
      >
        <Upload className={`h-12 w-12 transition-colors duration-300 ${isDragging ? 'text-blue-400' : 'text-app-textMuted'}`} />
      </div>
      
      <h2 className="text-xl font-medium mb-2 text-app-textMain">Upload Apple Device Screenshots</h2>
      <p className="text-app-textMuted text-center max-w-md mb-6 text-sm">
        Drag and drop your Apple device screenshots here, or click to browse your files. 
        All processing happens locally - your images never leave your device.
      </p>
      
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className="py-2.2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center transition-colors shadow-lg shadow-blue-500/10"
          onClick={handleButtonClick}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Browse files
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
      
      <div className="mt-10 text-xs text-app-textMuted max-w-sm text-center space-y-1 opacity-70">
        <p>Supported formats: PNG, JPG, JPEG, WebP</p>
        <p>Max file size: 10MB per image</p>
      </div>
    </div>
  );
};

export default UploadZone;
