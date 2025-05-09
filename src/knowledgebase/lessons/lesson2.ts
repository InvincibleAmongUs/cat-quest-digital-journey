
import { LessonData } from './types';

// Lesson 2: Computer Management & File Organisation
export const lesson2: LessonData = {
  id: 2,
  moduleId: 1,
  title: "Computer Management & File Organisation",
  description: "Learn about computer interfaces, file organization, and basic operations",
  hasQuiz: true,
  blocks: [
    {
      type: "heading",
      content: {
        text: "Computer Interfaces",
        level: 2
      }
    },
    {
      type: "text",
      content: "The computer interface is how you interact with your computer. The Graphical User Interface (GUI) uses visual elements like icons, menus, and windows to make computers easier to use."
    },
    {
      type: "image",
      content: {
        src: "ch2_figure_2_4_os_interface_example.jpg",
        alt: "Example of an operating system interface"
      }
    },
    {
      type: "heading",
      content: {
        text: "Desktop Components",
        level: 2
      }
    },
    {
      type: "text",
      content: "The desktop is your main workspace in a GUI. Key components include the desktop background (wallpaper), icons, taskbar, start menu, and system tray."
    },
    {
      type: "image",
      content: {
        src: "ch2_figure_2_7_desktop_components.png",
        alt: "Main components of a desktop interface"
      }
    },
    {
      type: "heading",
      content: {
        text: "Managing Files and Folders",
        level: 2
      }
    },
    {
      type: "text",
      content: "File management is organizing and keeping track of files and folders on your computer. Good file management helps you find your files quickly and keeps your computer organized."
    },
    {
      type: "text",
      content: "A file is a collection of data stored as a single unit with a name. A folder (also called a directory) is a container for storing files and other folders."
    },
    {
      type: "heading",
      content: {
        text: "Basic File Operations",
        level: 3
      }
    },
    {
      type: "text",
      content: "Common file operations include creating, opening, saving, renaming, copying, moving, and deleting files."
    },
    {
      type: "image",
      content: {
        src: "ch3_table_3_1_rename_files.png",
        alt: "Table showing how to rename files"
      }
    },
    {
      type: "image",
      content: {
        src: "ch3_table_3_2_copy_paste_files.png",
        alt: "Table showing how to copy and paste files"
      }
    },
    {
      type: "heading",
      content: {
        text: "File Paths",
        level: 3
      }
    },
    {
      type: "text",
      content: "A file path is the location of a file in a computer's file system. It shows the hierarchy of folders leading to the file. For example: C:\\Users\\Student\\Documents\\Assignments\\CAT\\Term1.docx"
    },
    {
      type: "heading",
      content: {
        text: "Input Devices",
        level: 2
      }
    },
    {
      type: "text",
      content: "Input devices allow users to enter data into a computer. Common input devices include keyboards, mice, touchpads, and touchscreens."
    },
    {
      type: "image",
      content: {
        src: "ch2_figure_2_3_qwerty_keyboard.jpg",
        alt: "Standard QWERTY keyboard layout"
      }
    },
    {
      type: "text",
      content: "The mouse is a pointing device used to interact with elements on the screen. It usually has two buttons (left and right) and a scroll wheel."
    },
    {
      type: "image",
      content: {
        src: "ch2_figure_2_1_mouse_parts.png",
        alt: "Parts of a computer mouse"
      }
    }
  ],
  quizQuestions: [
    {
      question: "What is a GUI?",
      options: ["General User Interface", "Graphical User Interface", "Global User Integration"],
      correctAnswer: 1
    },
    {
      question: "Which part of the desktop shows running applications?",
      options: ["System tray", "Taskbar", "Start menu"],
      correctAnswer: 1
    },
    {
      question: "What is a file path?",
      options: ["A way to delete files", "The location of a file in the computer's file system", "A type of input device"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a basic file operation?",
      options: ["Copying", "Processing", "Renaming"],
      correctAnswer: 1
    },
    {
      question: "What is the difference between a file and a folder?",
      options: ["A file contains data while a folder contains files and other folders", "A folder contains data while a file contains folders", "There is no difference"],
      correctAnswer: 0
    },
    {
      question: "Which key combination is commonly used to copy selected items?",
      options: ["Ctrl+X", "Ctrl+C", "Ctrl+V"],
      correctAnswer: 1
    },
    {
      question: "Where are deleted files typically sent in Windows?",
      options: ["Recycle Bin", "Trash Can", "Delete Folder"],
      correctAnswer: 0
    },
    {
      question: "Which input device is primarily used for pointing and selecting objects on screen?",
      options: ["Keyboard", "Mouse", "Scanner"],
      correctAnswer: 1
    },
    {
      question: "What does the file extension .docx represent?",
      options: ["A spreadsheet file", "A presentation file", "A word processing document"],
      correctAnswer: 2
    },
    {
      question: "What is the standard keyboard layout used in most English-speaking countries?",
      options: ["AZERTY", "QWERTY", "DVORAK"],
      correctAnswer: 1
    }
  ]
};
