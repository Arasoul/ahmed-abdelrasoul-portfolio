import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: 'amit',
    company: 'AMIT Learning',
    role: 'AI & Machine Learning Intern',
    type: 'internship',
    period: 'July 2023 - March 2024',
    overview:
      'Completed an intensive AI program covering supervised and unsupervised learning, computer vision, and NLP. The program emphasized hands-on implementation — building models from scratch, training pipelines, and evaluating on real datasets rather than relying on high-level abstractions.',
    responsibilities: [
      'Designed and trained supervised models for classification and regression tasks using scikit-learn and PyTorch',
      'Built computer vision pipelines for image classification and object detection with OpenCV and deep learning architectures',
      'Developed end-to-end NLP pipelines — tokenization, vectorization, model training, and evaluation — using spaCy and custom implementations',
      'Documented experimental methodology and model performance, iterating on feature engineering and hyperparameter tuning based on validation metrics',
    ],
    achievements: [
      'Solidified foundation in deep learning frameworks — PyTorch for research-style experimentation, TensorFlow for production-oriented workflows',
      'Developed the initial prototype of AI Pharaoh (CV + NLP pipeline) as a capstone project, later evolved into a full graduation project',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'spaCy'],
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Model Evaluation'],
    projects: [
      {
        name: 'AI Pharaoh',
        description: 'Capstone project — an interactive system combining computer vision and NLP to analyze and classify Egyptian artifacts and hieroglyphic symbols.',
        technologies: ['Python', 'PyTorch', 'OpenCV'],
        link: 'https://github.com/Arasoul/AI-Pharaoh',
      },
    ],
  },
  {
    id: 'fuzetek',
    company: 'Fuzetek',
    role: 'Software Engineering Trainee',
    type: 'internship',
    period: 'July 2025 - September 2025',
    overview:
      'Developed core software engineering skills through hands-on projects in C++ and Python. The internship emphasized writing maintainable code, following OOP principles, implementing data structures from scratch, and practicing disciplined testing and debugging.',
    responsibilities: [
      'Designed and implemented OOP-based systems — a hospital management system, a chat application, and a BigInt arithmetic library — each demonstrating different aspects of software architecture',
      'Participated in code reviews focused on design decisions, edge case handling, and code clarity rather than just correctness',
      'Documented technical specifications and design rationale for each project',
    ],
    achievements: [
      'Designed a hospital management system with modular architecture separating patient management, appointment scheduling, and emergency handling into independent subsystems',
      'Built a WhatsApp-inspired chat application with user management, private/group messaging, message search, and admin controls — implementing the full data flow from user input to persistent state',
      'Created an arbitrary-precision integer arithmetic library (BigInt) with Karatsuba multiplication and full operator overloading, demonstrating algorithmic depth beyond standard coursework',
    ],
    technologies: ['C++', 'Python', 'OOP', 'Data Structures', 'Git', 'Testing'],
    skills: ['Software Engineering', 'Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Testing', 'System Design'],
    projects: [
      {
        name: 'Hospital Management System',
        description: 'OOP design project — modular C++ system separating patient management, appointment booking, and emergency handling into independent subsystems with a shared data layer.',
        technologies: ['C++', 'OOP'],
        link: 'https://github.com/Arasoul/Hospital-managment-system',
      },
      {
        name: 'Chat App',
        description: 'OOP design project — C++ chat application implementing user sessions, private/group messaging, message search, and admin controls with persistent storage.',
        technologies: ['C++', 'OOP'],
        link: 'https://github.com/Arasoul/chat--app',
      },
      {
        name: 'BigInt C++ Library',
        description: 'Algorithm design project — arbitrary-precision integer library with Karatsuba multiplication, full operator overloading, and comprehensive edge case handling.',
        technologies: ['C++', 'Algorithms'],
        link: 'https://github.com/Arasoul/BigIntProject',
      },
      {
        name: 'Image Processing Project',
        description: 'Self-directed project — PPM image manipulation library implementing filters, transformations, and color adjustments as raw matrix operations without external image processing libraries.',
        technologies: ['C++', 'Algorithms'],
        link: 'https://github.com/Arasoul/Image-Processing-Project',
      },
      {
        name: 'Trie Data Structure',
        description: 'Self-directed project — comprehensive Trie implementation with hybrid child storage, frequency-tracking autocomplete, and safe memory management.',
        technologies: ['C++', 'Data Structures'],
        link: 'https://github.com/Arasoul/TrieDataStructure',
      },
    ],
  },
  {
    id: 'dolab',
    company: 'DoLab Academy',
    role: 'Data Analysis Trainee',
    type: 'internship',
    period: 'January 2026 - April 2026',
    overview:
      'Focused on practical data analytics — cleaning, transforming, analyzing, and visualizing datasets to generate actionable business insights using SQL, Power BI, and Python.',
    responsibilities: [
      'Built automated data cleaning pipelines in Python that standardized raw datasets into analysis-ready formats, reducing manual processing time',
      'Designed Power BI dashboards translating raw data into clear business KPIs with interactive filters and drill-down capabilities',
      'Wrote SQL queries for data extraction, transformation, and aggregation across relational databases',
      'Presented analytical findings to stakeholders, translating technical results into business recommendations',
    ],
    achievements: [
      'Reduced manual data preparation time by automating cleaning and transformation steps',
      'Created dashboards adopted by the team for ongoing reporting',
    ],
    technologies: ['Power BI', 'SQL', 'Excel', 'Python'],
    skills: ['Data Cleaning', 'Data Preparation', 'Exploratory Data Analysis', 'SQL', 'Power BI', 'Data Visualization', 'Business Insights'],
  },
  {
    id: 'voidspark',
    company: 'VoidSpark Studio',
    role: 'Co-Founder',
    type: 'co-founder',
    period: 'July 2026 - Present',
    current: true,
    overview:
      'Co-founded VoidSpark Studio to design and develop intelligent interactive experiences. Responsible for defining the technical architecture, building core game systems in Unity, and researching AI-driven gameplay features.',
    responsibilities: [
      'Defined the technical architecture and development roadmap, establishing coding standards and version control workflows',
      'Designed and implemented core game systems — input handling, physics integration, scene management, and UI frameworks — in Unity with C#',
      'Prototyping AI-driven gameplay features including pathfinding, behavior trees, and procedural content generation',
      'Building reusable game frameworks to accelerate future project development',
    ],
    achievements: [
      'Designed the studio technical architecture with component-based game objects, event-driven communication, and a scriptable object data layer',
      'Built prototype projects demonstrating AI pathfinding, interactive systems, and procedural content',
    ],
    technologies: ['Unity', 'C#', 'C++', 'Game Architecture', 'Git'],
    skills: ['Game Development', 'AI for Games', 'Interactive Systems', 'Software Architecture', 'Technical Leadership', 'Rapid Prototyping'],
    projects: [
      {
        name: 'TicTacPro',
        description: 'AI game prototype — Tic-Tac-Toe with Minimax AI demonstrating game tree search and alpha-beta pruning.',
        technologies: ['C++', 'Game AI', 'Algorithms'],
        link: 'https://github.com/Arasoul/TicTacPro-Smart-XO-Game-Human-vs-AI-',
      },
      {
        name: 'Console Platformer Quest',
        description: 'Game engine prototype — ASCII platformer with physics, collision detection, level progression, and enemy AI, built without a game engine.',
        technologies: ['C++', 'Game Development'],
        link: 'https://github.com/Arasoul/Console-Platformer-Quest',
      },
      {
        name: '2048',
        description: 'Game prototype — 2048 puzzle with custom graphics, animations, and sound effects.',
        technologies: ['C#', 'Game Development'],
        link: 'https://github.com/Arasoul/2048',
      },
      {
        name: 'Tower of Hanoi',
        description: 'Game prototype — interactive Tower of Hanoi with drag-and-drop and recursive solution visualization.',
        technologies: ['C#', 'Algorithms'],
        link: 'https://github.com/Arasoul/Tower-of-Hanoi',
      },
    ],
  },
]
