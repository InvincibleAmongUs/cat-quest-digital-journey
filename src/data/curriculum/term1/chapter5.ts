
import { Chapter } from '@/types/curriculum';
import { TextBlock, HeadingBlock, ImageBlock, QuizBlock } from '@/components/lessons/ContentBlockRenderer';

export const chapter5: Chapter = {
  id: "C5",
  title: "Practical Computer Management: Interacting with Your System",
  learningObjectives: [
    "Perform correct startup and shutdown procedures.",
    "Effectively manage files and folders (create, copy, move, delete, rename, search).",
    "Understand and use the Recycle Bin/Trash.",
    "Adjust basic operating system settings (desktop background, screen resolution, date/time).",
    "Understand the basic process of installing and uninstalling software.",
    "Manage printers (set default, view print queue).",
  ],
  lessons: [
    {
      id: "5.1",
      title: "Starting Up and Shutting Down Your Computer",
      focus: "The correct and safe ways to turn a computer on and off.",
      contentBlocks: [
        { type: 'heading', content: { text: "Powering Up and Down Safely", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Proper startup and shutdown procedures ensure data integrity and system stability. Startup involves powering on and the OS loading. Shutdown involves closing applications and turning off the power via OS commands." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch2_figure_2_12_minimise_button.png", alt: "Minimise button (related to window management)", caption: "Figure 5.1.1: Window controls are part of OS interaction" } } as ImageBlock, // Example image related to OS interaction
      ],
    },
    {
      id: "5.2",
      title: "File Management Essentials: Folders and Files",
      focus: "Organizing digital information by creating and manipulating folders and files.",
      contentBlocks: [
        { type: 'heading', content: { text: "Organizing Your Digital Life", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Effective file management involves creating a logical folder structure, naming files descriptively, and regularly organizing your data. Actions include creating, renaming, and deleting files/folders." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch3_table_3_1_rename_files.png", alt: "Rename files table", caption: "Table 5.2.1: Steps to Rename Files/Folders" } } as ImageBlock,
      ],
    },
    {
      id: "5.3",
      title: "Moving, Copying, and Finding Your Files",
      focus: "Manipulating files between locations and searching for them.",
      contentBlocks: [
        { type: 'heading', content: { text: "Moving, Copying, and Searching", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Copying creates a duplicate while moving relocates the original. Operating systems provide search tools to locate files by name, type, or content." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch3_table_3_2_copy_paste_files.png", alt: "Copy paste files table", caption: "Table 5.3.1: How to Copy and Paste Files" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch3_table_3_3_move_files.png", alt: "Move files table", caption: "Table 5.3.2: How to Move Files" } } as ImageBlock,
      ],
    },
    {
      id: "5.4",
      title: "The Recycle Bin / Trash & Basic OS Customization",
      focus: "Understanding the safety net of the Recycle Bin and personalizing the desktop environment.",
      contentBlocks: [
        { type: 'heading', content: { text: "Recycle Bin and Customization", level: 2 } } as HeadingBlock,
        { type: 'text', content: "The Recycle Bin (or Trash) temporarily stores deleted files, allowing recovery. Basic OS customization includes changing desktop background, screen resolution, and system date/time." } as TextBlock,
        { type: 'image', content: { src: "src/utils/images/ch3_table_3_4_use_recycle_bin.png", alt: "Use recycle bin table", caption: "Table 5.4.1: Using the Recycle Bin" } } as ImageBlock,
        { type: 'image', content: { src: "src/utils/images/ch2_figure_2_7_desktop_components.png", alt: "Desktop components", caption: "Figure 5.4.1: Common Desktop Components for Customization" } } as ImageBlock,
      ],
    },
    {
      id: "5.5",
      title: "Software Installation & Uninstallation, Printer Management",
      focus: "Basic software lifecycle and managing print jobs.",
      contentBlocks: [
        { type: 'heading', content: { text: "Managing Software and Printers", level: 2 } } as HeadingBlock,
        { type: 'text', content: "Installing software involves running an installer program. Uninstalling should be done via the OS to remove all components. Printer management includes setting a default printer and managing print queues." } as TextBlock,
      ],
    },
  ],
  chapterQuiz: {
    questions: [
      { question: "What is the primary purpose of the Recycle Bin/Trash?", type: 'multiple-choice', options: ["To permanently delete files", "To store backups of all files", "To temporarily hold deleted files for possible recovery", "To compress large files"], correctAnswer: 2 },
      { question: "True or False: It is generally safe to turn off a computer by holding down the power button without shutting down through the OS.", type: 'true-false', correctAnswer: 0 },
      { question: "To change the desktop background, you would typically go to the computer's ______ settings.", type: 'short-answer', correctAnswer: "display or personalization" },
    ]
  }
};
