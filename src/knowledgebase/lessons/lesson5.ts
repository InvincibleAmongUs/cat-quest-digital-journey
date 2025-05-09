
import { LessonData } from './types';

// Lesson 5: Digital Well-being & The Economy of Computing
export const lesson5: LessonData = {
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
};
