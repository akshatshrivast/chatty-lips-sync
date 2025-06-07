
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, Download, Waveform } from 'lucide-react';
import { toast } from 'sonner';
import { LipSyncData, VisemeFrame } from '@/types/lipSync';
import { generateLipSyncData } from '@/services/lipSyncService';
import { VisemeVisualization } from '@/components/VisemeVisualization';

export const LipSyncProcessor = () => {
  const [inputText, setInputText] = useState('');
  const [lipSyncData, setLipSyncData] = useState<LipSyncData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const handleProcess = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to process');
      return;
    }

    setIsProcessing(true);
    setLipSyncData(null);

    try {
      console.log('Starting lip sync processing for text:', inputText);
      
      setProcessingStep('Analyzing text structure...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep('Generating phonemes...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep('Creating viseme mapping...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setProcessingStep('Optimizing timing data...');
      await new Promise(resolve => setTimeout(resolve, 600));

      const result = await generateLipSyncData(inputText);
      
      setLipSyncData(result);
      console.log('Generated lip sync data:', result);
      
      toast.success('Lip sync data generated successfully!');
    } catch (error) {
      console.error('Error processing lip sync:', error);
      toast.error('Failed to process lip sync data. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleDownload = () => {
    if (!lipSyncData) return;

    const dataStr = JSON.stringify(lipSyncData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `lipsync_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Lip sync data downloaded!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Waveform className="h-6 w-6 text-blue-600" />
            Text Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your dialogue text here... (e.g., 'Hello there! How are you doing today?')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-32 text-lg border-2 focus:border-blue-500 transition-colors"
          />
          
          <div className="flex gap-4">
            <Button
              onClick={handleProcess}
              disabled={isProcessing || !inputText.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate Lip Sync
                </>
              )}
            </Button>
            
            {lipSyncData && (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-2 border-blue-200 hover:border-blue-400 px-6"
              >
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            )}
          </div>
          
          {isProcessing && processingStep && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="font-medium">{processingStep}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {lipSyncData && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Viseme Visualization */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Viseme Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <VisemeVisualization data={lipSyncData} />
            </CardContent>
          </Card>

          {/* Data Output */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Generated Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{lipSyncData.metadata.totalFrames}</div>
                  <div className="text-sm text-gray-600">Total Frames</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{lipSyncData.metadata.duration}s</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Detected Visemes:</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(lipSyncData.frames.map(f => f.viseme))).map(viseme => (
                    <Badge key={viseme} variant="secondary" className="bg-blue-100 text-blue-800">
                      {viseme}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="text-xs text-gray-700">
                  {JSON.stringify(lipSyncData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
