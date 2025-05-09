
import { LessonData } from './types';

// Lesson 4: Software Essentials
export const lesson4: LessonData = {
  id: 4,
  moduleId: 1,
  title: "Software Essentials",
  description: "Learn about different types of software and their applications",
  hasQuiz: true,
  blocks: [
    {
      type: "heading",
      content: {
        text: "What is Software?",
        level: 2
      }
    },
    {
      type: "text",
      content: "Software refers to programs and other operating information used by a computer. Unlike hardware, software cannot be physically touched. Software tells the hardware what to do and how to perform various tasks."
    },
    {
      type: "heading",
      content: {
        text: "Types of Software",
        level: 2
      }
    },
    {
      type: "heading",
      content: {
        text: "1. System Software",
        level: 3
      }
    },
    {
      type: "text",
      content: "System software manages and controls the computer hardware and provides a platform for running application software. The most important type of system software is the operating system."
    },
    {
      type: "image",
      content: {
        src: "ch7_table_7_2_system_software_examples.png",
        alt: "Examples of system software"
      }
    },
    {
      type: "heading",
      content: {
        text: "Operating Systems",
        level: 3
      }
    },
    {
      type: "text",
      content: "An operating system (OS) is the most important software on a computer. It manages the computer's memory, processes, and all of its software and hardware. Common operating systems include Microsoft Windows, macOS, and Linux."
    },
    {
      type: "text",
      content: "Functions of an operating system include: File management, Memory management, Process management, Device management, User interface provision, and Security management."
    },
    {
      type: "heading",
      content: {
        text: "2. Application Software",
        level: 3
      }
    },
    {
      type: "text",
      content: "Application software is designed to perform specific tasks for users. Examples include word processors, spreadsheets, web browsers, games, and media players."
    },
    {
      type: "image",
      content: {
        src: "ch7_table_7_1_app_software_examples.png",
        alt: "Examples of application software"
      }
    },
    {
      type: "heading",
      content: {
        text: "Productivity Software",
        level: 3
      }
    },
    {
      type: "text",
      content: "Productivity software helps users create and edit documents, presentations, and data. Common examples include: Word processing software (e.g., Microsoft Word), Spreadsheet software (e.g., Microsoft Excel), Presentation software (e.g., Microsoft PowerPoint), and Database software (e.g., Microsoft Access)."
    },
    {
      type: "heading",
      content: {
        text: "Web Browsers",
        level: 3
      }
    },
    {
      type: "text",
      content: "Web browsers are software applications that allow users to access and view websites on the internet. Common web browsers include Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge."
    },
    {
      type: "heading",
      content: {
        text: "Software Licensing",
        level: 2
      }
    },
    {
      type: "text",
      content: "Software licensing refers to the legal agreement between the software developer and the user about how the software can be used. Common types include:"
    },
    {
      type: "text",
      content: "Proprietary software: Requires payment and has usage restrictions (e.g., Microsoft Office)."
    },
    {
      type: "text",
      content: "Free software: Can be used, copied, studied, and modified without restriction."
    },
    {
      type: "text",
      content: "Open-source software: Source code is available for modification (e.g., Linux, Mozilla Firefox)."
    },
    {
      type: "text",
      content: "Shareware: Free to try but requires payment after a trial period."
    },
    {
      type: "text",
      content: "Freeware: Free to use but the source code is not available for modification."
    },
    {
      type: "heading",
      content: {
        text: "User Interface Components",
        level: 2
      }
    },
    {
      type: "text",
      content: "User interfaces allow users to interact with software. Common components include:"
    },
    {
      type: "image",
      content: {
        src: "ch7_table_7_4_navigational_components.png",
        alt: "Table showing navigational user interface components"
      }
    },
    {
      type: "image",
      content: {
        src: "ch7_table_7_5_informational_components.png",
        alt: "Table showing informational user interface components"
      }
    }
  ],
  quizQuestions: [
    {
      question: "What is software?",
      options: ["Physical components you can touch", "Programs and operating information used by a computer", "Storage devices for digital data"],
      correctAnswer: 1
    },
    {
      question: "Which of the following is an operating system?",
      options: ["Microsoft Word", "Adobe Photoshop", "Microsoft Windows"],
      correctAnswer: 2
    },
    {
      question: "What is the primary function of an operating system?",
      options: ["To create documents", "To manage the computer's hardware and software resources", "To browse the internet"],
      correctAnswer: 1
    },
    {
      question: "Which of these is application software?",
      options: ["Windows 10", "Google Chrome", "Device drivers"],
      correctAnswer: 1
    },
    {
      question: "What is productivity software?",
      options: ["Software that helps you relax", "Software that manages your computer's performance", "Software that helps you create and edit documents, presentations, and data"],
      correctAnswer: 2
    },
    {
      question: "What type of software license allows users to modify the source code?",
      options: ["Proprietary", "Open-source", "Shareware"],
      correctAnswer: 1
    },
    {
      question: "Which of the following is NOT a web browser?",
      options: ["Google Chrome", "Microsoft PowerPoint", "Mozilla Firefox"],
      correctAnswer: 1
    },
    {
      question: "What is freeware?",
      options: ["Software that is free to use but the source code is not available", "Software that requires payment after a trial period", "Software that can be freely modified"],
      correctAnswer: 0
    },
    {
      question: "Which of these is an example of system software?",
      options: ["Microsoft Excel", "Device drivers", "Adobe Photoshop"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of a user interface?",
      options: ["To make the computer faster", "To allow users to interact with software", "To prevent viruses"],
      correctAnswer: 1
    }
  ]
};
