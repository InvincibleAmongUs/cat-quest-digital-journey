
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
        src: "ch1_figure_1_5_computer_hardware_desktop.png",
        alt: "Desktop computer hardware components"
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
        src: "ch6_table_6_9_ram_rom.png",
        alt: "Table comparing RAM and ROM memory"
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
        src: "ch5_table_5_6_common_storage_devices.png",
        alt: "Table showing common storage devices"
      }
    },
    {
      type: "heading",
      content: {
        text: "Storage Capacity",
        level: 3
      }
    },
    {
      type: "text",
      content: "Storage capacity is measured in bytes: Kilobyte (KB) = 1,024 bytes, Megabyte (MB) = 1,024 KB, Gigabyte (GB) = 1,024 MB, Terabyte (TB) = 1,024 GB."
    },
    {
      type: "image",
      content: {
        src: "ch5_table_5_5_measuring_capacity.png",
        alt: "Table showing storage capacity measurements"
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
        src: "ch5_table_5_2_keyboard_types.png",
        alt: "Table showing different types of keyboards"
      }
    },
    {
      type: "image",
      content: {
        src: "ch5_table_5_3_mice_types.png",
        alt: "Table showing different types of mice"
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
        src: "ch5_table_5_4_printer_comparison.png",
        alt: "Table comparing different types of printers"
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
        src: "ch5_table_5_1_ports_connectors.png",
        alt: "Table showing different ports and connectors"
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
