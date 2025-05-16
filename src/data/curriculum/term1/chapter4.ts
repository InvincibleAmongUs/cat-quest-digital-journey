
import { Chapter } from '@/types/curriculum';
import { TextBlock, HeadingBlock, ImageBlock, QuizBlock } from '@/components/lessons/ContentBlockRenderer';

export const chapter4: Chapter = {
  id: "C4",
  title: "The World of Software: System and Application Programs",
  learningObjectives: [
    "Differentiate between system software and application software.",
    "Describe the main functions of an operating system (OS).",
    "Identify common utility programs and their purpose.",
    "List and give examples of different types of application software.",
    "Explain the concepts of open-source vs. proprietary software.",
    "Understand basic software licensing (single-user, site license).",
  ],
  lessons: [
    {
      id: "4.1",
      title: "What is Software? System vs. Application Software",
      focus: "Defining software and understanding its two main categories.",
      contentBlocks: [
        { type: 'heading', content: { text: "The Instructions Behind the Magic: What is Software?", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Software consists of programs, which are sets of instructions that tell the computer hardware what to do and how to do it." } as TextBlock,
        { type: 'heading', content: { text: "System Software vs. Application Software", level: 3 } } as HeadingBlock,
        { type: 'text', content: "System Software: Manages and controls the computer hardware and enables application software to run (e.g., Operating Systems, Utilities).\nApplication Software: Programs designed to perform specific tasks for users (e.g., Word Processors, Web Browsers)." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch7_table_7_1_app_software_examples.png", alt: "Application Software Examples", caption: "Table 4.1.1: Examples of Application Software" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch7_table_7_2_system_software_examples.png", alt: "System Software Examples", caption: "Table 4.1.2: Examples of System Software" } } as ImageBlock,
      ],
    },
    {
      id: "4.2",
      title: "System Software: Operating Systems (OS) & Utilities",
      focus: "Deep dive into the crucial role of the OS and helpful utility programs.",
      contentBlocks: [
        { type: 'heading', content: { text: "The Operating System (OS)", level: 2 } } as HeadingBlock,
        { type: 'text', content: "The OS is the most important software. Its functions include managing hardware, providing a user interface, managing files, running applications, and ensuring security. Examples: Windows, macOS, Linux, Android, iOS." } as TextBlock,
        { type: 'heading', content: { text: "Utility Programs", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Utilities help maintain and manage the computer system. Examples: File managers, disk cleanup tools, backup software, antivirus programs." } as TextBlock,
      ],
    },
    {
      id: "4.3",
      title: "Application Software: Tools for Tasks",
      focus: "Exploring the vast range of software designed for specific user needs.",
      contentBlocks: [
        { type: 'heading', content: { text: "Productivity, Communication, and More", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Productivity: Word processors, spreadsheets, presentation software.\nCommunication: Email clients, web browsers, messaging apps.\nGraphics/Multimedia: Photo/video editors, media players.\nEducational Software & Games." } as TextBlock,
      ],
    },
    {
      id: "4.4",
      title: "Software Sources & Licensing",
      focus: "Understanding where software comes from (open-source, proprietary) and how it's legally used (licensing).",
      contentBlocks: [
        { type: 'heading', content: { text: "Open-Source vs. Proprietary Software", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Open-Source: Source code is available, often free to use/modify (e.g., Linux, Firefox).\nProprietary: Source code is not available, usually paid (e.g., Windows, MS Office)." } as TextBlock,
        { type: 'heading', content: { text: "Software Licensing", level: 3 } } as HeadingBlock,
        { type: 'text', content: "A license (EULA) grants permission to use software. Types: Single-user, site license, freeware, shareware." } as TextBlock,
      ],
    },
  ],
  chapterQuiz: {
    questions: [
      { question: "Which type of software is responsible for managing the computer's hardware resources?", type: 'multiple-choice', options: ["Application Software", "System Software", "Utility Software", "Productivity Software"], correctAnswer: 1 },
      { question: "Microsoft Word is an example of:", type: 'multiple-choice', options: ["Operating System", "Utility Program", "Application Software", "System Driver"], correctAnswer: 2 },
      { question: "Software for which the source code is freely available is known as:", type: 'short-answer', correctAnswer: "Open-Source Software" },
    ]
  }
};
