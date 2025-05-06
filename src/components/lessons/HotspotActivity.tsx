
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HotspotActivity {
  onComplete: () => void;
}

interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: string;
  y: string;
  discovered: boolean;
}

export default function HotspotActivity({ onComplete }: HotspotActivity) {
  const { toast } = useToast();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: 'usb',
      name: 'USB Port',
      description: 'Universal Serial Bus (USB) ports connect devices like keyboards, mice, flash drives, and other peripherals to your computer. They provide both data transfer and power.',
      x: '30%',
      y: '40%',
      discovered: false
    },
    {
      id: 'hdmi',
      name: 'HDMI Port',
      description: 'High-Definition Multimedia Interface (HDMI) ports connect to displays like monitors and TVs. They transfer both audio and video signals in high quality.',
      x: '70%',
      y: '60%',
      discovered: false
    }
  ]);
  
  const handleHotspotClick = (id: string) => {
    setActiveHotspot(id);
    
    // Mark this hotspot as discovered
    setHotspots(prevHotspots => 
      prevHotspots.map(hotspot => 
        hotspot.id === id ? { ...hotspot, discovered: true } : hotspot
      )
    );
  };
  
  const closeHotspot = () => {
    setActiveHotspot(null);
  };
  
  const allDiscovered = hotspots.every(hotspot => hotspot.discovered);
  
  const handleComplete = () => {
    toast({
      title: "Activity Completed!",
      description: "You've identified all the ports and connectors.",
    });
    onComplete();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Ports and Connectors</h3>
        <p>Click on the highlighted areas to learn about different ports and connectors on a computer.</p>
      </div>
      
      <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden">
        {/* Computer image background */}
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
          alt="Computer ports and connectors" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay explaining the activity */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="text-white text-center max-w-md">
            <h3 className="text-xl font-bold mb-2">Computer Ports Explorer</h3>
            <p>This is an interactive diagram showing common ports on a computer. Click on the highlighted circles to learn about each port.</p>
          </div>
        </div>
        
        {/* Hotspots */}
        {hotspots.map(hotspot => (
          <button
            key={hotspot.id}
            className={`absolute w-12 h-12 rounded-full -ml-6 -mt-6 border-4 flex items-center justify-center transition-all
              ${hotspot.discovered 
                ? 'border-green-500 bg-green-500/30' 
                : 'border-yellow-500 bg-yellow-500/30 animate-pulse'}`}
            style={{ left: hotspot.x, top: hotspot.y }}
            onClick={() => handleHotspotClick(hotspot.id)}
            aria-label={`Learn about ${hotspot.name}`}
          >
            {hotspot.discovered && <CheckCircle2 className="text-white" size={24} />}
          </button>
        ))}
        
        {/* Active hotspot info */}
        {activeHotspot && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-6">
            <Card className="max-w-md w-full p-6">
              {hotspots.find(h => h.id === activeHotspot) && (
                <>
                  <h3 className="text-xl font-bold mb-2">
                    {hotspots.find(h => h.id === activeHotspot)?.name}
                  </h3>
                  <p className="mb-4">
                    {hotspots.find(h => h.id === activeHotspot)?.description}
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={closeHotspot}>Close</Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p><strong>Discovered:</strong> {hotspots.filter(h => h.discovered).length}/{hotspots.length}</p>
        </div>
        {allDiscovered && (
          <Button onClick={handleComplete}>Continue</Button>
        )}
      </div>
      
      <div className="border-t pt-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <span className="sr-only">Accessibility Option</span>
          Read Aloud
        </Button>
      </div>
    </div>
  );
}
