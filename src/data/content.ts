import {
    Github,
    Linkedin,
    Mail,
    Laptop,
    Code,
    Globe,
    Facebook,
    Instagram
} from 'lucide-react';

export const heroData = {
    name: "Udara Nalawansa",
    roles: [
        "Final Year Undergraduate",
        "DevOps Enthusiast",
        "Full Stack Developer",
        "Software Engineer",
        "Cloud Practitioner",
        "MLOps Engineer"
    ],
    tagline: "Designing Scalable Systems Through Software, Cloud, and Automation",
    bio: "Passionate about software engineering, cloud infrastructure, automation, continuous delivery, and MLOps, with a focus on designing resilient CI/CD pipelines, building scalable and maintainable applications, deploying containerized workloads, and implementing infrastructure as code. Actively developing machine learning driven solutions that combine solid engineering practices with data driven insights, reflecting a strong dedication to technology, innovation, and effective problem solving.",
    techStack: [
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '☸️' },
        { name: 'AWS', icon: '☁️' },
        { name: 'Terraform', icon: '🏗️' },
        { name: 'Python', icon: '🐍' },
        { name: 'ML', icon: '🤖' },
        { name: 'Jenkins', icon: '🔧' },
        { name: 'Linux', icon: '🐧' },
    ],
    profileImage: "/profile.jpg",
    socialLinks: [
        { icon: Github, href: 'https://github.com/udaraKavishka', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/udaranalawansa/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:hello@udaradev.me', label: 'Email' },
    ]
};

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
    isOngoing?: boolean;
}

export const projectsData: ProjectItem[] = [
    {
        id: 1,
        title: 'TaskFlow | Task Management System (MERN Stack)',
        description: 'Taskflow is an efficient and user-friendly task management system designed to help individuals and teams organize, track, and manage their tasks seamlessly.',
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Redux', 'Material UI', 'JWT',],
        githubUrl: 'https://github.com/udaraKavishka/IT22242024taskflow',
    },
    {
        id: 2,
        title: 'URL Shortener (Go)',
        description: 'A simple and fast URL shortening service built with Go, Gin, and Redis. This project provides endpoints for generating short links and redirecting to the original URLs.',
        techStack: ['Go', 'Gin Web Framework', 'Redis', 'Docker'],
        githubUrl: 'https://github.com/udaraKavishka/URL-Shortner',
    },
    {
        id: 3,
        title: 'TrackNGo',
        description: 'A public transportation solution providing real time bus tracking, route guidance, fare estimation, and lost and found management to enhance commuter convenience and safety.',
        techStack: ['MongoDB', "Express.js", 'React', 'Node.js', 'Socket.io', 'JavaScript', 'Mongoose', 'JWT'],
        githubUrl: 'https://github.com/TrackNGo',
    },
    {
        id: 4,
        title: 'CeylonRoots',
        description: 'A travel platform that showcases Sri Lanka s cultural heritage while offering features like itinerary customization, bookings, and customer support with smooth frontend and backend integration.',
        techStack: ['Next.js', 'React', 'Spring Boot', 'Java', 'MySQL', 'Tailwind'],
        githubUrl: 'https://github.com/udaraKavishka/CeylonRoots',
    },
    {
        id: 5,
        title: 'ParaWrite',
        description: 'A text paraphrasing tool that enables sentence by sentence editing with efficient processing and a clean, user friendly interface for improving written content.',
        techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
        githubUrl: 'https://github.com/udaraKavishka/ParaWrite',
        liveUrl: 'https://parawrite.udaradev.me',

    },
    {
        id: 6,
        title: 'DevOps Portfolio Website',
        description: 'A modern, professional portfolio website showcasing my skills, projects, and experience as a DevOps engineer, built with Next.js and deployed on Vercel for optimal performance and scalability.',
        techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Vercel'],
        githubUrl: 'https://github.com/udaraKavishka/dev-portfolio',
        liveUrl: 'https://udaradev.me',
    },
    {
        id: 7,
        title: 'Efficient Campus Navigation — Smart Shortest Path System for University of Vavuniya',
        description: 'A smart navigation system for the University of Vavuniya campus that predicts travel times and computes the shortest paths, enhancing efficiency for students, staff, and visitors.(Incharge of the Model)',
        techStack: ['Python', 'Pandas', 'NumPy', 'scikit-learn (Random Forest)', 'NetworkX', 'Tkinter', 'Pillow (PIL)', 'Dijkstra', 's', 'Algorithm'],
        githubUrl: 'https://github.com/DilmyPerera/Efficient-Campus-Navigation',
    },
    {
        id: 8,
        title: 'Modern Portfolio — Responsive Personal Website',
        description: 'A sleek, fully responsive personal portfolio website built to showcase projects, skills, and technology interests with modern UI design and smooth navigation.',
        techStack: ['React', 'Tailwind CSS', 'Figma', 'React Scroll', 'SVG Icons'],
        githubUrl: 'https://github.com/udaraKavishka/modern-portfolio',
        liveUrl: 'https://udara-portfolio.vercel.app/'
    },
    {
        id: 9,
        title: 'DevOps and AI: Building Production-Ready RAG Systems',
        description: 'An ongoing DevOps &U+0078  AI project implementing a RAG-based API with FastAPI and a local LLM. Designed to evolve into a production-ready system with Docker, Kubernetes, and automated workflows.',
        techStack: ['FastApi', 'Kubernetes', 'ChromaDB', 'Ollama', 'tinyllma', 'SwaggerUI', 'Docker'],
        githubUrl: 'https://github.com/udaraKavishka/devops-ai-rag-api',
        isOngoing: true
    }
];

