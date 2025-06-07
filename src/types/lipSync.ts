
export interface VisemeFrame {
  timestamp: number;
  viseme: string;
  intensity: number;
  duration: number;
  phoneticContext?: string;
}

export interface LipSyncMetadata {
  totalFrames: number;
  frameRate: number;
  duration: number;
  textLength: number;
  processingTime: number;
  algorithm: string;
  confidence: number;
}

export interface LipSyncData {
  frames: VisemeFrame[];
  metadata: LipSyncMetadata;
  originalText: string;
  phonemes: string[];
  version: string;
}

export interface ProcessingOptions {
  frameRate?: number;
  smoothing?: boolean;
  intensityNormalization?: boolean;
  language?: string;
}

export type VisemeType = 
  | 'A' | 'E' | 'I' | 'O' | 'U'  // Vowels
  | 'B' | 'C' | 'D' | 'F' | 'G'  // Consonants
  | 'H' | 'K' | 'L' | 'M' | 'N'
  | 'P' | 'Q' | 'R' | 'S' | 'T'
  | 'W' | 'Y' | 'silence';
