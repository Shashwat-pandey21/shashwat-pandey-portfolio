const adminUser = {
  name: 'Admin Developer',
  email: 'admin@portfolio.com',
  password: 'Admin@123456',
  role: 'admin',
};

const profileData = {
  name: 'Shashwat Pandey',
  title: 'MERN Stack Developer',
  bio: 'I’m an AI & Data Science student passionate about full-stack development and problem solving. I enjoy building practical web applications and working with technologies like React, Node.js, Express.js, and MongoDB. I’m constantly learning, building projects, and improving my skills to become a strong software engineer.',
  profileImage: '/profile.jpg',
  email: 'pandeyshashwat@gmail.com',
  phone: '+91 98765 43210',
  location: 'India',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  resumeUrl: 'https://example.com/resume.pdf',
};

const skillsData = [
  {
    name: 'JavaScript / TypeScript',
    category: 'Programming Languages',
    proficiency: 95,
    icon: 'Code2',
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    proficiency: 88,
    icon: 'Terminal',
  },
  {
    name: 'Go (Golang)',
    category: 'Programming Languages',
    proficiency: 80,
    icon: 'Cpu',
  },
  {
    name: 'React.js / Next.js',
    category: 'Frontend',
    proficiency: 96,
    icon: 'Layout',
  },
  {
    name: 'Tailwind CSS / UI Design',
    category: 'Frontend',
    proficiency: 92,
    icon: 'Palette',
  },
  {
    name: 'Redux & State Management',
    category: 'Frontend',
    proficiency: 90,
    icon: 'Layers',
  },
  {
    name: 'Node.js / Express.js',
    category: 'Backend',
    proficiency: 94,
    icon: 'Server',
  },
  {
    name: 'RESTful & GraphQL APIs',
    category: 'Backend',
    proficiency: 92,
    icon: 'Network',
  },
  {
    name: 'MongoDB & Mongoose',
    category: 'Database',
    proficiency: 90,
    icon: 'Database',
  },
  {
    name: 'PostgreSQL / Redis',
    category: 'Database',
    proficiency: 86,
    icon: 'HardDrive',
  },
  {
    name: 'Docker & Kubernetes',
    category: 'Tools & Technologies',
    proficiency: 85,
    icon: 'Boxes',
  },
  {
    name: 'Git, CI/CD & AWS Cloud',
    category: 'Tools & Technologies',
    proficiency: 89,
    icon: 'Cloud',
  },
];

const projectsData = [
  {
    title: 'Voting App — Full-Stack Online Voting System',
    description: 'A secure full-stack online voting application built with Node.js, Express.js, MongoDB, and JWT authentication. The application supports voter registration and login, candidate management, secure authentication, password hashing, role-based authorization, and admin-controlled candidate operations.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'REST API'],
    category: 'Full-Stack Web Application',
    features: [
      'User registration and secure login portal',
      'Stateless JWT authentication and authorization',
      'Cryptographic password hashing with bcrypt',
      'Role-based access control (Admin vs Voter)',
      'Voter management and ballot validation',
      'Candidate registration, profiles, and management',
      'Admin-only candidate operations (Create, Update, Delete)',
      'Protected backend routes with token verification',
      'RESTful API architecture with Mongoose data modeling',
    ],
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'BookSphere — Book Recommendation System',
    description: 'A book recommendation web application that recommends books based on user preferences and book data using Python and machine learning techniques. The application provides an interactive interface through Flask and uses data processing and similarity-based recommendation techniques.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Flask'],
    category: 'Machine Learning / Full-Stack Application',
    features: [
      'Personalized book recommendations based on user preferences',
      'Data preprocessing and exploratory data analysis with Pandas',
      'Similarity-based recommendation algorithms using Scikit-learn',
      'Search-based book discovery and keyword matching',
      'Lightweight Python Flask backend API service',
      'Interactive and responsive web interface',
    ],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'CravMap — Restaurant Recommendation Platform',
    description: 'A restaurant recommendation platform designed to help users discover suitable restaurants based on their preferences, search filters, and location requirements with backend API integration.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    category: 'Full-Stack Web Application',
    features: [
      'Restaurant discovery with comprehensive menu details',
      'Preference-based dining recommendations',
      'Search, cuisine tags, and category filtering',
      'Detailed restaurant profiles, hours, and location data',
      'Responsive React frontend user interface',
      'Express and Node.js REST API integration',
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Weather App — Real-Time Weather Application',
    description: 'A responsive weather application that fetches real-time weather information using a weather API. Users can search for a location and view current weather conditions through a clean and responsive interface.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    category: 'Frontend / API Integration',
    features: [
      'City-based real-time weather search',
      'Live temperature, humidity, and wind speed data',
      'Weather condition indicators and dynamic icons',
      'Clean, accessible, and responsive user interface',
      'Third-party OpenWeather REST API integration',
      'Client-side error handling and invalid city alerts',
    ],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: true,
  },
];

const experienceData = [
  {
    company: 'Nexus Cloud Technologies',
    role: 'Senior Full Stack Software Engineer',
    startDate: 'Mar 2022',
    endDate: 'Present',
    description: 'Architected and deployed high-concurrency microservices, improving end-to-end API latency by 42%. Mentored a team of 6 engineers and spearheaded modern React component design system adoption across all web properties.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'AWS', 'Tailwind CSS'],
  },
  {
    company: 'Apex Digital Solutions',
    role: 'Full Stack Web Developer',
    startDate: 'Jul 2019',
    endDate: 'Feb 2022',
    description: 'Developed and maintained 15+ client web platforms and internal admin dashboards. Reduced database query latency by 35% through indexing and aggregate query optimizations.',
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
];

const educationData = [
  {
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science (B.S.)',
    field: 'Computer Science & Software Engineering',
    startYear: '2015',
    endYear: '2019',
    grade: '3.85 / 4.0 GPA (Magna Cum Laude)',
    description: 'Specialized in Distributed Systems, Computer Networks, and Human-Computer Interaction. President of the Web Development Society.',
  },
];

const contactMessagesData = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techrecruiting.io',
    subject: 'Senior Full-Stack Role Opportunity at TechScale',
    message: 'Hi Ethan, I was really impressed by your PulseAnalytics platform and open source contributions. We have an exciting Senior Full-Stack role that aligns perfectly with your skill set. Would you be open for a brief 15-minute intro chat this week?',
    isRead: false,
  },
  {
    name: 'David Zhao',
    email: 'david@fintechventures.com',
    subject: 'Consulting Inquiry for Cloud Architecture',
    message: 'Hello Ethan, we love your work on distributed storage architectures. We are currently looking for an expert contractor to audit and optimize our Express/MongoDB infrastructure. Let us know your availability.',
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
