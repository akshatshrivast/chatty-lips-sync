
import { LipSyncData, VisemeFrame, VisemeType } from '@/types/lipSync';

// Mock lip sync processing service - simulates Rhubarb Lip Sync or similar tool
export const generateLipSyncData = async (text: string): Promise<LipSyncData> => {
  console.log('Processing text for lip sync:', text);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple phoneme mapping for demonstration
  const phonemeMap: Record<string, VisemeType> = {
    'a': 'A', 'e': 'E', 'i': 'I', 'o': 'O', 'u': 'U',
    'b': 'B', 'p': 'P', 'm': 'M',
    'c': 'C', 'k': 'K', 'g': 'G',
    'd': 'D', 't': 'T', 'n': 'N', 'l': 'L',
    'f': 'F', 'v': 'F', 'th': 'F',
    'h': 'H',
    's': 'S', 'z': 'S', 'sh': 'S',
    'r': 'R',
    'w': 'W',
    'y': 'Y',
    ' ': 'silence'
  };

  const words = text.toLowerCase().split(/\s+/);
  const frames: VisemeFrame[] = [];
  const frameRate = 30; // 30 FPS
  const frameDuration = 1 / frameRate;
  
  let currentTime = 0;
  const averageWordDuration = 0.6; // seconds per word
  
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];
    const wordDuration = Math.max(0.3, word.length * 0.08); // Adjust based on word length
    
    // Add silence before word (except first word)
    if (wordIndex > 0) {
      frames.push({
        timestamp: currentTime,
        viseme: 'silence',
        intensity: 0,
        duration: 0.1,
        phoneticContext: 'pause'
      });
      currentTime += 0.1;
    }
    
    // Process each character in the word
    for (let charIndex = 0; charIndex < word.length; charIndex++) {
      const char = word[charIndex];
      const viseme = phonemeMap[char] || 'silence';
      
      // Calculate character duration within word
      const charDuration = wordDuration / word.length;
      
      // Add some natural variation to intensity
      const baseIntensity = 0.7 + Math.random() * 0.3;
      const intensity = Math.min(1, baseIntensity * (viseme !== 'silence' ? 1 : 0.1));
      
      frames.push({
        timestamp: currentTime,
        viseme,
        intensity,
        duration: charDuration,
        phoneticContext: `${word}-${charIndex}`
      });
      
      currentTime += charDuration;
    }
    
    // Add brief pause between words
    if (wordIndex < words.length - 1) {
      frames.push({
        timestamp: currentTime,
        viseme: 'silence',
        intensity: 0,
        duration: 0.05,
        phoneticContext: 'word-break'
      });
      currentTime += 0.05;
    }
  }
  
  // Add final silence
  frames.push({
    timestamp: currentTime,
    viseme: 'silence',
    intensity: 0,
    duration: 0.2,
    phoneticContext: 'end'
  });
  
  const totalDuration = currentTime + 0.2;
  const phonemes = Array.from(new Set(frames.map(f => f.viseme))).filter(v => v !== 'silence');
  
  const lipSyncData: LipSyncData = {
    frames,
    metadata: {
      totalFrames: frames.length,
      frameRate,
      duration: Number(totalDuration.toFixed(2)),
      textLength: text.length,
      processingTime: 0.8, // Mock processing time
      algorithm: 'MockRhubarb v1.0',
      confidence: 0.85 + Math.random() * 0.1
    },
    originalText: text,
    phonemes,
    version: '1.0.0'
  };
  
  console.log('Generated lip sync data:', lipSyncData);
  return lipSyncData;
};

export const validateLipSyncData = (data: LipSyncData): boolean => {
  try {
    if (!data.frames || data.frames.length === 0) return false;
    if (!data.metadata || data.metadata.duration <= 0) return false;
    if (!data.originalText) return false;
    
    // Check frame consistency
    for (const frame of data.frames) {
      if (frame.timestamp < 0 || frame.intensity < 0 || frame.intensity > 1) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
};

export const exportLipSyncData = (data: LipSyncData, format: 'json' | 'csv' = 'json'): string => {
  if (format === 'json') {
    return JSON.stringify(data, null, 2);
  } else {
    // CSV export for easier analysis
    const header = 'timestamp,viseme,intensity,duration,phoneticContext\n';
    const rows = data.frames.map(frame => 
      `${frame.timestamp},${frame.viseme},${frame.intensity},${frame.duration},${frame.phoneticContext || ''}`
    ).join('\n');
    return header + rows;
  }
};
