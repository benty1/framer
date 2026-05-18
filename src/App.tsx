import Header from './components/Header';
import ScreenshotFramer from './components/ScreenshotFramer';
import Footer from './components/Footer';
import { useFrames } from './hooks/useFrames';
import { Toaster } from 'sonner';

function App() {
  const { frames, isLoading, error } = useFrames();



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-400">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <ScreenshotFramer
          frames={frames}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default App;