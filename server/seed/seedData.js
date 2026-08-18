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
    title: 'PulseAnalytics - Real-time SaaS Telemetry Platform',
    description: 'An enterprise analytics observability suite providing live metric streaming, custom dashboarding widgets, and automated anomaly alert thresholds processing over 10M events daily.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Tailwind CSS', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/example/pulse-analytics',
    liveUrl: 'https://pulse-analytics-demo.com',
    featured: true,
  },
  {
    title: 'CloudVault - Zero-Knowledge Distributed Storage',
    description: 'A client-side encrypted cloud backup and collaboration application with instant file sharing, cryptographic key derivation, and multi-cloud sync capabilities.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'WebCrypto API'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/example/cloud-vault',
    liveUrl: 'https://cloudvault-demo.com',
    featured: true,
  },
  {
    title: 'DevSphere - Interactive Developer Knowledge Hub',
    description: 'Community-driven coding tutorial and snippet repository featuring live in-browser code execution, syntax highlighting, and interactive algorithmic visualizations.',
    technologies: ['React', 'Vite', 'Express.js', 'MongoDB', 'Docker Engine', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/example/devsphere',
    liveUrl: 'https://devsphere-hub.com',
    featured: true,
  },
  {
    title: 'OmniFlow - AI Workflow Automation Engine',
    description: 'Visual low-code pipeline orchestrator that chains AI models, webhook triggers, and third-party APIs into resilient automated backend background tasks.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/example/omniflow-automation',
    liveUrl: 'https://omniflow-demo.com',
    featured: false,
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
