/**
 * Single source of truth for portfolio profile, projects, skills, and social profiles.
 * Preserves 100% of authentic facts without fabrication.
 */

export const OWNER = {
  name: "Talha Salman",
  role: "Full Stack Web Developer & MERN Specialist",
  shortRole: "Full Stack Web Developer",
  location: "Karachi, Pakistan",
  countryCode: "PK",
  locality: "Karachi",
  email: "talhasalman@example.com", // Form routes via Web3Forms securely
  availability: "Available for freelance contracts, remote roles & technical consultations",
  bio: "Full Stack Web Developer specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications.",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/talhadev30",
      handle: "talhadev30",
      label: "GitHub Profile",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/m-talha-salman-66832839b",
      handle: "m-talha-salman-66832839b",
      label: "LinkedIn Profile",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/talha.dev30/",
      handle: "talha.dev30",
      label: "Instagram Profile",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61589720709211",
      handle: "talha.salman",
      label: "Facebook Profile",
    },
  ],
};

export const PROJECTS = [
  {
    id: "banking-system",
    title: "Online Banking System",
    category: "Full Stack Application",
    tech: ["React.js", "Node.js", "Express", "Tailwind CSS", "JWT Auth"],
    description:
      "A secure, responsive banking portal featuring real-time account balances, fund transfers, transaction histories, and protected user authentication flows. Built with scalable REST APIs and modern React state management.",
    liveLink: "https://talha-banking-system.vercel.app/",
    image: "/project1.png",
    alt: "Online Banking System Web Application Screenshot",
  },
  {
    id: "restaurant-website",
    title: "Restaurant & Food Ordering Platform",
    category: "E-Commerce & Hospitality",
    tech: ["React", "JavaScript (ES6+)", "Tailwind CSS", "GSAP Animations"],
    description:
      "An engaging web platform for food ordering and culinary showcases. Features dynamic category filtering, interactive shopping cart simulation, smooth page animations, and an optimized mobile layout.",
    liveLink: null,
    image: "/product2.png",
    alt: "Modern Restaurant and Food Ordering Web Application Screenshot",
  },
  {
    id: "school-management-portal",
    title: "School Management System Portal",
    category: "Management Dashboard",
    tech: ["React", "Node.js", "MySQL / MongoDB", "Express", "REST APIs"],
    description:
      "A comprehensive institutional management system with role-based dashboards for students, teachers, and administrators. Supports enrollment tracking, attendance logging, and academic performance reporting.",
    liveLink: null,
    image: "/product3.png",
    alt: "School Management System Web Portal Screenshot",
  },
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "PHP"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vite", "Vercel"],
  },
];

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Works", path: "/work" },
  { name: "Info", path: "/info" },
  { name: "Contact", path: "/contact" },
];

