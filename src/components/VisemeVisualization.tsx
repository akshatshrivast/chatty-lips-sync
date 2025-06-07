
import React, { useState, useEffect } from 'react';
import { LipSyncData } from '@/types/lipSync';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface VisemeVisualizationProps {
  data: LipSyncData;
}

export const VisemeVisualization: React.FC<VisemeVisualizationProps> = ({ data }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= data.frames.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, (1000 / data.metadata.frameRate) / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, data.frames.length, data.metadata.frameRate, playbackSpeed]);

  const handlePlay = () => {
    if (currentFrame >= data.frames.length - 1) {
      setCurrentFrame(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const currentViseme = data.frames[currentFrame];
  const progress = (currentFrame / (data.frames.length - 1)) * 100;

  // Viseme to mouth shape mapping for simple visualization
  const getVisemeColor = (viseme: string) => {
    const colors: Record<string, string> = {
      'A': '#ff6b6b', 'E': '#4ecdc4', 'I': '#45b7d1', 'O': '#96ceb4', 'U': '#ffeaa7',
      'B': '#dda0dd', 'C': '#98d8c8', 'D': '#f7dc6f', 'F': '#bb8fce', 'G': '#85c1e9',
      'H': '#f8c471', 'K': '#82e0aa', 'L': '#f1948a', 'M': '#85c1e9', 'N': '#d5a6bd',
      'P': '#aed6f1', 'Q': '#a9dfbf', 'R': '#f9e79f', 'S': '#d7bde2', 'T': '#a3e4d7',
      'W': '#f5b7b1', 'Y': '#abebc6', 'silence': '#e8e8e8'
    };
    return colors[viseme] || '#e8e8e8';
  };

  return (
    <div className="space-y-6">
      {/* Current Viseme Display */}
      <div className="text-center">
        <div 
          className="mx-auto w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-200"
          style={{ backgroundColor: getVisemeColor(currentViseme?.viseme || 'silence') }}
        >
          {currentViseme?.viseme || 'X'}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Frame {currentFrame + 1} / {data.frames.length}
        </div>
        {currentViseme && (
          <div className="text-xs text-gray-500">
            {currentViseme.timestamp.toFixed(3)}s - Intensity: {(currentViseme.intensity * 100).toFixed(0)}%
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>0s</span>
          <span>{data.metadata.duration}s</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handlePlay}
          variant="outline"
          size="sm"
          className="bg-white border-2 border-blue-200 hover:border-blue-400"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="bg-white border-2 border-gray-200 hover:border-gray-400"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex justify-center gap-2">
        {[0.5, 1, 1.5, 2].map(speed => (
          <Button
            key={speed}
            onClick={() => setPlaybackSpeed(speed)}
            variant={playbackSpeed === speed ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            {speed}x
          </Button>
        ))}
      </div>

      {/* Timeline Visualization */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">Viseme Timeline</h4>
        <div className="h-16 bg-gray-100 rounded-lg overflow-hidden relative">
          <div className="flex h-full">
            {data.frames.map((frame, index) => (
              <div
                key={index}
                className="flex-1 border-r border-white transition-opacity duration-200"
                style={{ 
                  backgroundColor: getVisemeColor(frame.viseme),
                  opacity: index === currentFrame ? 1 : 0.7,
                  minWidth: '2px'
                }}
                title={`${frame.viseme} - ${frame.timestamp.toFixed(3)}s`}
              />
            ))}
          </div>
          {/* Current position indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 transition-all duration-100"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
