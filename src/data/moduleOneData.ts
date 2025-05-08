
import { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';

export interface ModuleLesson {
  id: string;
  title: string;
  content: string;
  quizId: string | null;
  nextLessonId: string | null;
  prevLessonId: string | null;
  moduleId: string;
}

export interface LessonContent {
  id: string;
  title: string;
  blocks: AnyContentBlock[];
  quizQuestions: {
    question: string;
    options: string[];
    correctOptionIndex: number;
  }[];
}

// Lesson 1.1: What is ICT and Why Does it Matter?
const lesson1_1: LessonContent = {
  id: "1-1",
  title: "What is ICT and Why Does it Matter?",
  blocks: [
    {
      type: "heading",
      content: {
        text: "What is ICT?",
        level: 2
      }
    },
    {
      type: "text",
      content: "ICT stands for Information and Communication Technology. It refers to technologies that provide access to information through telecommunications. This includes the internet, wireless networks, cell phones, computers, software, and other applications."
    },
    {
      type: "text",
      content: "ICT is more than just computers - it encompasses all devices, networking components, applications and systems that allow people and organizations to interact in the digital world."
    },
    {
      type: "heading",
      content: {
        text: "Components of an ICT System",
        level: 2
      }
    },
    {
      type: "text",
      content: "An ICT system consists of five main components:"
    },
    {
      type: "text",
      content: "1. Hardware: The physical parts of the system that you can touch (computers, printers, scanners).\n2. Software: Programs that tell the hardware what to do.\n3. Data: Raw facts and figures that are processed by the system.\n4. People: Users who interact with and operate the system.\n5. Communication: Networks that allow components to share information."
    },
    {
      type: "heading",
      content: {
        text: "Everyday Example: Point of Sale (POS) System",
        level: 2
      }
    },
    {
      type: "text",
      content: "Let's look at a Point of Sale (POS) system as an example of ICT in everyday life:"
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_1_barcode_example.png",
        alt: "Barcode example",
        caption: "Figure 1.1: A barcode containing product information"
      }
    },
    {
      type: "text",
      content: "When a cashier scans a product's barcode (INPUT), the computer processes the information by looking up the product in a database. It calculates the price and adds it to your total (PROCESSING). Then it displays the price on a screen and prints a receipt (OUTPUT)."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_2_cash_register_receipt.png",
        alt: "Cash register receipt",
        caption: "Figure 1.2: A cash register receipt showing processed transaction data"
      }
    },
    {
      type: "text",
      content: "The POS system also stores information about the transaction (STORAGE) and may communicate with a central system to update inventory (COMMUNICATION)."
    },
    {
      type: "heading",
      content: {
        text: "Why ICT Matters",
        level: 2
      }
    },
    {
      type: "text",
      content: "ICT has transformed nearly every aspect of modern life. It affects how we work, learn, shop, bank, travel, communicate, and entertain ourselves. Understanding ICT is essential because:"
    },
    {
      type: "text",
      content: "• It provides access to information and services\n• It enables faster and more efficient communication\n• It creates new job opportunities and career paths\n• It improves productivity in business and education\n• It helps solve complex problems in science, healthcare, and other fields"
    }
  ],
  quizQuestions: [
    {
      question: "What does ICT stand for?",
      options: [
        "Internet Computing Technology",
        "Information and Communication Technology",
        "Integrated Computer Tools",
        "International Computing Terminology"
      ],
      correctOptionIndex: 1
    },
    {
      question: "What are the five main components of an ICT system?",
      options: [
        "Hardware, Software, Data, People, Communication",
        "Hardware, Programs, Information, Users, Networks",
        "Devices, Applications, Files, Operators, Internet",
        "Computers, Programs, Storage, Users, Cables"
      ],
      correctOptionIndex: 0
    },
    {
      question: "In a Point of Sale (POS) system, what is an example of INPUT?",
      options: [
        "The receipt that is printed",
        "The price displayed on the screen",
        "Scanning the product barcode",
        "Calculating the total price"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which of these is NOT typically part of an ICT system?",
      options: [
        "Hardware",
        "Software",
        "Furniture",
        "Data"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which component of an ICT system refers to programs that tell the hardware what to do?",
      options: [
        "Hardware",
        "Software",
        "Data",
        "People"
      ],
      correctOptionIndex: 1
    }
  ]
};

// Lesson 1.2: Data, Information, and the GIGO Principle
const lesson1_2: LessonContent = {
  id: "1-2",
  title: "Data, Information, and the GIGO Principle",
  blocks: [
    {
      type: "heading",
      content: {
        text: "Data vs. Information",
        level: 2
      }
    },
    {
      type: "text",
      content: "Data is raw, unprocessed facts and figures that don't have any specific meaning on their own. Information is data that has been processed, organized, and presented in a way that makes it meaningful and useful."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_table_1_1_learner_test_data.png",
        alt: "Raw test data table",
        caption: "Table 1.1: Raw, unprocessed test data (Data)"
      }
    },
    {
      type: "text",
      content: "The table above shows raw data from a mathematics test. From this table, can you easily tell who the top student is? It's difficult because the data isn't organized in a way that makes this information obvious."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_table_1_2_maths_results_sorted.png",
        alt: "Processed test results",
        caption: "Table 1.2: Processed and sorted test results (Information)"
      }
    },
    {
      type: "text",
      content: "After the data has been processed (sorted by average score), it becomes information. Now you can easily see that Thabo is the top student with an average of 82%."
    },
    {
      type: "heading",
      content: {
        text: "The GIGO Principle",
        level: 2
      }
    },
    {
      type: "text",
      content: "GIGO stands for \"Garbage In, Garbage Out.\" This principle states that the quality of output is determined by the quality of the input. If incorrect or poor-quality data is entered into a system, the resulting output (information) will also be incorrect or poor quality."
    },
    {
      type: "text",
      content: "For example, if a teacher accidentally enters a score of 95% instead of 59% (transposing the digits), the student's calculated average will be incorrect. No matter how good the processing system is, it can't correct errors in the input data."
    },
    {
      type: "heading",
      content: {
        text: "The Information Processing Cycle",
        level: 2
      }
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_3_information_processing_cycle.png",
        alt: "Information processing cycle diagram",
        caption: "Figure 1.3: The Information Processing Cycle"
      }
    },
    {
      type: "text",
      content: "The Information Processing Cycle consists of five main steps:"
    },
    {
      type: "text",
      content: "1. INPUT: Data is entered into the system (e.g., typing on a keyboard, scanning a document).\n2. PROCESSING: The computer performs operations on the data (e.g., sorting, calculating, formatting).\n3. OUTPUT: The processed information is presented to the user (e.g., displayed on screen, printed).\n4. STORAGE: Data and information are saved for future use (e.g., saved to a hard drive or cloud storage).\n5. COMMUNICATION: Information is transmitted between systems or users (e.g., sending an email, uploading to a network)."
    },
    {
      type: "text",
      content: "Example: When calculating students' average scores:\n• INPUT: Teacher enters test scores\n• PROCESSING: System calculates averages\n• OUTPUT: Report showing student rankings\n• STORAGE: Scores saved in the grade book system\n• COMMUNICATION: Reports shared with students and parents"
    }
  ],
  quizQuestions: [
    {
      question: "What is data?",
      options: [
        "Processed facts that have meaning",
        "Raw, unprocessed facts and figures",
        "Computer software that processes information",
        "The output displayed on a screen"
      ],
      correctOptionIndex: 1
    },
    {
      question: "What does GIGO stand for?",
      options: [
        "Good Information Gives Output",
        "Graphics In, Graphics Out",
        "Garbage In, Garbage Out",
        "Good Input, Good Output"
      ],
      correctOptionIndex: 2
    },
    {
      question: "In the Information Processing Cycle, what happens during the PROCESSING step?",
      options: [
        "Data is entered into the system",
        "Information is presented to the user",
        "Data is saved for future use",
        "The computer performs operations on the data"
      ],
      correctOptionIndex: 3
    },
    {
      question: "What is the correct sequence of the Information Processing Cycle?",
      options: [
        "Input → Processing → Output → Storage → Communication",
        "Processing → Input → Output → Communication → Storage",
        "Storage → Input → Processing → Output → Communication",
        "Communication → Input → Processing → Output → Storage"
      ],
      correctOptionIndex: 0
    },
    {
      question: "According to the GIGO principle, what determines the quality of the output?",
      options: [
        "The speed of the computer processor",
        "The quality of the input data",
        "The amount of storage available",
        "The type of output device used"
      ],
      correctOptionIndex: 1
    }
  ]
};

