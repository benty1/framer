import { useEffect } from 'react';
import { useFrames } from './hooks/useFrames';
import Header from './components/Header';
import Footer from './components/Footer';
import ScreenshotFramer from './components/ScreenshotFramer';
import { Toaster } from 'sonner';

function App() {
  const { frames, isLoading, error } = useFrames();

  // Clean title management for search engines / production look
  useEffect(() => {
    document.title = 'AppleFramer • Professional Device Mockups';
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-b from-app-canvasFrom via-app-canvasVia to-app-canvasTo text-app-textMain selection:bg-blue-500/20 selection:text-blue-400">
      {/* Structural Navigation Layout */}
      <Header />
      
      {/* Main Core Application Layer */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <ScreenshotFramer
          frames={frames}
          isLoading={isLoading}
          error={error}
        />
      </main>
      
      {/* Persistent Information Architecture Footer */}
      <Footer />
      
      {/* Globally Available Notification Layer */}
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default App;
