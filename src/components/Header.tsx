import { Smartphone } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-app-panelSolid/20 backdrop-blur-md border-b border-app-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium text-app-textMain">
            <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">          
              <Smartphone className="h-6 w-6 text-blue-400" />
              Framer
            </a>  
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-app-textMuted">
              Process locally • No uploads • Download as zip •{' '}
              <a 
                href="https://github.com/timbroddin/appleframer.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Open source
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