export const skillsData = [
    // Cloud and DevOps
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'Containerization' },
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'Docker Compose', category: 'Containerization' },
    { name: 'Podman', category: 'Containerization' },

    // CI/CD
    { name: 'Jenkins', category: 'CI/CD' },
    { name: 'GitHub Actions', category: 'CI/CD' },
    { name: 'Nexus', category: 'CI/CD' },
    { name: 'SonarQube', category: 'CI/CD' },
    { name: 'Trivy', category: 'CI/CD' },
    { name: 'GitLab CI', category: 'CI/CD' },
    { name: 'ArgoCD', category: 'CI/CD' },

    // Infrastructure as Code
    { name: 'Terraform', category: 'IaC' },
    { name: 'Ansible', category: 'IaC' },

    // Monitoring and Logging
    { name: 'Prometheus', category: 'Monitoring' },
    { name: 'Grafana', category: 'Monitoring' },
    { name: 'ELK Stack', category: 'Monitoring' },

    // Programming and Scripting
    { name: 'Python', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'JavaScript', category: 'Programming' },
    { name: 'Bash', category: 'Programming' },
    { name: 'Go', category: 'Programming' },

    // Frontend
    { name: 'React.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'TailwindCSS', category: 'Frontend' },

    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'Spring Boot', category: 'Backend' },

    // Databases
    { name: 'MongoDB', category: 'Database' },
    { name: 'MySQL', category: 'Database' },

    // Tools and Collaboration
    { name: 'Git', category: 'Tools' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'Figma', category: 'Tools' },
    { name: 'Trello', category: 'Tools' },
    { name: 'Huly', category: 'Tools' },
];

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    description?: string;
}

export const educationData: EducationItem[] = [
    {
        degree: 'Bachelor of Science Honours in Information Technology',
        institution: 'University of Jaffna ( Vavuniya University )',
        period: '2022 - Present',
        description: 'Focused on software engineering, cloud computing, distributed systems, and machine learning. Actively involved in various technical projects and leadership roles.',
    },
    {
        degree: 'School Education',
        institution: 'St. Joseph\'s College, Colombo 10',
        period: '2020',
        description: 'Completed Advanced Level examination in Commerce stream with strong foundation in statistics.',
    },
];

interface ClubItem {
    name: string;
    role: string;
    description?: string;
}

export const clubsData: ClubItem[] = [
    { 
        name: 'Interact: Rotary Sponsored Club', 
        role: 'Member',
        description: 'Participated in community service initiatives and youth development programs.'
    },
    { 
        name: 'General Knowledge Club of St Josephs College', 
        role: 'Board Member',
        description: 'Organized debates, quizzes, and knowledge-sharing sessions for students.'
    },
    { 
        name: 'Commerce Union of St Josephs College', 
        role: 'Member',
        description: 'Engaged in business-related activities and entrepreneurship events.'
    },
    { 
        name: 'Christian Society', 
        role: 'President',
        description: 'Led spiritual activities and community outreach programs for the university.'
    },
    { 
        name: 'Sri Lanka University Catholic Students Movement (SLUCSM)', 
        role: 'University of Vavuniya Representative',
        description: 'Represented the university in national-level religious and social activities.'
    },
    { 
        name: 'ZeroPlastic Movement of University of Vavuniya', 
        role: 'Member',
        description: 'Promoted environmental sustainability and plastic-free initiatives on campus.'
    },
    { 
        name: 'IEEE Student Branch of University of Vavuniya', 
        role: 'Member',
        description: 'Participated in technical workshops, hackathons, and IEEE-sponsored events.'
    },
    { 
        name: 'ITCS | Information Technology & Computing Society', 
        role: 'Member',
        description: 'Contributed to IT-related events, workshops, and student projects.'
    },
    { 
        name: 'AIESEC in University of Vavuniya', 
        role: 'Committee Member',
        description: 'Contributed in designing posts and Flyers.'
    },
    { 
        name: 'Leo Club of University of Vavuniya', 
        role: 'Chief Editor',
        description: 'Managed content creation and publication for club newsletters and Flyer materials.'
    },
];