// Lesson 1.3: What Makes a Computer Tick? Hardware vs. Software
const lesson1_3: LessonContent = {
  id: "1-3",
  title: "What Makes a Computer Tick? Hardware vs. Software",
  blocks: [
    {
      type: "heading",
      content: {
        text: "The Basic Computer Model",
        level: 2
      }
    },
    {
      type: "text",
      content: "Every computer, regardless of its size or purpose, follows the same basic model for processing data. This model consists of four main functions:"
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_4_computer_model_general.png",
        alt: "General computer model diagram",
        caption: "Figure 1.4: The general computer model showing the four main functions"
      }
    },
    {
      type: "text",
      content: "1. INPUT: Getting data into the computer (keyboard, mouse, camera, microphone, etc.)\n2. PROCESSING: Manipulating the data according to instructions (CPU - Central Processing Unit)\n3. OUTPUT: Presenting the results (monitor, printer, speakers, etc.)\n4. STORAGE: Saving data and programs (hard drive, SSD, USB drive, etc.)"
    },
    {
      type: "heading",
      content: {
        text: "Hardware vs. Software",
        level: 2
      }
    },
    {
      type: "text",
      content: "Hardware refers to the physical components of a computer system - the parts you can touch, see, and feel. Software consists of the programs and instructions that tell the hardware what to do."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_5_computer_hardware_desktop.png",
        alt: "Desktop computer hardware components",
        caption: "Figure 1.5: Common hardware components of a desktop computer"
      }
    },
    {
      type: "heading",
      content: {
        text: "Hardware Components",
        level: 3
      }
    },
    {
      type: "text",
      content: "Hardware components can be categorized based on their functions:"
    },
    {
      type: "text",
      content: "• Input devices: Keyboard, mouse, scanner, webcam, microphone\n• Processing devices: CPU (Central Processing Unit), GPU (Graphics Processing Unit)\n• Output devices: Monitor, printer, speakers, projector\n• Storage devices: Hard drive, SSD (Solid State Drive), USB flash drive, memory card"
    },
    {
      type: "heading",
      content: {
        text: "Software Types",
        level: 3
      }
    },
    {
      type: "text",
      content: "Software can be divided into two main categories:"
    },
    {
      type: "text",
      content: "1. System Software: Programs that control and manage the computer hardware and provide a platform for other software to run. Examples include operating systems (Windows, macOS, Linux), device drivers, and utility programs.\n2. Application Software: Programs that help users perform specific tasks. Examples include word processors, web browsers, games, media players, and photo editors."
    },
    {
      type: "heading",
      content: {
        text: "Hardware and Software Interdependence",
        level: 2
      }
    },
    {
      type: "text",
      content: "Hardware and software depend on each other. Hardware without software is like a body without a brain - it has potential but can't do anything useful. Software without hardware is like a brain without a body - it contains instructions but has no way to carry them out."
    },
    {
      type: "text",
      content: "Think of it like this: Hardware is analogous to a CD player (the physical device), while software is like the music CD (the instructions). The CD player needs music CDs to be useful, and music CDs need a CD player to be heard."
    }
  ],
  quizQuestions: [
    {
      question: "What are the four main functions in the basic computer model?",
      options: [
        "Input, Output, Processing, Communication",
        "Input, Processing, Output, Storage",
        "Hardware, Software, Data, Users",
        "CPU, RAM, Hard Drive, Monitor"
      ],
      correctOptionIndex: 1
    },
    {
      question: "Which of the following is an example of hardware?",
      options: [
        "Microsoft Word",
        "Google Chrome",
        "Keyboard",
        "Windows 10"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which of the following is an example of software?",
      options: [
        "Printer",
        "Web browser",
        "Monitor",
        "USB drive"
      ],
      correctOptionIndex: 1
    },
    {
      question: "What is the CPU's main function?",
      options: [
        "Input",
        "Output",
        "Processing",
        "Storage"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which type of software controls the computer hardware and provides a platform for other software to run?",
      options: [
        "Application software",
        "System software",
        "Utility software",
        "Gaming software"
      ],
      correctOptionIndex: 1
    }
  ]
};

// Lesson 1.4: Computer Types - Horses for Courses
const lesson1_4: LessonContent = {
  id: "1-4",
  title: "Computer Types - Horses for Courses",
  blocks: [
    {
      type: "heading",
      content: {
        text: "Types of Computers",
        level: 2
      }
    },
    {
      type: "text",
      content: "Computers come in many shapes and sizes, each designed for specific purposes and users. They can be broadly categorized as multi-purpose computers or dedicated (embedded) devices."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_figure_1_6_computer_types_collage.png",
        alt: "Collage of different computer types",
        caption: "Figure 1.6: Various types of computers, from supercomputers to smartphones"
      }
    },
    {
      type: "heading",
      content: {
        text: "Multi-purpose Computers",
        level: 3
      }
    },
    {
      type: "text",
      content: "Multi-purpose computers can run many different applications and perform a variety of tasks. They can be classified based on their size, power, and typical uses:"
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_table_1_3_computer_types_uses_Page_1.png",
        alt: "Computer types and uses table part 1",
        caption: "Table 1.3 (Part 1): Computer types and their typical uses"
      }
    },
    {
      type: "text",
      content: "1. Supercomputers: The most powerful type of computer, used for extremely complex calculations in fields like weather forecasting, scientific research, and military simulations.\n2. Mainframes: Large, powerful computers used by big organizations to process vast amounts of data, such as banking transactions or airline reservations.\n3. Servers: Computers dedicated to providing services to other computers on a network, such as storing files, hosting websites, or managing email."
    },
    {
      type: "image",
      content: {
        src: "https://grpsxolrhkerxgzrnmaq.supabase.co/storage/v1/object/public/testimages/ch1_table_1_3_computer_types_uses_Page_2.png",
        alt: "Computer types and uses table part 2",
        caption: "Table 1.3 (Part 2): More computer types and their typical uses"
      }
    },
    {
      type: "text",
      content: "4. Workstations: High-performance computers designed for technical or scientific applications like graphic design, CAD (Computer-Aided Design), or video editing.\n5. Desktop Computers: Personal computers designed to stay in one place (not portable).\n6. Laptops/Notebooks: Portable personal computers with built-in screen, keyboard, and battery.\n7. Tablets: Highly portable touchscreen computers without built-in keyboards.\n8. Smartphones: Mobile phones with computer capabilities, running mobile operating systems and applications."
    },
    {
      type: "heading",
      content: {
        text: "Dedicated (Embedded) Devices",
        level: 3
      }
    },
    {
      type: "text",
      content: "Dedicated or embedded devices are computers designed for a specific purpose or task. They typically run fixed programs and cannot be easily reprogrammed by the user."
    },
    {
      type: "text",
      content: "Examples include:\n• ATMs (Automated Teller Machines)\n• GPS navigation devices\n• Digital cameras\n• Smart TVs\n• Car engine management systems\n• Medical equipment\n• Industrial control systems"
    },
    {
      type: "heading",
      content: {
        text: "Choosing the Right Computer",
        level: 2
      }
    },
    {
      type: "text",
      content: "The best computer for a particular situation depends on several factors:\n• Processing power needed\n• Portability requirements\n• Available space\n• Budget constraints\n• Specific tasks to be performed"
    },
    {
      type: "text",
      content: "For example, a graphic designer might need a powerful workstation with a large, high-quality display, while a traveling sales representative might be better served by a lightweight laptop or tablet."
    }
  ],
  quizQuestions: [
    {
      question: "What's the main difference between multi-purpose computers and dedicated devices?",
      options: [
        "Multi-purpose computers are always larger than dedicated devices",
        "Multi-purpose computers can run many different applications, while dedicated devices are designed for specific tasks",
        "Multi-purpose computers are always more expensive than dedicated devices",
        "Multi-purpose computers are always portable, while dedicated devices are not"
      ],
      correctOptionIndex: 1
    },
    {
      question: "Which type of computer is most likely to be used for complex weather forecasting?",
      options: [
        "Desktop computer",
        "Laptop",
        "Supercomputer",
        "Smartphone"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which of these is an example of a dedicated (embedded) device?",
      options: [
        "Desktop computer",
        "Laptop",
        "ATM (Automated Teller Machine)",
        "Server"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which type of computer would be most suitable for a bank processing millions of transactions daily?",
      options: [
        "Mainframe",
        "Tablet",
        "Desktop",
        "Workstation"
      ],
      correctOptionIndex: 0
    },
    {
      question: "Which factor is NOT typically considered when choosing a computer?",
      options: [
        "Processing power needed",
        "Color of the computer",
        "Budget constraints",
        "Portability requirements"
      ],
      correctOptionIndex: 1
    }
  ]
};

// Lesson 1.5: The Value of Computing - Economic Benefits
const lesson1_5: LessonContent = {
  id: "1-5",
  title: "The Value of Computing - Economic Benefits",
  blocks: [
    {
      type: "heading",
      content: {
        text: "Economic Benefits of Computing",
        level: 2
      }
    },
    {
      type: "text",
      content: "Computers and ICT systems have transformed how businesses operate, offering numerous economic advantages that justify their implementation despite initial costs."
    },
    {
      type: "heading",
      content: {
        text: "Saving Paper",
        level: 3
      }
    },
    {
      type: "text",
      content: "Digital documents and communication have significantly reduced the need for paper in many contexts:"
    },
    {
      type: "text",
      content: "• Email has largely replaced paper memos and letters\n• Digital forms have replaced paper forms\n• Electronic documents can be shared without printing\n• Digital storage takes up less physical space than paper files\n• Documents can be updated without reprinting\n• Digital backups prevent information loss"
    },
    {
      type: "text",
      content: "This saves costs on paper, printing, copying, filing cabinets, and physical storage space. It also has environmental benefits by reducing paper consumption."
    },
    {
      type: "heading",
      content: {
        text: "Saving Labour",
        level: 3
      }
    },
    {
      type: "text",
      content: "Computers can automate many tasks that previously required human labor:"
    },
    {
      type: "text",
      content: "• Automatic calculations (e.g., spreadsheets recalculating formulas)\n• Automated data entry and form processing\n• Scheduling systems that manage appointments\n• Inventory systems that track stock levels\n• Automated billing and payment processing\n• Mass communication through email lists"
    },
    {
      type: "text",
      content: "This allows businesses to accomplish more with fewer staff hours, improving efficiency and reducing labor costs. Employees can focus on more complex tasks that require human judgment rather than repetitive processes."
    },
    {
      type: "heading",
      content: {
        text: "Communication Speed and Costs",
        level: 3
      }
    },
    {
      type: "text",
      content: "Digital communication offers significant advantages over traditional methods:"
    },
    {
      type: "text",
      content: "• Instant delivery of messages (compared to postal mail)\n• No per-message cost for email (unlike phone calls or postal mail)\n• Ability to communicate globally at minimal cost\n• Group communication through mailing lists or shared platforms\n• Video conferencing that eliminates travel expenses\n• Ability to share large files and documents electronically"
    },
    {
      type: "text",
      content: "These improvements lead to faster decision-making, better coordination, and reduced communication costs."
    },
    {
      type: "heading",
      content: {
        text: "Increased Efficiency",
        level: 3
      }
    },
    {
      type: "text",
      content: "Computers boost overall business efficiency in multiple ways:"
    },
    {
      type: "text",
      content: "• Quick access to information through databases and search functions\n• Rapid processing of large amounts of data\n• Elimination of duplicate work through shared systems\n• Standardization of processes and outputs\n• Automated workflows that reduce bottlenecks\n• Integration of different business functions (e.g., sales connecting directly to inventory)"
    },
    {
      type: "heading",
      content: {
        text: "Accuracy",
        level: 3
      }
    },
    {
      type: "text",
      content: "When programmed correctly and given accurate inputs (remember GIGO!), computers offer superior accuracy compared to manual processes:"
    },
    {
      type: "text",
      content: "• Consistent application of formulas and rules\n• No fatigue-related errors\n• Built-in validation checks in well-designed systems\n• Precision in calculations beyond human capability\n• Reliable record-keeping"
    },
    {
      type: "heading",
      content: {
        text: "Reliability",
        level: 3
      }
    },
    {
      type: "text",
      content: "Modern computer systems, when properly maintained, offer high reliability:"
    },
    {
      type: "text",
      content: "• Consistent performance regardless of time or workload\n• Backup systems that prevent data loss\n• Automatic error detection and reporting\n• Ability to run 24/7 without breaks\n• Predictable operation and output"
    },
    {
      type: "text",
      content: "While computers do require initial investment, maintenance, and occasional upgrades, the economic benefits they provide typically far outweigh these costs, making them essential tools for modern businesses."
    }
  ],
  quizQuestions: [
    {
      question: "Which of the following is NOT an economic benefit of using computers in business?",
      options: [
        "Saving paper",
        "Increasing employment opportunities",
        "Improving communication speed",
        "Enhancing accuracy of calculations"
      ],
      correctOptionIndex: 1
    },
    {
      question: "How do computers help save labor costs?",
      options: [
        "By increasing the number of employees needed",
        "By requiring workers to work longer hours",
        "By automating repetitive tasks",
        "By eliminating the need for management"
      ],
      correctOptionIndex: 2
    },
    {
      question: "Which of the following is an example of how computers save paper?",
      options: [
        "Printing multiple copies of documents",
        "Using email instead of paper memos",
        "Creating more detailed reports",
        "Developing new paper-based forms"
      ],
      correctOptionIndex: 1
    },
    {
      question: "How do computers improve communication in business?",
      options: [
        "By eliminating the need for face-to-face meetings",
        "By restricting communication to working hours",
        "By enabling instant messaging and video conferencing",
        "By reducing the number of people who need to communicate"
      ],
      correctOptionIndex: 2
    },
    {
      question: "What factor can limit the accuracy benefit of computers?",
      options: [
        "The GIGO principle (garbage in, garbage out)",
        "The age of the computer",
        "The number of users",
        "The size of the monitor"
      ],
      correctOptionIndex: 0
    }
  ]
};

export const moduleOneLessons = {
  "1-1": lesson1_1,
  "1-2": lesson1_2,
  "1-3": lesson1_3,
  "1-4": lesson1_4,
  "1-5": lesson1_5
};

// Module lesson structure for the API
export const moduleLessons: ModuleLesson[] = [
  {
    id: "1-1",
    title: "What is ICT and Why Does it Matter?",
    content: "Introduction to Information and Communication Technology concepts",
    quizId: "quiz-1-1",
    nextLessonId: "1-2",
    prevLessonId: null,
    moduleId: "1"
  },
  {
    id: "1-2",
    title: "Data, Information, and the GIGO Principle",
    content: "Understanding the difference between data and information",
    quizId: "quiz-1-2",
    nextLessonId: "1-3",
    prevLessonId: "1-1",
    moduleId: "1"
  },
  {
    id: "1-3",
    title: "What Makes a Computer Tick? Hardware vs. Software",
    content: "Exploring computer components and how they work together",
    quizId: "quiz-1-3",
    nextLessonId: "1-4",
    prevLessonId: "1-2",
    moduleId: "1"
  },
  {
    id: "1-4",
    title: "Computer Types - Horses for Courses",
    content: "Different types of computers and their specific uses",
    quizId: "quiz-1-4",
    nextLessonId: "1-5",
    prevLessonId: "1-3",
    moduleId: "1"
  },
  {
    id: "1-5",
    title: "The Value of Computing - Economic Benefits",
    content: "Understanding the economic advantages of computing technology",
    quizId: "quiz-1-5",
    nextLessonId: null,
    prevLessonId: "1-4",
    moduleId: "1"
  }
];
