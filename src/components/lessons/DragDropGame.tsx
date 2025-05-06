
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mouse, Keyboard, Monitor, Printer } from 'lucide-react';

interface DragDropGameProps {
  onComplete: () => void;
}

type DeviceType = 'input' | 'output';

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: DeviceType;
  position: { x: number; y: number };
  placed: boolean;
  placedCorrectly: boolean;
}

interface DropZone {
  id: string;
  title: string;
  type: DeviceType;
}

export default function DragDropGame({ onComplete }: DragDropGameProps) {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([
    { id: 'keyboard', name: 'Keyboard', icon: <Keyboard size={40} />, type: 'input', position: { x: 0, y: 0 }, placed: false, placedCorrectly: false },
    { id: 'mouse', name: 'Mouse', icon: <Mouse size={40} />, type: 'input', position: { x: 0, y: 0 }, placed: false, placedCorrectly: false },
    { id: 'monitor', name: 'Monitor', icon: <Monitor size={40} />, type: 'output', position: { x: 0, y: 0 }, placed: false, placedCorrectly: false },
    { id: 'printer', name: 'Printer', icon: <Printer size={40} />, type: 'output', position: { x: 0, y: 0 }, placed: false, placedCorrectly: false },
  ]);
  
  const dropZones: DropZone[] = [
    { id: 'input-zone', title: 'Input Devices', type: 'input' },
    { id: 'output-zone', title: 'Output Devices', type: 'output' }
  ];
  
  const [draggedDevice, setDraggedDevice] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  
  const deviceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const handleDragStart = (id: string) => {
    setDraggedDevice(id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, zoneId: string, zoneType: DeviceType) => {
    e.preventDefault();
    
    if (!draggedDevice) return;
    
    const updatedDevices = devices.map(device => {
      if (device.id === draggedDevice) {
        const isCorrect = device.type === zoneType;
        return {
          ...device,
          placed: true,
          placedCorrectly: isCorrect
        };
      }
      return device;
    });
    
    setDevices(updatedDevices);
    setDraggedDevice(null);
    
    const allPlaced = updatedDevices.every(device => device.placed);
    if (allPlaced) {
      setGameCompleted(true);
      const allCorrect = updatedDevices.every(device => device.placedCorrectly);
      setAllCorrect(allCorrect);
    }
  };
  
  const resetGame = () => {
    setDevices(devices.map(device => ({
      ...device,
      placed: false,
      placedCorrectly: false
    })));
    setGameCompleted(false);
    setAllCorrect(false);
  };
  
  const completeGame = () => {
    toast({
      title: "Great job!",
      description: "You've correctly categorized all devices. +15 points earned!",
    });
    onComplete();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Input vs Output Devices</h3>
        <p>Drag each device to the correct category box. Input devices send data into the computer, while output devices receive data from the computer.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Device Pool */}
        <div className="flex-1">
          <h4 className="font-medium mb-3">Devices:</h4>
          <div className="grid grid-cols-2 gap-4">
            {devices.map(device => (
              <Card 
                key={device.id}
                className={`p-4 cursor-move flex flex-col items-center text-center 
                  ${device.placed ? 'opacity-50' : 'bg-white'}
                  ${device.placed && device.placedCorrectly ? 'border-green-500' : ''}
                  ${device.placed && !device.placedCorrectly ? 'border-red-500' : ''}`}
                draggable={!device.placed}
                onDragStart={() => handleDragStart(device.id)}
                ref={el => deviceRefs.current[device.id] = el}
              >
                {device.icon}
                <span className="mt-2">{device.name}</span>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Drop Zones */}
        <div className="flex-1 space-y-6">
          {dropZones.map(zone => (
            <div key={zone.id} className="space-y-2">
              <h4 className="font-medium">{zone.title}</h4>
              <div 
                className="border-2 border-dashed rounded-lg p-4 min-h-[150px] flex flex-wrap gap-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone.id, zone.type)}
              >
                {devices
                  .filter(device => device.placed && device.type === zone.type)
                  .map(device => (
                    <Card 
                      key={device.id} 
                      className={`p-4 flex flex-col items-center text-center
                        ${device.placedCorrectly ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                    >
                      {device.icon}
                      <span className="mt-2">{device.name}</span>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {gameCompleted && (
        <div className={`p-4 rounded-md ${allCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-bold mb-2">
            {allCorrect ? 'Great job! All devices are correctly placed.' : 'Some devices are not placed correctly.'}
          </h3>
          <div className="flex gap-4 mt-2">
            {!allCorrect && (
              <Button variant="outline" onClick={resetGame}>Try Again</Button>
            )}
            <Button onClick={completeGame} disabled={!allCorrect}>Continue</Button>
          </div>
        </div>
      )}
    </div>
  );
}
