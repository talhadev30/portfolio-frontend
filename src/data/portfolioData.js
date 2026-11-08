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
  bio: "Web developer in Karachi who builds websites and web apps with React, Node.js, Express, and MongoDB.",
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
      "A banking app with account balances, transfers, and transaction history. It uses React, Node.js, and secure sign-in.",
    liveLink: "https://talha-banking-system.vercel.app/",
    image: "/project1.webp",
    alt: "Online Banking System Web Application Screenshot",
  },
  {
    id: "restaurant-website",
    title: "Restaurant & Food Ordering Platform",
    category: "E-Commerce & Hospitality",
    tech: ["React", "JavaScript (ES6+)", "Tailwind CSS", "GSAP Animations"],
    description:
      "A restaurant site with a menu, food filters, and a shopping cart demo. It also has page animations and a mobile layout.",
    liveLink: null,
    image: "/product2.webp",
    alt: "Modern Restaurant and Food Ordering Web Application Screenshot",
  },
  {
    id: "school-management-portal",
    title: "School Management System Portal",
    category: "Management Dashboard",
    tech: ["React", "Node.js", "MySQL / MongoDB", "Express", "REST APIs"],
    description:
      "A school portal with separate dashboards for students, teachers, and staff. It tracks enrollment, attendance, and grades.",
    liveLink: null,
    image: "/product3.webp",
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

