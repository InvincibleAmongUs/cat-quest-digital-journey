
```markdown
# KB_Code_Dump_Src_Lessons_Content.md - Source Code (src/knowledgebase/lessons/)

This file contains the source code for lesson definition files within `src/knowledgebase/lessons/`.

### src/knowledgebase/lessons/types.ts
```typescript
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer'; // Ensure this path and export are correct

export interface LessonData {
  id: number;
  moduleId: number; // Or string, ensure consistency
  title: string;
  description: string;
  blocks: AnyContentBlock[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
  }[];
  hasQuiz: boolean;
}
```

### src/knowledgebase/lessons/index.ts
```typescript
import { LessonData } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5'; // Assuming lesson5.ts exists and is similar

// Export all term 1 lessons as an array
// This structure assumes all these lessons are for Term 1 / Module 1
// Consider organizing by terms/modules if the structure grows
export const term1Lessons: LessonData[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5
];

// Export individual lessons for direct access if needed
export {
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5
};

// Could also export a map for easier lookup by ID
export const lessonsMap: Record<string | number, LessonData> = {
  '1': lesson1,
  '2': lesson2,
  '3': lesson3,
  '4': lesson4,
  '5': lesson5,
};
```

### src/knowledgebase/lessons/lesson1.ts
```typescript
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
        src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", // External image
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
        src: "/src/utils/images/ch1_figure_1_3_information_processing_cycle.png", // Local image, ensure path is correct for Vite
        alt: "Diagram showing the four steps of the information processing cycle",
        caption: "Figure 1.3: Information Processing Cycle"
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
        src: "/src/utils/images/ch1_figure_1_6_computer_types_collage.png", // Local image
        alt: "Collage showing different types of computers",
        caption: "Figure 1.6: Various Types of Computers"
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
```

### src/knowledgebase/lessons/lesson2.ts
```typescript
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
        src: "/src/utils/images/ch2_figure_2_4_os_interface_example.jpg", // Local image
        alt: "Example of an operating system interface",
        caption: "Figure 2.4: Example of an OS Interface (Windows)"
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
        src: "/src/utils/images/ch2_figure_2_7_desktop_components.png", // Local image
        alt: "Main components of a desktop interface",
        caption: "Figure 2.7: Common Desktop Components"
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
      type: "image", // Consider if this should be 'table' type if it's tabular data
      content: {
        src: "/src/utils/images/ch3_table_3_1_rename_files.png", // Local image
        alt: "Table showing how to rename files",
        caption: "Table 3.1: Renaming Files",
        isTable: true // Hint that this image represents a table
      }
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch3_table_3_2_copy_paste_files.png", // Local image
        alt: "Table showing how to copy and paste files",
        caption: "Table 3.2: Copying and Pasting Files",
        isTable: true
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
        text: "Input Devices", // This might belong better in Lesson 3 (Hardware)
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
        src: "/src/utils/images/ch2_figure_2_3_qwerty_keyboard.jpg", // Local image
        alt: "Standard QWERTY keyboard layout",
        caption: "Figure 2.3: QWERTY Keyboard Layout"
      }
    },
    {
      type: "text",
      content: "The mouse is a pointing device used to interact with elements on the screen. It usually has two buttons (left and right) and a scroll wheel."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch2_figure_2_1_mouse_parts.png", // Local image
        alt: "Parts of a computer mouse",
        caption: "Figure 2.1: Parts of a Mouse"
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
      correctAnswer: 1 // "Processing" is not a file operation in this context
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
```

### src/knowledgebase/lessons/lesson3.ts
```typescript
import { LessonData } from './types';

// Lesson 3: Hardware Components - The Building Blocks
export const lesson3: LessonData = {
  id: 3,
  moduleId: 1,
  title: "Hardware Components - The Building Blocks",
  description: "Learn about the essential hardware components that make up a computer system",
  hasQuiz: true,
  blocks: [
    {
      type: "heading",
      content: {
        text: "What is Hardware?",
        level: 2
      }
    },
    {
      type: "text",
      content: "Hardware refers to the physical parts of a computer that you can see and touch. These components work together to process data and execute instructions."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch1_figure_1_5_computer_hardware_desktop.png", // Local image
        alt: "Desktop computer hardware components",
        caption: "Figure 1.5: Desktop Computer Hardware"
      }
    },
    {
      type: "heading",
      content: {
        text: "Main Hardware Components",
        level: 2
      }
    },
    {
      type: "heading",
      content: {
        text: "1. Central Processing Unit (CPU)",
        level: 3
      }
    },
    {
      type: "text",
      content: "The CPU is the 'brain' of the computer. It performs most of the processing inside the computer, executing instructions and performing calculations. The speed of a CPU is measured in gigahertz (GHz)."
    },
    {
      type: "heading",
      content: {
        text: "2. Memory (RAM)",
        level: 3
      }
    },
    {
      type: "text",
      content: "Random Access Memory (RAM) is the computer's short-term memory. It temporarily stores data that the CPU is actively using. More RAM allows for smoother multitasking. RAM is volatile, meaning its contents are lost when the computer is powered off."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch6_table_6_9_ram_rom.png", // Local image
        alt: "Table comparing RAM and ROM memory",
        caption: "Table 6.9: Comparison of RAM and ROM",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "3. Storage Devices",
        level: 3
      }
    },
    {
      type: "text",
      content: "Storage devices provide permanent data storage even when the computer is turned off. Common storage devices include hard disk drives (HDD), solid-state drives (SSD), and external storage devices like USB flash drives."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_6_common_storage_devices.png", // Local image
        alt: "Table showing common storage devices",
        caption: "Table 5.6: Common Storage Devices",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "Storage Capacity",
        level: 3 // This should be under Storage Devices
      }
    },
    {
      type: "text",
      content: "Storage capacity is measured in bytes: Kilobyte (KB) = 1,024 bytes, Megabyte (MB) = 1,024 KB, Gigabyte (GB) = 1,024 MB, Terabyte (TB) = 1,024 GB."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_5_measuring_capacity.png", // Local image
        alt: "Table showing storage capacity measurements",
        caption: "Table 5.5: Measuring Storage Capacity",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "4. Input Devices",
        level: 3
      }
    },
    {
      type: "text",
      content: "Input devices allow users to enter data and instructions into a computer. Common input devices include keyboards, mice, scanners, webcams, and microphones."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_2_keyboard_types.png", // Local image
        alt: "Table showing different types of keyboards",
        caption: "Table 5.2: Types of Keyboards",
        isTable: true
      }
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_3_mice_types.png", // Local image
        alt: "Table showing different types of mice",
        caption: "Table 5.3: Types of Mice",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "5. Output Devices",
        level: 3
      }
    },
    {
      type: "text",
      content: "Output devices present processed data to the user. Common output devices include monitors, printers, speakers, and headphones."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_4_printer_comparison.png", // Local image
        alt: "Table comparing different types of printers",
        caption: "Table 5.4: Printer Comparison",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "6. Ports and Connectors",
        level: 3
      }
    },
    {
      type: "text",
      content: "Ports and connectors allow you to connect external devices to your computer. Common ports include USB, HDMI, audio jacks, and Ethernet ports."
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch5_table_5_1_ports_connectors.png", // Local image
        alt: "Table showing different ports and connectors",
        caption: "Table 5.1: Common Ports and Connectors",
        isTable: true
      }
    }
  ],
  quizQuestions: [
    {
      question: "What is the 'brain' of the computer?",
      options: ["RAM", "CPU", "HDD"],
      correctAnswer: 1
    },
    {
      question: "What does RAM stand for?",
      options: ["Random Access Memory", "Read-Only Access Module", "Remote Access Management"],
      correctAnswer: 0
    },
    {
      question: "Which storage device generally offers the fastest data access speeds?",
      options: ["Hard Disk Drive (HDD)", "DVD Drive", "Solid State Drive (SSD)"],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT an input device?",
      options: ["Keyboard", "Microphone", "Speaker"],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT an output device?",
      options: ["Monitor", "Scanner", "Printer"],
      correctAnswer: 1
    },
    {
      question: "How many bytes are in one kilobyte?",
      options: ["100 bytes", "1,000 bytes", "1,024 bytes"],
      correctAnswer: 2
    },
    {
      question: "What type of memory loses its contents when the computer is powered off?",
      options: ["ROM", "RAM", "Hard drive"],
      correctAnswer: 1
    },
    {
      question: "Which port is most commonly used to connect modern displays to computers?",
      options: ["VGA", "HDMI", "USB"],
      correctAnswer: 1
    },
    {
      question: "What is the function of a GPU in a computer system?",
      options: ["Stores permanent data", "Processes graphics and video data", "Manages network connections"],
      correctAnswer: 1
    },
    {
      question: "Which of these storage devices is typically capable of storing the most data?",
      options: ["USB flash drive", "External hard drive", "SD card"],
      correctAnswer: 1
    }
  ]
};
```

### src/knowledgebase/lessons/lesson4.ts
```typescript
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
        src: "/src/utils/images/ch7_table_7_2_system_software_examples.png", // Local image
        alt: "Examples of system software",
        caption: "Table 7.2: Examples of System Software",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "Operating Systems",
        level: 3 // Should be under System Software
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
        src: "/src/utils/images/ch7_table_7_1_app_software_examples.png", // Local image
        alt: "Examples of application software",
        caption: "Table 7.1: Examples of Application Software",
        isTable: true
      }
    },
    {
      type: "heading",
      content: {
        text: "Productivity Software",
        level: 3 // Should be under Application Software
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
        level: 3 // Should be under Application Software
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
        src: "/src/utils/images/ch7_table_7_4_navigational_components.png", // Local image
        alt: "Table showing navigational user interface components",
        caption: "Table 7.4: Navigational UI Components",
        isTable: true
      }
    },
    {
      type: "image",
      content: {
        src: "/src/utils/images/ch7_table_7_5_informational_components.png", // Local image
        alt: "Table showing informational user interface components",
        caption: "Table 7.5: Informational UI Components",
        isTable: true
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
```

### src/knowledgebase/lessons/lesson5.ts
```typescript
import { LessonData } from './types';

// Lesson 5: Introduction to Networks (Placeholder Content)
export const lesson5: LessonData = {
  id: 5,
  moduleId: 1, // Assuming it's part of Module 1
  title: "Introduction to Networks",
  description: "Learn about basic networking concepts, types of networks, and network hardware.",
  hasQuiz: true,
  blocks: [
    {
      type: "heading",
      content: {
        text: "What is a Network?",
        level: 2
      }
    },
    {
      type: "text",
      content: "A computer network is a group of two or more interconnected computer systems that can communicate and share resources such as files, printers, and internet connections. Networks allow for efficient data transfer and collaboration."
    },
    {
      type: "image",
      content: {
        // Placeholder image - replace with an actual relevant image if available
        src: "https://images.unsplash.com/photo-1585144570941-15৪fd02f603?auto=format&fit=crop&w=800&q=80",
        alt: "Diagram of a simple computer network",
        caption: "A simple network connecting computers and a printer."
      }
    },
    {
      type: "heading",
      content: {
        text: "Types of Networks",
        level: 2
      }
    },
    {
      type: "text",
      content: "Networks are classified based on their size, geographical area, and purpose. Common types include:\n- **LAN (Local Area Network):** Covers a small area like a home, office, or school.\n- **WAN (Wide Area Network):** Spans a large geographical area, often connecting multiple LANs (e.g., the Internet).\n- **MAN (Metropolitan Area Network):** Covers a city or a large campus.\n- **PAN (Personal Area Network):** Connects devices for an individual person (e.g., Bluetooth connections)."
    },
    {
      type: "heading",
      content: {
        text: "Network Hardware",
        level: 2
      }
    },
    {
      type: "text",
      content: "Several hardware components are essential for a network to function:\n- **Router:** Directs data packets between different networks.\n- **Switch:** Connects devices within a single network (LAN) and forwards data to the correct device.\n- **Modem:** Modulates and demodulates signals to connect a LAN to an Internet Service Provider (ISP).\n- **Network Interface Card (NIC):** Allows a computer to connect to a network.\n- **Cables & Connectors:** Physical media for data transmission (e.g., Ethernet cables, fiber optic cables)."
    },
     {
      type: "image",
      content: {
        // Placeholder image - replace with an actual relevant image if available
        src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80",
        alt: "Various network hardware components",
        caption: "Examples of network hardware like routers and switches."
      }
    },
    {
      type: "heading",
      content: {
        text: "Internet and WWW",
        level: 2
      }
    },
    {
      type: "text",
      content: "The Internet is a global WAN connecting millions of networks. The World Wide Web (WWW or Web) is a system of interlinked hypertext documents accessed via the Internet, using web browsers."
    }
  ],
  quizQuestions: [
    {
      question: "What does LAN stand for?",
      options: ["Large Area Network", "Local Access Network", "Local Area Network"],
      correctAnswer: 2
    },
    {
      question: "Which device connects a LAN to an Internet Service Provider (ISP)?",
      options: ["Switch", "Router", "Modem"],
      correctAnswer: 2
    },
    {
      question: "The Internet is an example of which type of network?",
      options: ["LAN", "WAN", "PAN"],
      correctAnswer: 1
    },
    {
      question: "What is the primary function of a router in a network?",
      options: ["Connect devices within a single LAN", "Direct data packets between different networks", "Convert digital signals to analog signals"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a common type of network hardware?",
      options: ["CPU", "Switch", "NIC"],
      correctAnswer: 0
    }
    // Add more questions as needed
  ]
};
```