interface CertificateItem {
    title: string;
    issuer: string;
    date?: string;
    description?: string;
    link?: string;
}

export const certificatesData: CertificateItem[] = [
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Expected 2026',
        description: 'Foundation-level understanding of AWS Cloud services and architecture.',
        link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
    },
    {
        title: 'Docker & Kubernetes: The Complete Guide',
        issuer: 'Udemy',
        date: '2024',
        description: 'Comprehensive training in container orchestration and deployment strategies.',
        link: 'https://www.udemy.com/certificate/example123/'
    },
    {
        title: 'DevOps Fundamentals',
        issuer: 'Linux Foundation',
        date: '2024',
        description: 'Core concepts of DevOps practices, CI/CD pipelines, and automation.',
        link: 'https://www.linuxfoundation.org/'
    },
];

export const achievementsData: CertificateItem[] = [
    {
        title: 'Best Final Year Project Nominee',
        issuer: 'University of Vavuniya',
        date: '2025',
        description: 'Nominated for the innovative smart campus navigation system using machine learning.',
        link: 'https://github.com/DilmyPerera/Efficient-Campus-Navigation'
    },
    {
        title: 'Hackathon Winner - CodeFest 2024',
        issuer: 'IEEE Student Branch',
        date: '2024',
        description: 'First place in university-level hackathon for building a real-time collaboration tool.',
    },
    {
        title: 'Top Contributor - Open Source',
        issuer: 'GitHub',
        date: '2024',
        description: 'Recognized for significant contributions to open-source DevOps projects.',
        link: 'https://github.com/udaraKavishka'
    },
];
export const setupData = [
    {
        title: 'Hardware',
        icon: Laptop,
        items: [
            { name: 'Laptop', value: 'Aspire A515-56(i3-i3-1115G4, 12GB RAM, 512 SSD, 1TB HDD)' },
            { name: 'Smartphone', value: 'Pixel 5' },
            { name: 'External HDD', value: 'WD External HDD 500GB' },
        ],
    },
    {
        title: 'Software & Tools',
        icon: Code,
        items: [
            { name: 'Operating System', value: 'Omarchy 3.2.2 ( Linux 6.17.8-arch1-1 ' },
            { name: 'Shell', value: 'fish' },
            { name: 'Prompt', value: 'Starship' },
            { name: 'IDE', value: 'Visual Studio Code' },
            { name: 'VS Code Theme', value: 'Dark+' },
            { name: 'AI Pair Programmer', value: 'GitHub Copilot' },
            { name: 'Git Hosting', value: 'GitHub, GitLab' },
            { name: 'Hosting', value: 'Vercel, Netlify' },
            { name: 'API Testing', value: 'Insomnia, Postman' },
            { name: 'CDN', value: 'Cloudflare' },
            { name: 'Prototyping', value: 'Figma' },
            { name: 'Illustrations', value: 'unDraw' },
        ],
    },
    {
        title: 'Services & Apps',
        icon: Globe,
        items: [
            { name: 'Music', value: 'Spotify, YouTube Music' },
            { name: 'Password Manager', value: 'Bitwarden' },
            { name: '2FA', value: 'Ente Auth' },
            { name: 'Main Browser', value: 'Zen Browser' },
            { name: 'Secondary Browser', value: 'Vivaldi' },
            { name: 'Ad Blocker', value: 'uBlock Origin' },
            { name: 'Messaging + Cloud Storage', value: 'Telegram, WhatsApp' },
            { name: 'Media Server', value: 'Jellyfin' },
            { name: 'Note Taking', value: 'Notion' },
        ],
    },
];

export const contactData = {
    socialLinks: [
        { icon: Github, href: 'https://github.com/udaraKavishka', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/udaranalawansa/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:hello@udaradev.me', label: 'Email' },
        { icon: Facebook, href: 'https://web.facebook.com/udara.nalawansa/', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/_udara27', label: 'Instagram' },
    ]
};