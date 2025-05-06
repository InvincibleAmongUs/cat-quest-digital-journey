
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: number;
  lessonId: number;
  questions: Question[];
}

// Mock data for lessons
const lessons = [
  { id: 1, title: "Introduction to Computers", moduleId: 1 },
  { id: 2, title: "Understanding Hardware Components", moduleId: 1 },
  { id: 3, title: "Digital Ethics", moduleId: 2 }
];

// Mock data for modules (for filtering)
const modules = [
  { id: 1, title: "System Superstars" },
  { id: 2, title: "Digital Citizenship HQ" }
];

export default function QuizEditor() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      lessonId: 1,
      questions: [
        {
          id: 1,
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Utility"],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Which of these is NOT a type of computer?",
          options: ["Desktop", "Laptop", "Dataphone"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is the main purpose of computer storage?",
          options: ["To process data", "To save data for future use", "To display output"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      lessonId: 2,
      questions: [
        {
          id: 1,
          question: "Which component is considered the 'brain' of the computer?",
          options: ["RAM", "CPU", "Hard Drive"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What is the purpose of a GPU?",
          options: ["Sound processing", "Graphics processing", "Network processing"],
          correctAnswer: 1
        }
      ]
    }
  ]);
  
  const [filterModule, setFilterModule] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  
  // Form fields
  const [lessonId, setLessonId] = useState<number | ''>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const { toast } = useToast();

  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setLessonId(quiz.lessonId);
    setQuestions([...quiz.questions]); // Make a copy to avoid direct state modification
  };

  const handleCreateQuiz = () => {
    if (lessonId === '' || questions.length === 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please select a lesson and add at least one question.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if a quiz already exists for this lesson
    if (quizzes.some(quiz => quiz.lessonId === lessonId)) {
      toast({
        title: "Quiz Already Exists",
        description: "A quiz for this lesson already exists. Please edit the existing quiz.",
        variant: "destructive",
      });
      return;
    }
    
    const newQuiz: Quiz = {
      id: quizzes.length > 0 ? Math.max(...quizzes.map(q => q.id)) + 1 : 1,
      lessonId: lessonId as number,
      questions: questions
    };
    
    setQuizzes([...quizzes, newQuiz]);
    resetForm();
    
    toast({
      title: "Quiz Created",
      description: `Quiz for ${lessons.find(l => l.id === lessonId)?.title} has been created successfully.`,
    });
  };

  const handleUpdateQuiz = () => {
    if (!selectedQuiz || lessonId === '' || questions.length === 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please select a lesson and add at least one question.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === selectedQuiz.id
        ? { 
            ...quiz, 
            lessonId: lessonId as number,
            questions: questions
          }
        : quiz
    );
    
    setQuizzes(updatedQuizzes);
    resetForm();
    
    toast({
      title: "Quiz Updated",
      description: `Quiz for ${lessons.find(l => l.id === lessonId)?.title} has been updated successfully.`,
    });
  };

  const handleDeleteQuiz = () => {
    if (!selectedQuiz) return;
    
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== selectedQuiz.id);
    setQuizzes(updatedQuizzes);
    resetForm();
    
    toast({
      title: "Quiz Deleted",
      description: `Quiz for ${lessons.find(l => l.id === selectedQuiz.lessonId)?.title} has been deleted.`,
    });
  };

  const resetForm = () => {
    setSelectedQuiz(null);
    setLessonId('');
    setQuestions([]);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1,
      question: "",
      options: ["", "", ""],
      correctAnswer: 0
    };
    
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (questionId: number, field: keyof Question, value: any) => {
    const updatedQuestions = questions.map(question => 
      question.id === questionId
        ? { ...question, [field]: value }
        : question
    );
    
    setQuestions(updatedQuestions);
  };

  const handleUpdateOption = (questionId: number, optionIndex: number, value: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (questionId: number) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionId: number) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return { ...question, options: [...question.options, ""] };
      }
      return question;
    });
    
    setQuestions(updatedQuestions);
  };

  const handleDeleteOption = (questionId: number, optionIndex: number) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedOptions = question.options.filter((_, index) => index !== optionIndex);
        
        // Adjust correctAnswer if needed
        let correctAnswer = question.correctAnswer;
        if (correctAnswer === optionIndex) {
          correctAnswer = 0;
        } else if (correctAnswer > optionIndex) {
          correctAnswer--;
        }
        
        return { ...question, options: updatedOptions, correctAnswer };
      }
      return question;
    });
    
    setQuestions(updatedQuestions);
  };

  // Filter lessons based on selected module
  const filteredLessons = filterModule
    ? lessons.filter(lesson => lesson.moduleId === filterModule)
    : lessons;

  // Filter quizzes based on filtered lessons
  const filteredQuizzes = filterModule
    ? quizzes.filter(quiz => filteredLessons.some(lesson => lesson.id === quiz.lessonId))
    : quizzes;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quiz Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quiz List</h2>
            <div className="w-48">
              <Select 
                value={filterModule?.toString() || "all"} 
                onValueChange={(value) => setFilterModule(value === "all" ? null : Number(value))}
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
            {filteredQuizzes.map(quiz => {
              const lessonTitle = lessons.find(l => l.id === quiz.lessonId)?.title || "Unknown Lesson";
              const moduleId = lessons.find(l => l.id === quiz.lessonId)?.moduleId;
              const moduleTitle = modules.find(m => m.id === moduleId)?.title || "Unknown Module";
              
              return (
                <Card 
                  key={quiz.id}
                  className={`cursor-pointer ${selectedQuiz?.id === quiz.id ? 'border-tech-primary' : ''}`}
                  onClick={() => handleSelectQuiz(quiz)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Quiz for: {lessonTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm text-muted-foreground">Module: {moduleTitle}</div>
                    <div className="mt-1 text-sm">{quiz.questions.length} questions</div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredQuizzes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No quizzes found with current filter.
              </div>
            )}
          </div>
          
          <Button 
            className="mt-4 w-full"
            variant="outline"
            onClick={resetForm}
          >
            Create New Quiz
          </Button>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedQuiz ? 'Edit Quiz' : 'Create New Quiz'}
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="lessonId" className="block text-sm font-medium mb-1">
                Lesson <span className="text-red-500">*</span>
              </label>
              <Select 
                value={lessonId?.toString() || ""} 
                onValueChange={(value) => setLessonId(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a lesson" />
                </SelectTrigger>
                <SelectContent>
                  {filteredLessons.map(lesson => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Questions</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddQuestion}
                  className="flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Question
                </Button>
              </div>
              
              {questions.length === 0 && (
                <div className="text-center py-8 border rounded-md">
                  <p className="text-muted-foreground">No questions yet.</p>
                  <Button 
                    variant="link" 
                    onClick={handleAddQuestion}
                    className="mt-2"
                  >
                    Add your first question
                  </Button>
                </div>
              )}
              
              <div className="space-y-6">
                {questions.map((question, qIndex) => (
                  <Card key={question.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    
                    <CardHeader className="pb-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Question {qIndex + 1}
                        </label>
                        <Input
                          value={question.question}
                          onChange={(e) => handleUpdateQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter your question"
                        />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Options
                        </label>
                        <div className="space-y-2">
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === index}
                                onChange={() => handleUpdateQuestion(question.id, 'correctAnswer', index)}
                                className="h-4 w-4"
                              />
                              <Input
                                value={option}
                                onChange={(e) => handleUpdateOption(question.id, index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1"
                              />
                              {question.options.length > 2 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteOption(question.id, index)}
                                  className="h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {question.options.length < 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddOption(question.id)}
                            className="mt-2"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Add Option
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              {selectedQuiz ? (
                <>
                  <Button onClick={handleUpdateQuiz} className="flex-1" disabled={questions.length === 0}>
                    Update Quiz
                  </Button>
                  <Button 
                    onClick={handleDeleteQuiz} 
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button onClick={handleCreateQuiz} className="flex-1" disabled={questions.length === 0}>
                  Create Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
