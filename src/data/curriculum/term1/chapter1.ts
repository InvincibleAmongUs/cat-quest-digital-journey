
import { Chapter } from '@/types/curriculum';
import { TextBlock, HeadingBlock, ImageBlock, QuizBlock, GameBlock } from '@/components/lessons/ContentBlockRenderer';

export const chapter1: Chapter = {
  id: "C1",
  title: "Foundations of Computing: Computers, Data, and ICT",
  learningObjectives: [
    "Define 'computer' and identify its core functions.",
    "Explain the four stages of the Information Processing Cycle (IPC).",
    "Differentiate clearly between data and information, providing examples.",
    "Identify and describe various types of computers and their common uses.",
    "List advantages and disadvantages of using computers.",
    "Briefly describe the components of an information system.",
  ],
  lessons: [
    {
      id: "1.1",
      title: "What is a Computer & The Information Processing Cycle",
      focus: "Core definition of a computer, its basic functions (input, processing, output, storage, communication). Detailed explanation of the IPC.",
      contentBlocks: [
        {
          type: 'heading',
          content: { text: "Defining a Computer", level: 2 }
        } as HeadingBlock,
        {
          type: 'text',
          content: "A computer is an electronic device that operates under the control of instructions stored in its own memory. It can accept data (input), process the data according to specified rules, produce information (output), and store the information for future use. Computers are designed to perform these tasks with speed and accuracy."
        } as TextBlock,
        {
          type: 'image',
          content: { src: "/placeholder.svg", alt: "General computer system diagram", caption: "Figure 1.1.1: General Computer System" }
        } as ImageBlock,
        {
          type: 'heading',
          content: { text: "The Information Processing Cycle (IPC)", level: 2 }
        } as HeadingBlock,
        {
          type: 'text',
          content: "The Information Processing Cycle (IPC) describes the sequence of steps a computer follows to convert data into information. It consists of four main stages:\n1. **Input**: Raw data is entered into the computer system (e.g., typing on a keyboard, clicking a mouse, scanning a barcode).\n2. **Processing**: The computer manipulates the input data according to a set of instructions (a program) to convert it into a meaningful form. This is primarily done by the Central Processing Unit (CPU).\n3. **Output**: The processed data (now information) is presented to the user in a usable format (e.g., displayed on a monitor, printed on paper, played as sound).\n4. **Storage**: The data, information, and programs are saved for future use. This can be temporary (in RAM) or permanent (on a hard drive or other storage media).\nCommunication is also often considered an integral part of this cycle, as computers frequently send and receive data."
        } as TextBlock,
        {
          type: 'image',
          content: { src: "src/utils/images/ch1_figure_1_3_information_processing_cycle.png", alt: "IPC diagram", caption: "Figure 1.1.2: Information Processing Cycle" }
        } as ImageBlock,
        {
          type: 'quiz',
          content: {
            questions: [
              { question: "Which stage of the IPC involves entering raw facts into the computer?", options: ["Processing", "Input", "Output", "Storage"], correctAnswer: 1 },
              { question: "The CPU is primarily responsible for which stage of the IPC?", options: ["Input", "Storage", "Processing", "Output"], correctAnswer: 2 },
            ]
          }
        } as QuizBlock,
      ],
    },
    {
      id: "1.2",
      title: "Data vs. Information",
      focus: "Understanding the distinction between raw data and processed, meaningful information.",
      contentBlocks: [
        {
          type: 'heading',
          content: { text: "Understanding Data", level: 2 }
        } as HeadingBlock,
        {
          type: 'text',
          content: "Data refers to raw, unorganized facts, figures, symbols, or observations that, on their own, may not have much meaning. Examples include: a list of student names, daily temperature readings, items sold in a shop."
        } as TextBlock,
        {
          type: 'image',
          content: { src: "src/utils/images/ch1_table_1_1_learner_test_data.png", alt: "Example of Data", caption: "Table 1.2.1: Learner Test Data (Example of Data)" }
        } as ImageBlock,
        {
          type: 'heading',
          content: { text: "Understanding Information", level: 2 }
        } as HeadingBlock,
        {
          type: 'text',
          content: "Information is data that has been processed, organized, structured, or presented in a given context so as to make it meaningful and useful. It helps in decision-making. Examples include: an alphabetically sorted list of students, the average monthly temperature, a report showing best-selling items."
        } as TextBlock,
         {
          type: 'image',
          content: { src: "src/utils/images/ch1_table_1_2_maths_results_sorted.png", alt: "Example of Information", caption: "Table 1.2.2: Maths Results Sorted (Example of Information)" }
        } as ImageBlock,
        {
          type: 'text',
          content: "Interactive Element Suggestion: Create a 'Sort It Out' game where users drag and drop items into 'Data' or 'Information' bins."
        } as TextBlock, // Placeholder for interactive element
        // {
        //   type: 'game',
        //   content: { gameType: "sorting", gameId: "data-vs-info-sorter-1.2", config: { items: [ {text: "10, 20, 15", type: "data"}, {text: "Average score: 15", type: "information"} ] } }
        // } as GameBlock, // Example of a game block if we had a generic sorter
      ],
    },
    {
      id: "1.3",
      title: "Types of Computers and Their Uses",
      focus: "Exploring the variety of computers from personal devices to large servers, and their typical applications.",
      contentBlocks: [
        { type: 'heading', content: { text: "A World of Computers", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Computers come in many shapes and sizes, designed for different purposes and users." } as TextBlock,
        { type: 'heading', content: { text: "Personal Computers (PCs)", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Desktops: Stationary computers typically with a separate monitor, keyboard, and mouse. Used for work, gaming, general home use.\nLaptops/Notebooks: Portable, all-in-one computers. Ideal for users on the go." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch1_figure_1_6_computer_types_collage.png", alt: "Collage of computer types", caption: "Figure 1.3.1: Various Computer Types" } } as ImageBlock,
        { type: 'heading', content: { text: "Mobile Devices", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Smartphones: Handheld devices combining phone capabilities with computing features like internet access, apps, and cameras.\nTablets: Larger than smartphones, touch-screen operated, good for media consumption, reading, and light work." } as TextBlock,
        { type: 'heading', content: { text: "Servers", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Powerful computers that provide services to other computers (clients) on a network. Used for web hosting, email, database management, and file storage." } as TextBlock,
        { type: 'heading', content: { text: "Embedded Computers", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Special-purpose computers integrated into larger devices to perform specific tasks, e.g., in cars (GPS, engine control), home appliances (smart fridges), and medical equipment." } as TextBlock,
         { type: 'image', content: { src: "src/utils/images/ch1_table_1_3_computer_types_uses_Page_1.png", alt: "Computer Types and Uses Table Part 1", caption: "Table 1.3.1: Computer Types and Their Uses (Part 1)" } } as ImageBlock,
         { type: 'image', content: { src: "src/utils/images/ch1_table_1_3_computer_types_uses_Page_2.png", alt: "Computer Types and Uses Table Part 2", caption: "Table 1.3.2: Computer Types and Their Uses (Part 2)" } } as ImageBlock,
      ],
    },
    {
      id: "1.4",
      title: "Advantages, Disadvantages, and Information Systems",
      focus: "Balanced view of computer usage and a brief introduction to the concept of an information system.",
      contentBlocks: [
        { type: 'heading', content: { text: "Why Use Computers? The Pros and Cons", level: 2 } } as HeadingBlock,
        { type: 'text', content: "**Advantages:**\n- Speed: Perform calculations and tasks much faster than humans.\n- Accuracy: Reliable and precise if programmed correctly.\n- Storage: Can store vast amounts of data and information compactly.\n- Automation: Can perform repetitive tasks automatically.\n- Communication: Facilitate global communication and information sharing.\n\n**Disadvantages:**\n- Cost: Initial purchase and maintenance can be expensive.\n- Security Risks: Vulnerable to viruses, malware, and hacking.\n- Health Issues: Prolonged use can lead to eye strain, repetitive strain injuries.\n- Job Displacement: Automation can lead to job losses in some sectors.\n- Over-Reliance: Becoming too dependent on computers can be problematic if they fail." } as TextBlock,
        { type: 'heading', content: { text: "What is an Information System?", level: 2 } } as HeadingBlock,
        { type: 'text', content: "An information system is a set of interrelated components that collect (or retrieve), process, store, and distribute information to support decision making and control in an organization. The main components are: Hardware, Software, Data, People, and Processes/Procedures. Communication networks are also vital for connecting these components." } as TextBlock,
        { type: 'image', content: { src: "/placeholder.svg", alt: "Information System Components", caption: "Figure 1.4.1: Components of an Information System" } } as ImageBlock,
      ],
    },
  ],
  chapterQuiz: {
    questions: [
      { question: "What is the primary role of a computer's CPU?", type: 'multiple-choice', options: ["Store data permanently", "Display output to the user", "Perform calculations and execute instructions", "Connect to the internet"], correctAnswer: 2, explanation: "The CPU (Central Processing Unit) is the brain of the computer, responsible for processing data and executing program instructions." },
      { question: "Is 'a list of today's temperatures in various cities' an example of data or information?", type: 'multiple-choice', options: ["Data", "Information"], correctAnswer: 0, explanation: "This is raw data. If it were processed to show 'the hottest city today', it would be information." },
      { question: "List two advantages of using computers.", type: 'short-answer', correctAnswer: "Speed, accuracy, storage capacity, automation, communication capabilities (any two valid points).", explanation: "Computers offer many benefits like performing tasks quickly and accurately." },
      { question: "A smartphone is primarily designed for making calls and is not considered a type of computer.", type: 'true-false', correctAnswer: 0, explanation: "False. Smartphones are powerful handheld computers with calling capabilities." },
      { question: "A school uses a system to manage student records, grades, and attendance. This system includes computers, software for record-keeping, the student data itself, and the staff who use it. What is this entire setup called?", type: 'scenario', correctAnswer: "An Information System", explanation: "This describes an information system, which combines hardware, software, data, people, and processes." },
    ]
  }
};
