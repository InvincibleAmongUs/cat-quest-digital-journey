
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';

export interface LessonData {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  blocks: AnyContentBlock[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  hasQuiz: boolean;
}

export const term1Lessons: LessonData[] = [
  // Lesson 1: Introduction to Computers
  {
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
  },

  // Lesson 2: Computer Management & File Organisation
  {
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
  },

  // Lesson 3: Hardware Components - The Building Blocks
  {
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
  },

  // Lesson 4: Software Essentials
  {
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
  },

  // Lesson 5: Digital Well-being & The Economy of Computing
  {
    id: 5,
    moduleId: 1,
    title: "Digital Well-being & The Economy of Computing",
    description: "Explore social implications of technology, digital well-being, and economic aspects",
    hasQuiz: true,
    blocks: [
      {
        type: "heading",
        content: {
          text: "Social Implications of Technology",
          level: 2
        }
      },
      {
        type: "text",
        content: "Technology has profoundly changed how we live, work, and interact. While it brings many benefits, it also introduces challenges and ethical considerations that we must address."
      },
      {
        type: "heading",
        content: {
          text: "Digital Well-being",
          level: 2
        }
      },
      {
        type: "text",
        content: "Digital well-being refers to the impact of technology on a person's mental, physical, social, and emotional health. Being mindful of how we use technology is essential for maintaining good health and relationships."
      },
      {
        type: "heading",
        content: {
          text: "Screen Time and Health",
          level: 3
        }
      },
      {
        type: "text",
        content: "Excessive screen time can lead to physical issues like eye strain, headaches, and poor posture. It can also affect sleep patterns when screens are used before bedtime due to the blue light emitted by devices."
      },
      {
        type: "text",
        content: "Tips for healthy screen use: Follow the 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds), maintain proper posture, take regular breaks, and limit screen time before bed."
      },
      {
        type: "heading",
        content: {
          text: "Digital Addiction",
          level: 3
        }
      },
      {
        type: "text",
        content: "Digital addiction occurs when the use of technology interferes with daily life. Signs include anxiety when unable to use devices, neglecting responsibilities, and using technology to escape problems."
      },
      {
        type: "text",
        content: "Managing digital habits: Set specific times for using technology, use apps that monitor screen time, create tech-free zones (e.g., bedroom), and engage in offline activities."
      },
      {
        type: "heading",
        content: {
          text: "Social Media and Mental Health",
          level: 3
        }
      },
      {
        type: "text",
        content: "Social media can affect mental health through comparison with others, cyberbullying, FOMO (Fear Of Missing Out), and reduced face-to-face interactions."
      },
      {
        type: "text",
        content: "Healthy social media use: Be mindful of time spent on platforms, remember that people often show only the best parts of their lives, follow accounts that make you feel good, and regularly disconnect."
      },
      {
        type: "heading",
        content: {
          text: "Economic Aspects of Computing",
          level: 2
        }
      },
      {
        type: "heading",
        content: {
          text: "Cost of Computing",
          level: 3
        }
      },
      {
        type: "text",
        content: "Computing costs include: Hardware (devices, peripherals), Software (applications, subscriptions), Maintenance (repairs, upgrades), and Services (internet, cloud storage)."
      },
      {
        type: "text",
        content: "When purchasing a computer, consider: Purpose (what you'll use it for), Performance needs, Upgradeability, Warranty, and Total cost of ownership (including maintenance and accessories)."
      },
      {
        type: "heading",
        content: {
          text: "Free vs. Paid Software",
          level: 3
        }
      },
      {
        type: "text",
        content: "When deciding between free and paid software, consider: Features (paid often offers more), Support (paid typically provides better support), Updates (paid usually receives more frequent updates), and Security (paid may have better protection)."
      },
      {
        type: "heading",
        content: {
          text: "Digital Divide",
          level: 2
        }
      },
      {
        type: "text",
        content: "The digital divide refers to the gap between those who have access to technology and the internet and those who do not. This divide can be based on factors such as income, geography, age, and education."
      },
      {
        type: "text",
        content: "Impacts of the digital divide: Limited access to information, fewer educational opportunities, reduced job prospects, and decreased civic participation."
      },
      {
        type: "text",
        content: "Addressing the digital divide: Infrastructure development in underserved areas, subsidized devices and internet access for low-income households, digital literacy programs, and public access points (libraries, community centers)."
      },
      {
        type: "heading",
        content: {
          text: "Environmental Impact",
          level: 2
        }
      },
      {
        type: "text",
        content: "Technology has environmental impacts through: Energy consumption, E-waste (discarded electronic devices), Resources used in manufacturing, and Carbon footprint of data centers."
      },
      {
        type: "text",
        content: "Reducing the environmental impact: Extend device lifespan through maintenance and upgrades, properly recycle electronic waste, use energy-efficient devices, and power down devices when not in use."
      },
      {
        type: "heading",
        content: {
          text: "Ethics in Computing",
          level: 2
        }
      },
      {
        type: "text",
        content: "Ethical issues in computing include: Privacy concerns (data collection and surveillance), Intellectual property (copyright infringement), Access to technology (equality and inclusion), Artificial intelligence (bias and job displacement), and Cybersecurity (hacking and protection of sensitive information)."
      },
      {
        type: "text",
        content: "Being a responsible digital citizen means: Respecting others online, protecting personal information, thinking critically about online content, acknowledging sources, and using technology in ways that don't harm others."
      }
    ],
    quizQuestions: [
      {
        question: "What is digital well-being?",
        options: ["Using technology to improve physical health", "The impact of technology on mental, physical, social, and emotional health", "A type of health insurance for technology users"],
        correctAnswer: 1
      },
      {
        question: "What is the 20-20-20 rule for screen time?",
        options: ["Using screens for 20 minutes, 20 times a day, with 20-second breaks", "Every 20 minutes, look at something 20 feet away for 20 seconds", "Limiting screen time to 20 hours per week"],
        correctAnswer: 1
      },
      {
        question: "What is FOMO in the context of social media?",
        options: ["Filtering Of Media Online", "Fear Of Missing Out", "Focus On Multiple Objectives"],
        correctAnswer: 1
      },
      {
        question: "Which of these is NOT typically included in computing costs?",
        options: ["Hardware", "Software", "Furniture"],
        correctAnswer: 2
      },
      {
        question: "What is the digital divide?",
        options: ["The gap between those who have access to technology and those who don't", "The difference between digital and analog technologies", "The separation between work and personal devices"],
        correctAnswer: 0
      },
      {
        question: "Which of these is an example of e-waste?",
        options: ["Paper documents", "Discarded computers", "Plastic packaging"],
        correctAnswer: 1
      },
      {
        question: "What does being a responsible digital citizen include?",
        options: ["Using as much bandwidth as possible", "Sharing other people's personal information", "Respecting others online"],
        correctAnswer: 2
      },
      {
        question: "Which of these is a sign of digital addiction?",
        options: ["Using technology for work", "Anxiety when unable to use devices", "Having multiple devices"],
        correctAnswer: 1
      },
      {
        question: "What should you consider when deciding between free and paid software?",
        options: ["Only the initial cost", "Features, support, updates, and security", "Only what your friends are using"],
        correctAnswer: 1
      },
      {
        question: "How can the environmental impact of technology be reduced?",
        options: ["Buying new devices frequently", "Properly recycling electronic waste", "Always keeping devices plugged in"],
        correctAnswer: 1
      }
    ]
  }
];
