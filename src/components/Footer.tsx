import React from 'react';
import GitHubButton from 'react-github-btn';

const Footer = () => {
  return (
    <footer className="bg-app-panelSolid/20 backdrop-blur-md py-6 border-t border-app-border">
      <div className="container mx-auto px-4 flex flex-col items-center text-center text-xs md:text-sm text-app-textMuted space-y-2">
        <p className="font-medium opacity-90">
          All processing happens locally in your browser. Your images are never uploaded to any server.
        </p>
        <p className="opacity-75">
          Crafted by{' '}
          <a 
            href="https://www.titansofindustry.be/" 
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline decoration-blue-500/30 underline-offset-4"
          >
            Tim Broddin
          </a>{' '}
          to scratch an itch.
          <br />
          Partially based on the{' '}
          <a 
            href="https://www.macstories.net/ios/apple-frames-3-2-brings-iphone-15-pro-frames-files-picker-and-adjustable-spacing/" 
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline decoration-blue-500/30 underline-offset-4"
          >
            Apple Frames shortcut
          </a>.
        </p>
        <div className="mt-4 pt-2 opacity-90">
          <GitHubButton 
            href="https://github.com/timbroddin/appleframer.com" 
            data-size="large" 
            data-show-count="true" 
            aria-label="Star timbroddin/appleframer on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
