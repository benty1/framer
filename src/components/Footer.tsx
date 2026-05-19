import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-app-panelSolid/20 backdrop-blur-md py-6 border-t border-app-border">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs md:text-sm text-app-textMuted">
        <p className="opacity-90 font-medium">
          All processing happens locally. Your images never leave your device.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
// EOF
