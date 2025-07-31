import React from 'react';

const BackgroundVisualization = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background"></div>
      
      {/* Floating financial data elements */}
      <div className="absolute top-20 left-10 opacity-80">
        <div className="w-32 h-20 glass-morphic rounded-lg p-3">
          <div className="text-xs text-foreground font-mono">Assets: ₹1.2M</div>
          <div className="text-xs text-muted-foreground mt-1">+8.5% YoY</div>
        </div>
      </div>
      
      <div className="absolute top-40 right-20 opacity-80">
        <div className="w-28 h-16 glass-morphic rounded-lg p-3">
          <div className="text-xs text-foreground font-mono">Revenue</div>
          <div className="text-xs text-accent mt-1">$850K</div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-20 opacity-80">
        <div className="w-36 h-24 glass-morphic rounded-lg p-3">
          <div className="text-xs text-foreground font-mono">Liabilities</div>
          <div className="text-xs text-warning mt-1">₹45,00,000</div>
          <div className="text-xs text-muted-foreground mt-1">Q4 2024</div>
        </div>
      </div>
      
      <div className="absolute bottom-20 right-16 opacity-80">
        <div className="w-30 h-18 glass-morphic rounded-lg p-3">
          <div className="text-xs text-foreground font-mono">Growth</div>
          <div className="text-xs text-accent mt-1">+12.3%</div>
        </div>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5">
        <div className="w-full h-full border border-primary/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-5">
        <div className="w-full h-full border border-secondary/20 rounded-lg rotate-45 animate-pulse"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default BackgroundVisualization;