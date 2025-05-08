
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd-html5-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, saveUserProgress } from '@/utils/gamification';

interface ComponentItem {
  id: string;
  name: string;
  type: 'internal' | 'external';
}

interface DropZoneProps {
  type: 'internal' | 'external';
  onDrop: (item: ComponentItem) => void;
  children: React.ReactNode;
  isOver: boolean;
}

interface HardwareHuntProps {
  onComplete?: (score: number) => void;
}

const componentList: ComponentItem[] = [
  { id: 'cpu', name: 'CPU', type: 'internal' },
  { id: 'gpu', name: 'GPU', type: 'internal' },
  { id: 'ram', name: 'RAM', type: 'internal' },
  { id: 'motherboard', name: 'Motherboard', type: 'internal' },
  { id: 'ssd', name: 'SSD', type: 'internal' },
  { id: 'hdd', name: 'HDD', type: 'internal' },
  { id: 'keyboard', name: 'Keyboard', type: 'external' },
  { id: 'mouse', name: 'Mouse', type: 'external' },
  { id: 'monitor', name: 'Monitor', type: 'external' },
  { id: 'printer', name: 'Printer', type: 'external' },
  { id: 'speakers', name: 'Speakers', type: 'external' },
  { id: 'webcam', name: 'Webcam', type: 'external' },
];

// Drag and Drop Item Types
const ItemTypes = {
  COMPONENT: 'component',
};

const Component = ({ item }: { item: ComponentItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        border: '1px dashed gray',
        marginBottom: '4px',
        backgroundColor: 'white',
      }}
    >
      {item.name}
    </div>
  );
};

const DropZone = ({ type, onDrop, children, isOver }: DropZoneProps) => {
  const [{ canDrop }, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item: ComponentItem) => {
      if (item.type === type) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '150px',
        border: '2px solid',
        borderColor: canDrop ? 'green' : 'gray',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2em',
          color: 'gray',
        }}
      >
        {!children && `Drag ${type === 'internal' ? 'Internal' : 'External'} Components Here`}
      </div>
    </div>
  );
};

export default function HardwareHunt({
  onComplete
}: HardwareHuntProps) {
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  const [internalComponents, setInternalComponents] = useState<ComponentItem[]>([]);
  const [externalComponents, setExternalComponents] = useState<ComponentItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctPlacements, setCorrectPlacements] = useState(0);
  const totalComponents = componentList.length;

  useEffect(() => {
    let correct = 0;
    internalComponents.forEach(item => {
      if (item.type === 'internal') {
        correct++;
      }
    });
    externalComponents.forEach(item => {
      if (item.type === 'external') {
        correct++;
      }
    });
    setCorrectPlacements(correct);
  }, [internalComponents, externalComponents]);

  const handleInternalDrop = (item: ComponentItem) => {
    setInternalComponents([...internalComponents, item]);
  };

  const handleExternalDrop = (item: ComponentItem) => {
    setExternalComponents([...externalComponents, item]);
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsCompleted(true);
    
    // Calculate score based on correct placements
    const score = Math.round((correctPlacements / totalComponents) * 100);
    setScore(score);
    
    // Award points based on score
    let pointsAwarded = 15; // Base points for completing
    
    if (score >= 90) {
      pointsAwarded += 10;
    } else if (score >= 75) {
      pointsAwarded += 5;
    }
    
    // Update user progress with awarded points
    try {
      const updatedUserData = await saveUserProgress(user, {
        points: pointsAwarded
      });
      
      if (updatedUserData) {
        await updateUserData({
          points: user.points + pointsAwarded
        });
        
        // Display success message
        toast({
          title: `Game Complete!`,
          description: `You scored ${score}% and earned ${pointsAwarded} points!`,
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    }
    
    if (onComplete) {
      onComplete(score);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Hardware Hunt</h2>
          <p className="mb-4">Drag and drop the components into the correct categories:</p>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <h3 className="text-md font-semibold mb-2">Internal Components</h3>
              <DropZone 
                type="internal" 
                onDrop={handleInternalDrop} 
                isOver={false}
              >
                {internalComponents.map(item => (
                  <div key={item.id}>{item.name}</div>
                ))}
              </DropZone>
            </div>

            <div className="w-1/2">
              <h3 className="text-md font-semibold mb-2">External Components</h3>
              <DropZone 
                type="external" 
                onDrop={handleExternalDrop} 
                isOver={false}
              >
                {externalComponents.map(item => (
                  <div key={item.id}>{item.name}</div>
                ))}
              </DropZone>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Components List</h3>
            <div className="flex flex-wrap">
              {componentList.map(item => (
                <Component key={item.id} item={item} />
              ))}
            </div>
          </div>

          {isCompleted && (
            <div className="mt-4 p-4 border rounded-md bg-green-100 border-green-500">
              <p className="text-green-700 font-semibold">
                <CheckCircle className="inline-block mr-2 align-middle" />
                Congratulations! You scored {score}%
              </p>
            </div>
          )}

          <Button onClick={handleComplete} disabled={isCompleted} className="mt-4">
            {isCompleted ? 'Completed' : 'Complete'}
          </Button>
        </CardContent>
      </Card>
    </DndProvider>
  );
}
