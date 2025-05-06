
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Module {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export default function ModuleEditor() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "System Superstars",
      description: "Master computer systems, components and basic operations",
      longDescription: "In this module, you'll learn about the essential components of computer systems, how they work together, and basic operations you need to master.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Digital Citizenship HQ",
      description: "Ethics, safety and responsible technology use",
      longDescription: "Learn about digital ethics, online safety, and how to be a responsible digital citizen in today's connected world.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ]);
  
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLongDescription, setNewLongDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  
  const { toast } = useToast();

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    setNewTitle(module.title);
    setNewDescription(module.description);
    setNewLongDescription(module.longDescription);
    setNewImage(module.image);
  };

  const handleCreateModule = () => {
    if (!newTitle || !newDescription) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newModule: Module = {
      id: modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1,
      title: newTitle,
      description: newDescription,
      longDescription: newLongDescription,
      image: newImage || "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
    };
    
    setModules([...modules, newModule]);
    resetForm();
    
    toast({
      title: "Module Created",
      description: `The module "${newTitle}" has been created successfully.`,
    });
  };

  const handleUpdateModule = () => {
    if (!selectedModule || !newTitle || !newDescription) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedModules = modules.map(module => 
      module.id === selectedModule.id
        ? { 
            ...module, 
            title: newTitle, 
            description: newDescription, 
            longDescription: newLongDescription,
            image: newImage 
          }
        : module
    );
    
    setModules(updatedModules);
    resetForm();
    
    toast({
      title: "Module Updated",
      description: `The module "${newTitle}" has been updated successfully.`,
    });
  };

  const handleDeleteModule = () => {
    if (!selectedModule) return;
    
    const updatedModules = modules.filter(module => module.id !== selectedModule.id);
    setModules(updatedModules);
    resetForm();
    
    toast({
      title: "Module Deleted",
      description: `The module "${selectedModule.title}" has been deleted.`,
    });
  };

  const resetForm = () => {
    setSelectedModule(null);
    setNewTitle('');
    setNewDescription('');
    setNewLongDescription('');
    setNewImage('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Module Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Module List</h2>
          <div className="space-y-4">
            {modules.map(module => (
              <Card 
                key={module.id}
                className={`cursor-pointer ${selectedModule?.id === module.id ? 'border-tech-primary' : ''}`}
                onClick={() => handleSelectModule(module)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            className="mt-4 w-full"
            variant="outline"
            onClick={resetForm}
          >
            Create New Module
          </Button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedModule ? 'Edit Module' : 'Create New Module'}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Module Title <span className="text-red-500">*</span>
              </label>
              <Input 
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. System Superstars"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Short Description <span className="text-red-500">*</span>
              </label>
              <Input 
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="e.g. Learn about computer systems and components"
                required
              />
            </div>
            
            <div>
              <label htmlFor="longDescription" className="block text-sm font-medium mb-1">
                Long Description
              </label>
              <Textarea 
                id="longDescription"
                value={newLongDescription}
                onChange={(e) => setNewLongDescription(e.target.value)}
                placeholder="Detailed description of the module"
                rows={4}
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input 
                id="image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="URL to module cover image"
              />
              {newImage && (
                <div className="mt-2">
                  <img 
                    src={newImage} 
                    alt="Module preview" 
                    className="h-40 w-full object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80")}
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-2 pt-4">
              {selectedModule ? (
                <>
                  <Button onClick={handleUpdateModule} className="flex-1">
                    Update Module
                  </Button>
                  <Button 
                    onClick={handleDeleteModule} 
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button onClick={handleCreateModule} className="flex-1">
                  Create Module
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
