import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-app-panelSolid/20 backdrop-blur-md py-6 border-t border-app-border">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-app-textMuted">
        <p className="opacity-90 font-medium">
          All processing happens locally. Your images never leave your device.
        </p>
        
        <p className="opacity-85">
          <a 
            href="https://github.com/benty1/framer" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-semibold underline decoration-blue-500/30 underline-offset-4"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// EOF
