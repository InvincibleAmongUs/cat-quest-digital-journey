
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  content: string;
  hasQuiz: boolean;
  duration: string;
}

// Mock data for modules
const modules = [
  { id: 1, title: "System Superstars" },
  { id: 2, title: "Digital Citizenship HQ" }
];

export default function LessonEditor() {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      moduleId: 1,
      title: "Introduction to Computers",
      description: "Learn about the information processing cycle and types of computers",
      content: "<p>Welcome to your first lesson in Computer Applications Technology!</p>",
      hasQuiz: true,
      duration: "15 mins"
    },
    {
      id: 2,
      moduleId: 1,
      title: "Understanding Hardware Components",
      description: "Explore the physical parts that make up a computer system",
      content: "<p>In this lesson, we'll explore the various hardware components of a computer system.</p>",
      hasQuiz: true,
      duration: "20 mins"
    }
  ]);
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filtering, setFiltering] = useState<number | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [moduleId, setModuleId] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [hasQuiz, setHasQuiz] = useState(false);
  const [duration, setDuration] = useState('');
  
  const { toast } = useToast();

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setTitle(lesson.title);
    setModuleId(lesson.moduleId);
    setDescription(lesson.description);
    setContent(lesson.content);
    setHasQuiz(lesson.hasQuiz);
    setDuration(lesson.duration);
  };

  const handleCreateLesson = () => {
    if (!title || !description || moduleId === '') {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newLesson: Lesson = {
      id: lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1,
      moduleId: moduleId as number,
      title,
      description,
      content,
      hasQuiz,
      duration: duration || '15 mins'
    };
    
    setLessons([...lessons, newLesson]);
    resetForm();
    
    toast({
      title: "Lesson Created",
      description: `The lesson "${title}" has been created successfully.`,
    });
  };

  const handleUpdateLesson = () => {
    if (!selectedLesson || !title || !description || moduleId === '') {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedLessons = lessons.map(lesson => 
      lesson.id === selectedLesson.id
        ? { 
            ...lesson, 
            title, 
            moduleId: moduleId as number,
            description, 
            content,
            hasQuiz,
            duration
          }
        : lesson
    );
    
    setLessons(updatedLessons);
    resetForm();
    
    toast({
      title: "Lesson Updated",
      description: `The lesson "${title}" has been updated successfully.`,
    });
  };

  const handleDeleteLesson = () => {
    if (!selectedLesson) return;
    
    const updatedLessons = lessons.filter(lesson => lesson.id !== selectedLesson.id);
    setLessons(updatedLessons);
    resetForm();
    
    toast({
      title: "Lesson Deleted",
      description: `The lesson "${selectedLesson.title}" has been deleted.`,
    });
  };

  const resetForm = () => {
    setSelectedLesson(null);
    setTitle('');
    setModuleId('');
    setDescription('');
    setContent('');
    setHasQuiz(false);
    setDuration('');
  };

  const filteredLessons = filtering 
    ? lessons.filter(lesson => lesson.moduleId === filtering)
    : lessons;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lesson Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lesson List</h2>
            <div className="w-48">
              <Select 
                value={filtering?.toString() || "all"} 
                onValueChange={(value) => setFiltering(value === "all" ? null : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {modules.map(module => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredLessons.map(lesson => (
              <Card 
                key={lesson.id}
                className={`cursor-pointer ${selectedLesson?.id === lesson.id ? 'border-tech-primary' : ''}`}
                onClick={() => handleSelectLesson(lesson)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{lesson.title}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {modules.find(m => m.id === lesson.moduleId)?.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {filteredLessons.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No lessons found for this module.
              </div>
            )}
          </div>
          
          <Button 
            className="mt-4 w-full"
            variant="outline"
            onClick={resetForm}
          >
            Create New Lesson
          </Button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedLesson ? 'Edit Lesson' : 'Create New Lesson'}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="moduleId" className="block text-sm font-medium mb-1">
                Module <span className="text-red-500">*</span>
              </label>
              <Select 
                value={moduleId?.toString() || ""} 
                onValueChange={(value) => setModuleId(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map(module => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Computers"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <Input 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the lesson"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Lesson Content
              </label>
              <Textarea 
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="HTML content for the lesson"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                HTML content is supported. For basic formatting, use tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="duration" className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <Input 
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 15 mins"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium mb-3">
                  Has Quiz?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={hasQuiz}
                      onChange={() => setHasQuiz(true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!hasQuiz}
                      onChange={() => setHasQuiz(false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              {selectedLesson ? (
                <>
                  <Button onClick={handleUpdateLesson} className="flex-1">
                    Update Lesson
                  </Button>
                  <Button 
                    onClick={handleDeleteLesson} 
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button onClick={handleCreateLesson} className="flex-1">
                  Create Lesson
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
