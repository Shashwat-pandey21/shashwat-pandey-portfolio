const adminUser = {
  name: 'Admin Developer',
  email: 'admin@portfolio.com',
  password: 'Admin@123456',
  role: 'admin',
};

const profileData = {
  name: 'Shashwat Pandey',
  title: 'Full-Stack Developer | AI & Data Science Student',
  bio: 'I’m a B.Tech student specializing in Artificial Intelligence and Data Science with a strong interest in full-stack web development and problem solving. I enjoy building practical web applications and developing backend systems using technologies such as Node.js, Express.js, MongoDB, and REST APIs. I’m also consistently improving my Data Structures and Algorithms skills through problem solving and LeetCode.',
  profileImage: '/profile.jpg',
  email: 'pandeyshashwat510@gmail.com',
  phone: '',
  location: 'Greater Noida, Uttar Pradesh, India',
  github: 'https://github.com/Shashwat-pandey21',
  linkedin: 'https://www.linkedin.com/in/shashwat-pandey-b596a732a/',
  leetcode: 'https://leetcode.com/u/shashwatpandey_21/',
  twitter: '',
  resumeUrl: '/resume.pdf',
};

const skillsData = [
  // Programming Languages
  {
    name: 'C++',
    category: 'Programming Languages',
    proficiency: 90,
    label: 'Primary Language (DSA & Problem Solving)',
    icon: 'Code',
  },
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    proficiency: 88,
    label: 'Core Web Language',
    icon: 'FileCode',
  },
  {
    name: 'HTML',
    category: 'Programming Languages',
    proficiency: 90,
    label: 'Markup Language',
    icon: 'Globe',
  },
  {
    name: 'CSS',
    category: 'Programming Languages',
    proficiency: 85,
    label: 'Styling & Layouts',
    icon: 'Palette',
  },

  // Core CS
  {
    name: 'Data Structures & Algorithms',
    category: 'Core CS',
    proficiency: 90,
    label: 'Core CS Subject (450+ LeetCode Solved)',
    icon: 'Cpu',
  },
  {
    name: 'Object-Oriented Programming',
    category: 'Core CS',
    proficiency: 88,
    label: 'Core CS Subject',
    icon: 'Boxes',
  },
  {
    name: 'Database Management Systems',
    category: 'Core CS',
    proficiency: 86,
    label: 'Core CS Subject',
    icon: 'Database',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    proficiency: 90,
    label: 'Backend Runtime',
    icon: 'Server',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    proficiency: 90,
    label: 'Backend Framework',
    icon: 'Layers',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    proficiency: 92,
    label: 'API Architecture & Integration',
    icon: 'Network',
  },
  {
    name: 'JWT Authentication',
    category: 'Backend',
    proficiency: 88,
    label: 'Security & Auth',
    icon: 'Shield',
  },

  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    proficiency: 75,
    label: 'Currently Learning',
    icon: 'Layout',
  },

  // Databases
  {
    name: 'MongoDB',
    category: 'Database',
    proficiency: 88,
    label: 'NoSQL Database',
    icon: 'Database',
  },
  {
    name: 'MySQL',
    category: 'Database',
    proficiency: 84,
    label: 'Relational Database',
    icon: 'HardDrive',
  },
  {
    name: 'SQL',
    category: 'Database',
    proficiency: 86,
    label: 'Query Language',
    icon: 'FileCode',
  },

  // Tools & Technologies
  {
    name: 'Git',
    category: 'Tools & Technologies',
    proficiency: 88,
    label: 'Version Control',
    icon: 'GitBranch',
  },
  {
    name: 'GitHub',
    category: 'Tools & Technologies',
    proficiency: 88,
    label: 'Code Collaboration',
    icon: 'Github',
  },
  {
    name: 'Postman',
    category: 'Tools & Technologies',
    proficiency: 90,
    label: 'API Development & Testing Tool',
    icon: 'Send',
  },
  {
    name: 'VS Code',
    category: 'Tools & Technologies',
    proficiency: 92,
    label: 'Code Editor',
    icon: 'Terminal',
  },
];

const projectsData = [
  {
    title: 'BookSphere',
    description: 'BookSphere is a book recommendation system developed using Python and machine learning libraries to process book data and provide book recommendations.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Flask'],
    category: 'Machine Learning / Web Application',
    features: [
      'Book recommendation processing',
      'Data preprocessing with Pandas and NumPy',
      'Recommendation algorithm using Scikit-learn',
      'Search-based book discovery',
      'Flask backend web service',
      'Interactive and responsive web interface',
    ],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Online Voting Application',
    description: 'A full-stack voting application backend built using Node.js, Express.js, MongoDB, JWT authentication, and bcrypt. It provides user authentication, role-based authorization, candidate management, and voting functionality through REST APIs.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'REST APIs', 'Postman'],
    category: 'Full-Stack / Backend',
    features: [
      'User registration',
      'User login',
      'JWT authentication',
      'Password hashing',
      'Role-based authorization',
      'Admin and Voter roles',
      'Candidate CRUD',
      'Vote casting',
      'One-vote-per-user protection',
      'Protected routes',
      'MongoDB integration',
    ],
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'URL Shortener',
    description: 'A URL-shortening platform built using Node.js, Express.js, MongoDB, and EJS. It supports custom short links, URL redirection, authentication, and click analytics.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'REST APIs', 'MVC Architecture'],
    category: 'Full-Stack / Backend',
    features: [
      'URL shortening',
      'Custom short links',
      'URL redirection',
      'User authentication',
      'Click analytics',
      'MongoDB persistence',
      'REST APIs',
      'MVC architecture',
    ],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Weather App',
    description: 'A responsive weather application that uses the OpenWeather API to retrieve and display weather information for searched locations.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    category: 'Frontend / API Integration',
    features: [
      'Search weather by location',
      'Real-time weather data',
      'API integration',
      'Responsive interface',
    ],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  },
];

const experienceData = [
  {
    company: 'Personal & Academic Projects',
    role: 'Student Developer',
    startDate: '2023',
    endDate: 'Present',
    description: 'Building full-stack and backend applications while continuously improving software development, problem solving, and Data Structures & Algorithms skills through personal and academic projects.',
    technologies: ['C++', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React.js', 'REST APIs', 'Postman'],
  },
];

const educationData = [
  {
    institution: 'Galgotias College of Engineering & Technology',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    field: 'Artificial Intelligence & Data Science',
    startYear: '2023',
    endYear: 'Present',
    grade: '',
    description: 'Undergraduate curriculum specializing in Artificial Intelligence, Data Science, Data Structures & Algorithms, Object-Oriented Programming, and Database Management Systems.',
  },
];

const contactMessagesData = [
  {
    name: 'Rohit Sharma',
    email: 'rohit.sharma@example.com',
    subject: 'Collaboration on Full-Stack / Backend Project',
    message: 'Hi Shashwat, I came across your Online Voting Application and URL Shortener repositories. Great work on the backend architecture and authentication flow! Would love to connect and discuss potential collaboration.',
    isRead: false,
  },
  {
    name: 'Priya Verma',
    email: 'priya.verma@techconnect.io',
    subject: 'Internship Opportunity Inquiry',
    message: 'Hello Shashwat, we reviewed your projects and LeetCode profile. Your problem solving and backend skills with Node.js and MongoDB look impressive. We would like to invite you for an initial chat regarding a Software Engineering Internship opportunity.',
    isRead: true,
  },
];

module.exports = {
  adminUser,
  profileData,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  contactMessagesData,
};
