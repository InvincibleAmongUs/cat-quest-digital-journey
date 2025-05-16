
import { Chapter } from '@/types/curriculum';
import { TextBlock, HeadingBlock, ImageBlock, QuizBlock } from '@/components/lessons/ContentBlockRenderer';

export const chapter2: Chapter = {
  id: "C2",
  title: "Exploring Computer Hardware: Core Components & Peripherals",
  learningObjectives: [
    "Reiterate hardware's role in the input, processing, and output stages.",
    "Identify and describe the main components found on a motherboard (CPU, RAM, ROM).",
    "List and describe various input devices and their uses.",
    "List and describe various output devices and their uses.",
    "Identify common computer ports and connectors and their functions.",
  ],
  lessons: [
    {
      id: "2.1",
      title: "Hardware & The Processing Hub: Motherboard, CPU, Memory",
      focus: "Introduction to hardware. Deep dive into the motherboard, CPU (the 'brain'), and types of memory (RAM, ROM).",
      contentBlocks: [
        { type: 'heading', content: { text: "What is Computer Hardware?", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Computer hardware refers to the physical, tangible components of a computer system that you can see and touch. It includes everything from the internal circuits to the external devices like keyboards and monitors. Hardware performs the tasks of input, processing, output, and storage." } as TextBlock,
        { type: 'heading', content: { text: "The Motherboard: Connecting Everything", level: 3 } } as HeadingBlock,
        { type: 'text', content: "The motherboard is the main printed circuit board (PCB) in a computer. It holds and allows communication between many of the crucial electronic components of a system, such as the CPU and memory, and provides connectors for other peripherals." } as TextBlock,
        { type: 'image', content: { src: "/placeholder.svg", alt: "Labelled Motherboard", caption: "Figure 2.1.1: Key Components of a Motherboard" } } as ImageBlock,
        { type: 'heading', content: { text: "The Central Processing Unit (CPU)", level: 3 } } as HeadingBlock,
        { type: 'text', content: "The CPU, often called the 'brain' of the computer, interprets and carries out the basic instructions that operate a computer. Its performance is measured in Gigahertz (GHz)." } as TextBlock,
        { type: 'heading', content: { text: "Computer Memory: RAM and ROM", level: 3 } } as HeadingBlock,
        { type: 'text', content: "RAM (Random Access Memory) is volatile memory that temporarily stores data and programs being actively used by the CPU. ROM (Read-Only Memory) is non-volatile memory containing pre-written startup instructions for the computer (like BIOS/UEFI)." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch6_table_6_9_ram_rom.png", alt: "RAM vs ROM table", caption: "Table 2.1.1: Comparing RAM and ROM" } } as ImageBlock,
      ],
    },
    {
      id: "2.2",
      title: "Input Devices: Getting Data Into the Computer",
      focus: "Exploring various devices used to enter data and commands.",
      contentBlocks: [
        { type: 'heading', content: { text: "How We 'Talk' to Computers: Input Devices", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Input devices allow users to send data, information, or control signals to a computer." } as TextBlock,
        { type: 'heading', content: { text: "Keyboard & Pointing Devices", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Keyboard: Used for typing text and numbers. Pointing Devices (Mouse, Touchpad, Stylus, Touchscreen): Used to control the cursor and interact with graphical elements." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch2_figure_2_1_mouse_parts.png", alt: "Mouse parts", caption: "Figure 2.2.1: Parts of a Computer Mouse" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch2_figure_2_3_qwerty_keyboard.jpg", alt: "QWERTY keyboard", caption: "Figure 2.2.2: A Standard QWERTY Keyboard" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch6_table_6_1_pointing_devices.png", alt: "Pointing devices table", caption: "Table 2.2.1: Common Pointing Devices" } } as ImageBlock,
        { type: 'heading', content: { text: "Scanners, Digital Cameras, Microphones & Biometric Input", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Scanners: Convert physical documents/images into digital format. Digital Cameras: Capture photos/videos digitally. Microphones: Input audio. Biometric Devices: Use unique biological traits (fingerprints, face) for identification." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch6_table_6_2_scanning_devices.png", alt: "Scanning devices table", caption: "Table 2.2.2: Types of Scanning Devices" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch6_table_6_6_biometric_devices.png", alt: "Biometric devices table", caption: "Table 2.2.3: Examples of Biometric Input Devices" } } as ImageBlock,
      ],
    },
    {
      id: "2.3",
      title: "Output Devices: Seeing and Hearing Results",
      focus: "Devices that present processed information to the user.",
      contentBlocks: [
        { type: 'heading', content: { text: "Getting Feedback: Output Devices", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Output devices convey information from the computer to the user." } as TextBlock,
        { type: 'heading', content: { text: "Monitors & Printers", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Monitors (VDUs): Display visual output. Key factors include size, resolution. Printers: Produce hard copies (paper output). Types include inkjet and laser." } as TextBlock,
         { type: 'image', content: { src: "src/utils/images/ch5_table_5_4_printer_comparison.png", alt: "Printer Comparison Table", caption: "Table 2.3.1: Comparing Printer Types" } } as ImageBlock,
        { type: 'heading', content: { text: "Speakers, Headphones & Data Projectors", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Speakers/Headphones: Produce audio output. Data Projectors: Display computer output on a large screen or surface." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch6_table_6_7_audio_output_devices.png", alt: "Audio Output Devices Table", caption: "Table 2.3.2: Audio Output Devices" } } as ImageBlock,
      ],
    },
    {
      id: "2.4",
      title: "Ports and Connectors: Plugging It All In",
      focus: "Understanding common ports and the connectors they use to link peripherals to the computer.",
      contentBlocks: [
        { type: 'heading', content: { text: "Making Connections: Ports and Connectors", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Ports are interfaces on a computer to which you can connect a device. Connectors are at the end of cables that plug into ports." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch5_table_5_1_ports_connectors.png", alt: "Ports and Connectors Table", caption: "Table 2.4.1: Common Ports and Their Connectors" } } as ImageBlock,
        { type: 'text', content: "Common ports include USB (Universal Serial Bus), HDMI (High-Definition Multimedia Interface), Network Port (Ethernet), and Audio Jacks." } as TextBlock,
      ],
    },
  ],
  chapterQuiz: {
    questions: [
      { question: "Which component is often referred to as the 'brain' of the computer?", type: 'multiple-choice', options: ["RAM", "Motherboard", "CPU", "Hard Drive"], correctAnswer: 2 },
      { question: "Is RAM volatile or non-volatile memory?", type: 'multiple-choice', options: ["Volatile", "Non-volatile"], correctAnswer: 0 },
      { question: "A printer is an example of an ______ device.", type: 'short-answer', correctAnswer: "output" },
      { question: "HDMI ports are primarily used for connecting what type of devices?", type: 'multiple-choice', options: ["Keyboards", "Audio and Video (e.g., Monitors, TVs)", "Network cables", "Power supply"], correctAnswer: 1 },
    ]
  }
};
