
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waveform, Zap, Download, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Waveform className="h-8 w-8 text-blue-600" />,
      title: "Text to Visemes",
      description: "Convert dialogue text into precise mouth shape animations with timing data"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Real-time Processing",
      description: "Low latency processing optimized for interactive applications"
    },
    {
      icon: <Download className="h-8 w-8 text-green-600" />,
      title: "Export Ready",
      description: "JSON output format optimized for frontend avatar animation"
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Precise Timing",
      description: "Frame-accurate timing data with customizable frame rates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Lip Sync Animation Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform text dialogue into structured lip sync data for real-time avatar animation. 
            Generate precise visemes, phoneme timing, and animation frames optimized for frontend consumption.
          </p>
          <Button
            onClick={() => navigate('/lip-sync')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Waveform className="mr-2 h-5 w-5" />
            Start Creating Lip Sync
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-gray-50 to-gray-100">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Input Format</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Plain text dialogue strings</li>
                  <li>• Unicode character support</li>
                  <li>• Automatic text preprocessing</li>
                  <li>• Multiple language support ready</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">Output Format</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Structured JSON with metadata</li>
                  <li>• Frame-by-frame viseme data</li>
                  <li>• Timing and intensity information</li>
                  <li>• Optimized for real-time playback</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Processing Pipeline</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white px-4 py-2 rounded-full shadow">Text Analysis</div>
                <div className="text-gray-400">→</div>
                <div className="bg-white px-4 py-2 rounded-full shadow">Phoneme Extraction</div>
                <div className="text-gray-400">→</div>
                <div className="bg-white px-4 py-2 rounded-full shadow">Viseme Mapping</div>
                <div className="text-gray-400">→</div>
                <div className="bg-white px-4 py-2 rounded-full shadow">Timing Optimization</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
