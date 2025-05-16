
import { Chapter } from '@/types/curriculum';
import { TextBlock, HeadingBlock, ImageBlock, QuizBlock } from '@/components/lessons/ContentBlockRenderer';

export const chapter3: Chapter = {
  id: "C3",
  title: "Managing Digital Information: Storage Devices",
  learningObjectives: [
    "Define computer storage and its importance.",
    "Identify and describe different types of storage devices: HDDs, SSDs, USB flash drives, memory cards, optical discs.",
    "Understand key characteristics of storage: capacity, speed, portability, cost, and reliability.",
  ],
  lessons: [
    {
      id: "3.1",
      title: "Introduction to Computer Storage",
      focus: "Why we need storage, primary vs. secondary storage (briefly), and units of storage (Bits, Bytes, KB, MB, GB, TB).",
      contentBlocks: [
        { type: 'heading', content: { text: "Why Keep Things? The Need for Storage", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Storage devices are essential for saving software, user files, and the operating system, allowing data to be retained even when the computer is turned off (non-volatile storage)." } as TextBlock,
        { type: 'heading', content: { text: "Measuring Storage: From Bits to Terabytes", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Storage capacity is measured in units: Bit (smallest unit), Byte (8 bits), Kilobyte (KB, ~1000 Bytes), Megabyte (MB, ~1000 KB), Gigabyte (GB, ~1000 MB), Terabyte (TB, ~1000 GB)." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch5_table_5_5_measuring_capacity.png", alt: "Measuring Capacity Table", caption: "Table 3.1.1: Units of Storage Capacity" } } as ImageBlock,
      ],
    },
    {
      id: "3.2",
      title: "Hard Disk Drives (HDDs) and Solid-State Drives (SSDs)",
      focus: "Comparing traditional magnetic hard drives with modern solid-state drives.",
      contentBlocks: [
        { type: 'heading', content: { text: "Hard Disk Drives (HDDs)", level: 3 } } as HeadingBlock,
        { type: 'text', content: "HDDs use spinning magnetic platters to store data. They offer large capacities at a lower cost but are slower and more fragile than SSDs." } as TextBlock,
        { type: 'heading', content: { text: "Solid-State Drives (SSDs)", level: 3 } } as HeadingBlock,
        { type: 'text', content: "SSDs use flash memory chips, have no moving parts, and are significantly faster, more durable, and quieter than HDDs, but generally more expensive per GB." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch5_table_5_6_common_storage_devices.png", alt: "Common Storage Devices Table", caption: "Table 3.2.1: Common Storage Devices including HDD/SSD" } } as ImageBlock,
         { type: 'image', content: { src: "src/utils/images/ch5_table_5_7_capacity_robustness.png", alt: "Capacity Robustness Portability Table", caption: "Table 3.2.2: Comparing Storage Devices by Capacity, Robustness, Portability" } } as ImageBlock,
      ],
    },
    {
      id: "3.3",
      title: "Portable Storage: USB Flash Drives & Memory Cards",
      focus: "Common, easily transportable storage solutions.",
      contentBlocks: [
        { type: 'heading', content: { text: "USB Flash Drives", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Small, portable devices that plug into a USB port, used for transferring and backing up files." } as TextBlock,
        { type: 'heading', content: { text: "Memory Cards", level: 3 } } as HeadingBlock,
        { type: 'text', content: "Tiny storage media (e.g., SD, microSD) used in cameras, phones, and other portable devices." } as TextBlock,
      ],
    },
    {
      id: "3.4",
      title: "Optical Discs: CDs, DVDs, and Blu-ray",
      focus: "Understanding legacy and current optical media.",
      contentBlocks: [
        { type: 'heading', content: { text: "Optical Media", level: 2 } } as HeadingBlock,
        { type: 'text', content: "CDs (Compact Discs), DVDs (Digital Versatile Discs), and Blu-ray Discs store data read by lasers. Used for software distribution, movies, and backups, though less common now." } as TextBlock,
         { type: 'image', content: { src: "/placeholder.svg", alt: "Optical Discs", caption: "Figure 3.4.1: CD, DVD, and Blu-ray Disc" } } as ImageBlock,
      ],
    },
  ],
  chapterQuiz: {
    questions: [
      { question: "Which storage device typically offers the largest capacity for the lowest cost per GB?", type: 'multiple-choice', options: ["SSD", "HDD", "USB Flash Drive", "Blu-ray Disc"], correctAnswer: 1 },
      { question: "Which of these is an example of optical media?", type: 'multiple-choice', options: ["Memory Card", "SSD", "DVD", "USB Flash Drive"], correctAnswer: 2 },
      { question: "Order these units of storage from smallest to largest: MB, TB, GB, KB.", type: 'short-answer', correctAnswer: "KB, MB, GB, TB" },
    ]
  }
};
