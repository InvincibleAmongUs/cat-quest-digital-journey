
import { LessonData } from './types';

// Lesson 1: Introduction to Computers
export const lesson1: LessonData = {
  id: 1,
  moduleId: 1,
  title: "Introduction to Computers",
  description: "Learn about basic computer concepts, data vs information, and ICT in daily life",
  hasQuiz: true,
  blocks: [
    {
      type: "heading",
      content: {
        text: "What is a Computer?",
        level: 2
      }
    },
    {
      type: "text",
      content: "A computer is an electronic device that processes data according to instructions stored in its memory. It accepts input, processes it, and provides output in a useful format."
    },
    {
      type: "image",
      content: {
        src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
        alt: "A modern computer workstation",
        caption: "A modern computer workstation"
      }
    },
    {
      type: "heading",
      content: {
        text: "Information Processing Cycle",
        level: 2
      }
    },
    {
      type: "text",
      content: "The information processing cycle consists of four main steps: input, processing, output, and storage."
    },
    {
      type: "image",
      content: {
        src: "ch1_figure_1_3_information_processing_cycle.png",
        alt: "Diagram showing the four steps of the information processing cycle"
      }
    },
    {
      type: "heading",
      content: {
        text: "Types of Computers",
        level: 2
      }
    },
    {
      type: "text",
      content: "There are several types of computers, classified by size, power, and purpose: Desktop Computers, Laptop Computers, Tablets, Smartphones, Servers, and Supercomputers."
    },
    {
      type: "image",
      content: {
        src: "ch1_figure_1_6_computer_types_collage.png",
        alt: "Collage showing different types of computers"
      }
    },
    {
      type: "heading",
      content: {
        text: "The Difference Between Data and Information",
        level: 2
      }
    },
    {
      type: "text",
      content: "Data refers to raw facts and figures that don't have any specific meaning on their own. Information is data that has been processed, organized, and presented in a way that makes it meaningful and useful for specific purposes."
    },
    {
      type: "text",
      content: "Example of data: 28, 10, 2023. Example of information: Your birthday is October 28, 2023."
    },
    {
      type: "heading",
      content: {
        text: "ICT in Daily Life",
        level: 2
      }
    },
    {
      type: "text",
      content: "Information and Communication Technology (ICT) plays an important role in our daily lives: Communication (email, messaging, video calls), Education (online learning, research), Entertainment (streaming, gaming), Business (office productivity, e-commerce), Healthcare (electronic records, telemedicine), Transportation (GPS navigation, traffic updates)."
    }
  ],
  quizQuestions: [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Utility"],
      correctAnswer: 0
    },
    {
      question: "Which of these is NOT a type of computer?",
      options: ["Desktop", "Laptop", "Dataphone"],
      correctAnswer: 2
    },
    {
      question: "What is the main purpose of computer storage?",
      options: ["To process data", "To save data for future use", "To display output"],
      correctAnswer: 1
    },
    {
      question: "Which of these is an example of data?",
      options: ["A summary report", "The number 42", "Your school report card"],
      correctAnswer: 1
    },
    {
      question: "What is the correct order of the information processing cycle?",
      options: ["Input → Processing → Output → Storage", "Processing → Input → Storage → Output", "Storage → Input → Processing → Output"],
      correctAnswer: 0
    },
    {
      question: "Which device is primarily used for input?",
      options: ["Monitor", "Printer", "Keyboard"],
      correctAnswer: 2
    },
    {
      question: "What would be considered information rather than data?",
      options: ["The numbers 75, 82, 90", "A list of student names", "Your Math average is 82%"],
      correctAnswer: 2
    },
    {
      question: "Which type of computer is designed to be carried around?",
      options: ["Desktop", "Server", "Laptop"],
      correctAnswer: 2
    },
    {
      question: "What does ICT stand for?",
      options: ["International Computer Technology", "Information and Communication Technology", "Integrated Computing Tools"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT an example of ICT in healthcare?",
      options: ["Electronic patient records", "Telemedicine consultations", "Manual paper filing systems"],
      correctAnswer: 2
    }
  ]
};
