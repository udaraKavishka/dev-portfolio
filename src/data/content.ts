
import {
    Github,
    Linkedin,
    Mail,
    Twitter,
    Laptop,
    Code,
    Globe,
    GraduationCap,
    Calendar,
    Facebook,
    Instagram
} from 'lucide-react';

export const heroData = {
    name: "Udara Nalawansa",
    tagline: "Designing Scalable Systems Through Software, Cloud, and Automation",
    // bio: "Passionate about cloud infrastructure, automation, continuous delivery, and MLOps, designing resilient CI/CD pipelines, containerized workloads, and infrastructure as code while building machine learning driven solutions that reflect my dedication to technology, innovation, and effective problem solving.",
    bio:"Passionate about software engineering, cloud infrastructure, automation, continuous delivery, and MLOps, with a focus on designing resilient CI/CD pipelines, building scalable and maintainable applications, deploying containerized workloads, and implementing infrastructure as code. Actively developing machine learning driven solutions that combine solid engineering practices with data driven insights, reflecting a strong dedication to technology, innovation, and effective problem solving.",
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
}

export const projectsData: ProjectItem[] = [
    {
        id: 1,
        title: 'TaskFlow | Task Management System (MERN Stack)',
        description: 'Taskflow is an efficient and user-friendly task management system designed to help individuals and teams organize, track, and manage their tasks seamlessly.',
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Redux', 'Material UI', 'JWT',],
        githubUrl: 'https://github.com/udaraKavishka/IT22242024taskflow',
        // liveUrl: 'https://example.com',
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
        // liveUrl: 'https://example.com',
    },
    {
        id: 4,
        title: 'CeylonRoots',
        description: 'A travel platform that showcases Sri Lanka’s cultural heritage while offering features like itinerary customization, bookings, and customer support with smooth frontend and backend integration.',
        techStack: ['Next.js', 'React', 'Spring Boot', 'Java', 'MySQL', 'Tailwind'],
        githubUrl: 'https://github.com/udaraKavishka/CeylonRoots',
    },
    {
        id: 5,
        title: 'ParaWrite',
        description: 'A text paraphrasing tool that enables sentence by sentence editing with efficient processing and a clean, user friendly interface for improving written content.',
        techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
        githubUrl: 'https://github.com/udaraKavishka/ParaWrite',
    },
    {
        id: 6,
        title: 'DevOps Portfolio Website',
        description: 'A modern, professional portfolio website showcasing my skills, projects, and experience as a DevOps engineer, built with Next.js and deployed on Vercel for optimal performance and scalability.',
        techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Vercel'],
        githubUrl: 'https://github.com/udaraKavishka/dev-portfolio',
        liveUrl: 'https://udaradev.me',

    },
    // {
    //     id: 6,
    //     title: 'CI/CD Project – Production Grade Blog Deployment',
    //     description: 'A production ready deployment of a blog application using container orchestration, automated integration tests, security checks, artifact management, and performance monitoring.',
    //     techStack: ['AWS EKS', 'Docker', 'Jenkins or GitHub Actions', 'Nexus', 'SonarQube', 'Trivy', 'Prometheus', 'Grafana', 'Kubernetes'],
    //     githubUrl: 'https://github.com',
    //     liveUrl: 'https://example.com',
    // },
    //     {
    //     id: 6,
    //     title: 'Advanced CI/CD Pipeline Implementation',
    //     description: 'A fully automated CI/CD pipeline integrating version control, builds, testing, security scanning, and deployments with a focus on scalability and robustness.',
    //     techStack: ['GitHub Actions or Jenkins', 'Docker', 'Kubernetes', 'SonarQube', 'Trivy', 'Nexus', 'Terraform or Ansible'],
    //     githubUrl: 'https://github.com',
    //     liveUrl: 'https://example.com',
    // },
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
        // description: 'Focused on cloud computing, distributed systems, and software engineering.',
    },
    {
        degree: 'School Education',
        institution: 'St. Joseph\'s College, Colombo 10',
        period: '2020',
    },
    // {
    //     degree: 'Certified Kubernetes Administrator (CKA)',
    //     institution: 'Cloud Native Computing Foundation',
    //     period: '2023',
    // },
];

export const clubsData = [
    { name: 'Interact: Rotary Sponsored Club', role: 'Member' },
    { name: 'General Knowledge Club of St Josephs College', role: 'Board Member' },
    { name: 'Commerce Union of St Josephs College', role: 'Member' },
    { name: 'Christian Society', role: 'President' },
    { name: 'Sri Lanka University Catholic Students Movement (SLUCSM)', role: 'University of Vavuniya Representative' },
    { name: 'ZeroPlastic Movement of University of Vavuniya', role: 'Member' },
    { name: 'IEEE Student Branch of University of Vavuniya', role: 'Member' },
    { name: 'ITCS | Information Technology & Computing Society', role: 'Member' },
    { name: 'AIESEC in University of Vavuniya', role: 'Committee Member' },

    // { name: 'Gavel Club', role: 'Member' },

];


export const setupData = [
    {
        title: 'Hardware',
        icon: Laptop,
        items: [
            { name: 'Laptop', value: 'Aspire A515-56(i3-i3-1115G4, 12GB RAM, 512 SSD, 1TB HDD)' },
            // { name: 'Monitor', value: 'ViewSonic VA2732-H 27" FHD IPS' },
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
            // { name: 'Online IDE', value: 'CodeSandbox, StackBlitz' },
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
            // { name: 'Email Client', value: 'MailSpring' },
            { name: 'Ad Blocker', value: 'uBlock Origin' },
            { name: 'Messaging + Cloud Storage', value: 'Telegram, WhatsApp' },
            { name: 'Media Server', value: 'Jellyfin' },
            // { name: 'Movies & TV Shows Tracker', value: 'Trakt.tv, Simkl' },
            { name: 'Note Taking', value: 'Notion' },
        ],
    },
];

export const contactData = {
    socialLinks: [
        { icon: Github, href: 'https://github.com/udaraKavishka', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/udaranalawansa/', label: 'LinkedIn' },
        // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Mail, href: 'mailto:hello@udaradev.me', label: 'Email' },
        { icon: Facebook, href: 'https://web.facebook.com/udara.nalawansa/', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/_udara27', label: 'Instagram' },
    ]
};
