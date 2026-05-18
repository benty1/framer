import React, { useState, useEffect, useCallback } from 'react';
import { X, Smartphone, RotateCcw } from 'lucide-react';
import { DeviceFrame, useFrames } from '../hooks/useFrames';

interface FrameSettingsProps {
  selectedFrame: DeviceFrame;
  setSelectedFrame: (frame: DeviceFrame) => void;
  onClose: () => void;
}

const FrameSettings = ({
  selectedFrame,
  setSelectedFrame,
  onClose
}: FrameSettingsProps) => {
  const { frames, isLoading, error } = useFrames();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(frames.map(frame => frame.category)));

  // Get models for selected category
  const modelsByCategory = React.useMemo(() => {
    return Array.from(new Set(
      frames
        .filter(frame => frame.category === selectedCategory)
        .map(frame => frame.model)
    ));
  }, [frames, selectedCategory]);

  // Get versions for selected model
  const versionsByModel = React.useMemo(() => {
    return Array.from(new Set(
      frames
        .filter(frame =>
          frame.category === selectedCategory &&
          frame.model === selectedModel
        )
        .map(frame => frame.version)
        .filter((version): version is string => version !== undefined)
    ));
  }, [frames, selectedCategory, selectedModel]);

  // Get variants for selected version
  const variantsByVersion = React.useMemo(() => {
    return Array.from(new Set(
      frames
        .filter(frame =>
          frame.category === selectedCategory &&
          frame.model === selectedModel &&
          (versionsByModel.length === 0 || frame.version === selectedVersion)
        )
        .map(frame => frame.variant)
        .filter((variant): variant is string => variant !== undefined)
    ));
  }, [frames, selectedCategory, selectedModel, selectedVersion, versionsByModel]);

  // Get colors for selected variant
  const colorsByVariant = React.useMemo(() => {
    return Array.from(new Set(
      frames
        .filter(frame =>
          frame.category === selectedCategory &&
          frame.model === selectedModel &&
          (versionsByModel.length === 0 || frame.version === selectedVersion) &&
          frame.color
        )
        .map(frame => frame.color)
        .filter((color): color is string => color !== undefined)
    ));
  }, [frames, selectedCategory, selectedModel, selectedVersion, versionsByModel]);

  // Get orientations for selected variant or color
  const orientationsByVariant = React.useMemo(() => {
    return frames.filter(frame => {
      const matchesBasic =
        frame.category === selectedCategory &&
        frame.model === selectedModel &&
        (versionsByModel.length === 0 || frame.version === selectedVersion) &&
        frame.orientation;

      // If there are colors, filter by color
      if (colorsByVariant.length > 0) {
        return matchesBasic && frame.color === selectedColor;
      }

      // If there are variants, filter by variant
      if (variantsByVersion.length > 0) {
        return matchesBasic && frame.variant === selectedVariant;
      }

      // Otherwise, just return all matching orientations
      return matchesBasic;
    });
  }, [frames, selectedCategory, selectedModel, selectedVersion, selectedVariant, selectedColor, colorsByVariant, variantsByVersion, versionsByModel]);


  const handleModelSelect = useCallback((model: string) => {
    setSelectedModel(model);
    setSelectedVersion(null);
    setSelectedVariant(null);
    setSelectedColor(null);

    // If there's only one version, select it automatically
    const versions = frames
      .filter(frame => frame.category === selectedCategory && frame.model === model)
      .map(frame => frame.version)
      .filter((version): version is string => version !== undefined);

    if (versions.length === 1) {
      setSelectedVersion(versions[0]);
    }
  }, [frames, selectedCategory]);

  const handleVersionSelect = useCallback((version: string) => {
    setSelectedVersion(version);
    setSelectedVariant(null);
    setSelectedColor(null);

    // Find matching frames for this version
    const matchingFrames = frames.filter(frame =>
      frame.category === selectedCategory &&
      frame.model === selectedModel &&
      frame.version === version
    );

    if (matchingFrames.length === 1 || !matchingFrames.some(frame => frame.variant)) {
      setSelectedFrame(matchingFrames[0]);
    } else {
      const variants = matchingFrames
        .map(frame => frame.variant)
        .filter((variant): variant is string => variant !== undefined);

      if (variants.length === 1) {
        setSelectedVariant(variants[0]);
      }
    }
  }, [frames, selectedCategory, selectedModel, setSelectedFrame]);

  const handleVariantSelect = useCallback((variant: string) => {
    setSelectedVariant(variant);

    const matchingFrames = frames.filter(frame =>
      frame.category === selectedCategory &&
      frame.model === selectedModel &&
      (versionsByModel.length === 0 || frame.version === selectedVersion) &&
      frame.variant === variant
    );

    if (matchingFrames.length === 1) {
      setSelectedFrame(matchingFrames[0]);
    } else if (matchingFrames.length > 1) {
      const portraitFrame = matchingFrames.find(frame => frame.orientation === 'Portrait');
      if (portraitFrame) {
        setSelectedFrame(portraitFrame);
      } else {
        setSelectedFrame(matchingFrames[0]);
      }
    }
  }, [frames, selectedCategory, selectedModel, selectedVersion, versionsByModel, setSelectedFrame]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);

    const matchingFrames = frames.filter(frame =>
      frame.category === selectedCategory &&
      frame.model === selectedModel &&
      frame.version === selectedVersion &&
      frame.color === color
    );

    if (matchingFrames.length === 1) {
      setSelectedFrame(matchingFrames[0]);
    } else if (matchingFrames.length > 1) {
      const portraitFrame = matchingFrames.find(frame => frame.orientation === 'Portrait');
      if (portraitFrame) {
        setSelectedFrame(portraitFrame);
      } else {
        setSelectedFrame(matchingFrames[0]);
      }
    }
  }, [frames, selectedCategory, selectedModel, selectedVersion, setSelectedFrame]);

  // Auto-select first options
  useEffect(() => {
    if (isLoading || error) return;

    if (modelsByCategory.length > 0 && !selectedModel) {
      handleModelSelect(modelsByCategory[0]);
    }
  }, [modelsByCategory, isLoading, error, selectedModel, handleModelSelect]);

  useEffect(() => {
    if (isLoading || error) return;

    if (versionsByModel.length > 0 && !selectedVersion) {
      const version = versionsByModel[0];
      setSelectedVersion(version);

      const matchingFrames = frames.filter(frame =>
        frame.category === selectedCategory &&
        frame.model === selectedModel &&
        frame.version === version
      );

      if (matchingFrames.length === 1 || !matchingFrames.some(frame => frame.variant)) {
        setSelectedFrame(matchingFrames[0]);
      } else {
        const variants = matchingFrames
          .map(frame => frame.variant)
          .filter((variant): variant is string => variant !== undefined);

        if (variants.length === 1) {
          setSelectedVariant(variants[0]);
        }
      }
    }
  }, [versionsByModel, isLoading, error, selectedVersion, frames, selectedCategory, selectedModel, setSelectedFrame]);

  useEffect(() => {
    if (isLoading || error) return;

    if (variantsByVersion.length > 0 && !selectedVariant) {
      handleVariantSelect(variantsByVersion[0]);
    }
  }, [variantsByVersion, isLoading, error, selectedVariant, handleVariantSelect]);

  useEffect(() => {
    if (isLoading || error) return;

    if (colorsByVariant.length > 0 && !selectedColor) {
      handleColorSelect(colorsByVariant[0]);
    }
  }, [colorsByVariant, isLoading, error, selectedColor, handleColorSelect]);

  useEffect(() => {
    if (isLoading || error) return;

    if (orientationsByVariant.length === 1) {
      setSelectedFrame(orientationsByVariant[0]);
    } else if (orientationsByVariant.length > 1) {
      const portraitOption = orientationsByVariant.find(frame => frame.orientation === 'Portrait');
      if (portraitOption) {
        setSelectedFrame(portraitOption);
      } else {
        setSelectedFrame(orientationsByVariant[0]);
      }
    }
  }, [orientationsByVariant, isLoading, error, setSelectedFrame]);

  // Sync state with selectedFrame when modal opens or selectedFrame changes
  useEffect(() => {
    if (selectedFrame) {
      setSelectedCategory(selectedFrame.category || null);
      setSelectedModel(selectedFrame.model || null);
      setSelectedVersion(selectedFrame.version || null);
      setSelectedVariant(selectedFrame.variant || null);
      setSelectedColor(selectedFrame.color || null);
    }
  }, [selectedFrame]);

  // Auto-select frame if all selections are made and only one frame matches
  useEffect(() => {
    if (isLoading || error) return;
    if (!selectedCategory || !selectedModel || !selectedVersion) return;

    const matchingFrames = frames.filter(frame =>
      frame.category === selectedCategory &&
      frame.model === selectedModel &&
      frame.version === selectedVersion &&
      (selectedVariant ? frame.variant === selectedVariant : true)
    );

    if (matchingFrames.length === 1 && selectedFrame?.id !== matchingFrames[0].id) {
      setSelectedFrame(matchingFrames[0]);
    }
  }, [isLoading, error, selectedCategory, selectedModel, selectedVersion, selectedVariant, frames, selectedFrame, setSelectedFrame]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-20 animate-fadeIn">
        <div className="bg-app-panel border border-app-border rounded-xl shadow-2xl max-w-2xl w-full p-8 mx-4 animate-slideUp text-center">
          <p className="text-app-textMuted">Loading available frames...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-20 animate-fadeIn">
        <div className="bg-app-panel border border-app-border rounded-xl shadow-2xl max-w-2xl w-full p-8 mx-4 animate-slideUp text-center">
          <p className="text-red-400">Error loading frames: {error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-20 animate-fadeIn overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-app-panelSolid border border-app-border rounded-xl shadow-2xl max-w-2xl w-full p-8 animate-slideUp my-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-medium text-app-textMain">Frame Settings</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-app-panelSolid/80 rounded-full transition-colors border border-transparent hover:border-app-border text-app-textMuted hover:text-app-textMain"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Device Category Selection */}
            <div>
              <h4 className="font-medium mb-4 text-lg text-app-textMain">Device Type</h4>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`p-4 rounded-lg border font-medium text-base transition-all duration-200 ${selectedCategory === category
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/5'
                        : 'border-app-border bg-app-panelSolid hover:bg-app-panelSolid/80 text-app-textMuted hover:text-app-textMain'
                      }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedModel(null);
                      setSelectedVersion(null);
                      setSelectedVariant(null);
                      setSelectedColor(null);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Model Selection */}
            {modelsByCategory.length > 0 && (
              <div>
                <h4 className="font-medium mb-4 text-lg text-app-textMain">Device Model</h4>
                <div className="grid grid-cols-2 gap-4 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
                  {modelsByCategory.map((model) => (
                    <button
                      key={model}
                      className={`p-4 rounded-lg border text-left font-medium transition-all duration-200 ${selectedModel === model
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-app-border bg-app-panelSolid hover:bg-app-panelSolid/80 text-app-textMuted hover:text-app-textMain'
                        }`}
                      onClick={() => handleModelSelect(model)}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Version Selection */}
            {selectedModel && versionsByModel.length > 0 && (
              <div>
                <h4 className="font-medium mb-4 text-lg text-app-textMain">Version</h4>
                <div className="grid grid-cols-2 gap-4">
                  {versionsByModel.map((version) => (
                    <button
                      key={version}
                      className={`p-4 rounded-lg border text-left font-medium transition-all duration-200 ${selectedVersion === version
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-app-border bg-app-panelSolid hover:bg-app-panelSolid/80 text-app-textMuted hover:text-app-textMain'
                        }`}
                      onClick={() => handleVersionSelect(version)}
                    >
                      {version}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selection */}
            {variantsByVersion.length > 0 && (
              <div>
                <h4 className="font-medium mb-4 text-lg text-app-textMain">Size</h4>
                <div className="grid grid-cols-2 gap-4">
                  {variantsByVersion.map((variant) => (
                    <button
                      key={variant}
                      className={`p-4 rounded-lg border text-left font-medium transition-all duration-200 ${selectedVariant === variant
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-app-border bg-app-panelSolid hover:bg-app-panelSolid/80 text-app-textMuted hover:text-app-textMain'
                        }`}
                      onClick={() => handleVariantSelect(variant)}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colorsByVariant.length > 0 && (
              <div>
                <h4 className="font-medium mb-4 text-lg text-app-textMain">Color</h4>
                <div className="grid grid-cols-3 gap-4">
                  {colorsByVariant.map((color) => (
                    <button
                      key={color}
                      className={`p-4 rounded-lg border text-left font-medium transition-all duration-200 ${selectedColor === color
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-app-border bg-app-panelSolid hover:bg-app-panelSolid/80 text-app-textMuted hover:text-app-textMain'
                        }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orientation Selection */}
            {orientationsByVariant.length > 1 && (
              <div>
                <h4 className="font-medium mb-4 text-lg text-app-textMain">Orientation</h4>
                <div className="grid grid-cols-2 gap-4">
                  {orientationsByVariant.map((frame) => (
                    <button
                      key={frame.id}
                      className={`flex items-center justify-center p-4 rounded-lg font-medium transition-all duration-200 ${selectedFrame.id === frame.id
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-app-panelSolid hover:bg-app-panelSolid/80 border border-app-border text-app-textMuted hover:text-app-textMain'
                        }`}
                      onClick={() => setSelectedFrame(frame)}
                    >
                      {frame.orientation === 'Portrait' ? (
                        <Smartphone className="h-5 w-5 mr-2" />
                      ) : (
                        <RotateCcw className="h-5 w-5 mr-2" />
                      )}
                      <span className="text-base">{frame.orientation}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-app-border flex gap-4">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 text-base font-medium shadow-lg shadow-blue-500/10"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSettings;
