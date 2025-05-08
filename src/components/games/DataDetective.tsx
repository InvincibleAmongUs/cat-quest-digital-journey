import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { awardPoints, saveUserProgress } from '@/utils/gamification';

interface DataItem {
  id: string;
  name: string;
  type: 'data' | 'information';
}

interface DropTargetProps {
  type: 'data' | 'information';
}

const ItemTypes = {
  DATA_ITEM: 'data_item',
};

interface DataDetectiveProps {
  items: DataItem[];
  onComplete?: (score: number) => void;
}

export default function DataDetective({
  items,
  onComplete
}: DataDetectiveProps) {
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [informationItems, setInformationItems] = useState<DataItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // Initialize state with provided items
    const initialDataItems = items.filter(item => item.type === 'data');
    const initialInformationItems = items.filter(item => item.type === 'information');

    setDataItems(initialDataItems);
    setInformationItems(initialInformationItems);
  }, [items]);

  const DataItemComponent = ({ item }: { item: DataItem }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.DATA_ITEM,
      item: { id: item.id, type: item.type },
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
        }}
        className="p-2 border rounded-md bg-white shadow-sm"
      >
        {item.name}
      </div>
    );
  };

  const DropTarget = ({ type }: DropTargetProps) => {
    const [droppedItems, setDroppedItems] = useState<DataItem[]>([]);
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.DATA_ITEM,
      drop: (item: any) => {
        if (item.type === type) {
          setDroppedItems(prevItems => {
            const newItem = items.find(i => i.id === item.id);
            return newItem ? [...prevItems, newItem] : prevItems;
          });
          setCorrectCount(prevCount => prevCount + 1);
        } else {
          toast({
            title: "Incorrect!",
            description: "This item doesn't belong here.",
            variant: "destructive",
          });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`relative w-full h-40 border-2 rounded-md flex items-center justify-center ${isOver ? 'border-primary bg-primary/10' : 'border-dashed'}`}
      >
        {isOver && (
          <div className="absolute inset-0 bg-primary/20 z-0" />
        )}
        <div className="relative z-10 text-center">
          <h3 className="text-lg font-semibold">{type === 'data' ? 'Raw Data' : 'Meaningful Information'}</h3>
          {droppedItems.length > 0 ? (
            <div className="mt-2 space-y-1">
              {droppedItems.map(item => (
                <div key={item.id} className="text-sm">{item.name}</div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Drag items here</p>
          )}
        </div>
      </div>
    );
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsCompleted(true);
    
    // Calculate score based on correct placements
    const score = Math.round((correctCount / items.length) * 100);
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
    <Card className="w-full">
      <CardContent className="p-6">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Data Items</h2>
              <div className="space-y-2">
                {items
                  .filter(item => item.type === 'data')
                  .map(item => (
                    <DataItemComponent key={item.id} item={item} />
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Information Items</h2>
              <div className="space-y-2">
                {items
                  .filter(item => item.type === 'information')
                  .map(item => (
                    <DataItemComponent key={item.id} item={item} />
                  ))}
              </div>
            </div>
            <DropTarget type="data" />
            <DropTarget type="information" />
          </div>
        </DndProvider>
        <div className="mt-6 flex items-center justify-between">
          <div>
            {isCompleted ? (
              <div className="flex items-center text-sm text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed! Score: {score}%
              </div>
            ) : (
              <div className="flex items-center text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 mr-1" />
                Drag the items to the correct category
              </div>
            )}
          </div>
          <Button onClick={handleComplete} disabled={isCompleted}>
            {isCompleted ? 'Completed' : 'Complete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
