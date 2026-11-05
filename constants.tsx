import { Coffee, FolderGit2, SmilePlus, UserStar } from "lucide-react";
import {
  Certification,
  Experience,
  Project,
  SkillCategory,
  Stat,
} from "./types";

export const CHATBOT_ENABLED: boolean = false; // To Display chatbot or not (Set to true to enable)
// Define your career start date (Year, Month Index (0-11), Day)
const START_DATE = new Date(2018, 4, 17); // May 17, 2018

const calculateExperience = (startDateStr: Date): string => {
  const start = new Date(startDateStr);
  const today = new Date();

  // HARDCODED VALUE: Define your career gap in months directly here
  const CAREER_GAP_MONTHS = 5;

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();

  // 1. Convert the hardcoded gap into years and months
  const gapYears = Math.floor(CAREER_GAP_MONTHS / 12);
  const gapMonths = CAREER_GAP_MONTHS % 12;

  // 2. Subtract the gap units directly from the initial difference
  years -= gapYears;
  months -= gapMonths;

  // 3. Fix day shifting logic for months that aren't "full" yet
  if (days < 0) {
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  // 4. Handle negative month values (borrows 12 months from years if needed)
  if (months < 0) {
    years--;
    months += 12;
  }

  // Safety guard: Prevent negative experience if the gap is larger than total tenure
  if (years < 0) {
    return "0";
  }

  return `${years}${days === 0 && months === 0 ? "" : "+"}`;
};

// Replace with actual contact info or keep as placeholders
export const CONTACT_INFO = {
  phone: "+918248947601",
  whatsapp: "+918248947601",
  email: "sharann172@gmail.com",
  linkedin: "https://linkedin.com/in/sharann-n",
};

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    title: "Software Development Engineer 3",
    company: "IQVIA",
    date: "Nov 2026 - Present",
    location: "Chennai, India",
    iconBg: "#383E56",
    icon: "images/iqvia.png",
    points: [
      "Architected scalable technical infrastructure for distributed healthcare analytics platforms and enterprise-level clinical trial management software.",
      "Engineered low-latency dashboards optimized for processing real-world evidence (RWE), patient health trends, and high-frequency longitudinal workflows.",
      "Optimized multi-tier clinical portals and healthcare provider networks to guarantee enterprise scalability and lag-free, high-concurrency user interactions.",
      "Partnered with cross-functional international life sciences stakeholders to translate complex medical and commercial requirements into robust technical architectures.",
    ],
    tags: [
      "Data Workflows",
      "Dashboards",
      "Healthcare Analytics",
      "Technical Leadership",
      "Angular & TypeScript",
    ],
  },
  {
    id: "2",
    title: "Technology Lead",
    company: "Infosys Limited",
    date: "Dec 2023 - Nov 2026",
    location: "Chennai, India",
    iconBg: "#383E56",
    icon: "images/infosys.png",
    points: [
      "Leading technical initiatives for major capital group projects and complex investor platforms.",
      "Developing high-performance dashboards for stock analysis and high-frequency analytical workflows.",
      "Ensuring enterprise scalability and lag-free user interactions across multi-tier client portals.",
      "Collaborating with international stakeholders to translate complex business needs into technical reality.",
    ],
    tags: [
      "Enterprise Dashboards",
      "Stock Analytics",
      "Technical Leadership",
      "Angular & TypeScript",
      "High Concurrency",
    ],
  },
  {
    id: "3",
    title: "Senior Data Analyst",
    company: "Chainsys India Private Limited",
    date: "May 2021 - July 2023",
    location: "Chennai, India",
    iconBg: "#E6DEDD",
    icon: "images/chainsys.png",
    points: [
      "Analyzed large datasets to drive strategic enterprise decision-making and operational execution.",
      "Built 'SmartApp Builder' to automate dynamic layout generation through intuitive drag-and-drop mechanisms.",
      "Integrated complex database systems (CouchDB, Postgres) with responsive user-facing interfaces.",
      "Optimized data retrieval workflows and queries for multi-tenant enterprise clients.",
    ],
    tags: [
      "SmartApp Builder",
      "CouchDB",
      "Postgres",
      "Drag-and-Drop Engine",
      "Data Workflows",
    ],
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "GoDB Tech Private Limited",
    date: "May 2018 - May 2021",
    location: "Chennai, India",
    iconBg: "#383E56",
    icon: "images/godb.png",
    points: [
      "Developed the 'Hatsun Service Ticket' system deployed across 6 Indian languages for agricultural logistics.",
      "Implemented advanced image-loading techniques and high-res caching for low-bandwidth mobile web portals.",
      "Managed end-to-end full-stack development cycles from relational database layers to reactive UI components.",
      "Published, updated, and maintained critical enterprise applications on the Google Play Store.",
    ],
    tags: [
      "Ionic Framework",
      "Angular",
      "Multi-Language (6 Indic)",
      "Play Store Release",
      "NodeJS & MySQL",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      {
        name: "JavaScript (ES6+)",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      },
      {
        name: "TypeScript",
        hover: "#00ff66",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css/663399" },
      { name: "SASS / SCSS", icon: "https://cdn.simpleicons.org/sass/CC6699" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      {
        name: "Angular (v2 - v18+)",
        icon: "https://cdn.simpleicons.org/angular/DD0031",
      },
      {
        name: "Ionic Framework",
        icon: "https://cdn.simpleicons.org/ionic/3880FF",
      },
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      {
        name: "Bootstrap",
        icon: "https://cdn.simpleicons.org/bootstrap/7952B3",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      {
        name: "CouchDB",
        icon: "https://cdn.simpleicons.org/apachecouchdb/E31937",
      },
    ],
  },
  {
    title: "Tools & AI",
    skills: [
      {
        name: "VS Code",
        hover: "#00e5ff",
        icon: "https://static.cdnlogo.com/logos/v/82/visual-studio-code.svg",
      },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
      {
        name: "Power BI",
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
      },
      {
        name: "Claude",
        icon: "https://static.cdnlogo.com/logos/c/63/claude-ai.svg",
      },
      {
        name: "GitHub Copilot",
        hover: "#00ff66",
        icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github-copilot/light.svg",
        icon_dark:
          "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github-copilot/dark.svg",
      },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Claude Certified Developer Foundations",
    issuer: "Anthropic",
    date: "2026",
    subtitle: "Anthropic AI Certification",
    description:
      "Validates building, integrating, and shipping AI applications and agents using Anthropic's ecosystem.",
    color: "from-red-400 to-stone-500",
    credentialId: "16733380-d470",
    verifyOn: "Credly",
    url: "https://www.credly.com/badges/16733380-d470-4cd0-a900-a3081e871b98/linked_in_profile",
  },
  {
    title: "Claude Certified Architect - Professional",
    issuer: "Anthropic",
    date: "2026",
    subtitle: "Anthropic AI Systems Architecture",
    description:
      "Validates designing, leading, and optimizing enterprise-scale AI deployments with proper governance.",
    color: "from-pink-400 to-indigo-500",
    credentialId: "358b6c8b-eef6",
    verifyOn: "Credly",
    url: "https://www.credly.com/badges/358b6c8b-eef6-43a7-829a-8c83ed674b26/linked_in_profile",
  },
  {
    title: "Claude Certified Architect Foundations",
    issuer: "Anthropic",
    date: "2026",
    subtitle: "Anthropic AI Core Architecture",
    description:
      "Validates designing and building production-grade AI applications using Anthropic's developer toolkit.",
    color: "from-green-400 to-yellow-500",
    credentialId: "fe891164-c704",
    verifyOn: "Credly",
    url: "https://www.credly.com/badges/fe891164-c704-4378-8db9-4a99f1160fef/linked_in_profile",
  },
  {
    title: "Front-End Developer - React",
    issuer: "Meta",
    date: "2026",
    subtitle: "Meta Professional Certification",
    description:
      "Deep dive into hooks, patterns, and high-performance frontend architecture.",
    color: "from-blue-400 to-emerald-500",
    credentialId: "DAT8HU5YZA7L",
    verifyOn: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/DAT8HU5YZA7L",
  },
];

const CAREER_START_LABEL_TITLE = START_DATE.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** "MAY 17, 2018" - derived from START_DATE so the label can never drift from the calculation. */
export const CAREER_START_LABEL = CAREER_START_LABEL_TITLE.toUpperCase();

export const STATS: Stat[] = [
  {
    label: "Years Experience",
    value: calculateExperience(START_DATE),
    icon: UserStar,
    color: "text-blue-500",
    // text built from START_DATE; years themselves are never typed here
    desc: `Calculated since career inception on ${CAREER_START_LABEL_TITLE} (GoDB Tech \u2192 Chainsys \u2192 Infosys \u2192 IQVIA SDE 3).`,
  },
  {
    label: "Projects Completed",
    value: "14+",
    icon: FolderGit2,
    color: "text-violet-500",
    desc: "Full-lifecycle architectural delivery spanning United Airlines, Capital Groups, Allianz, Hatsun, and global SaaS.",
  },
  {
    label: "Happy Clients",
    value: "7+",
    icon: SmilePlus,
    color: "text-fuchsia-500",
    desc: "Long-standing partnerships across Fortune 500 aviation, international banking, multi-state logistics, and financial underwriters.",
  },
  {
    label: "Coffee Consumed",
    value: "\u221E",
    icon: Coffee,
    color: "text-emerald-500",
    desc: "Unbounded focus and relentless drive powering high-precision system refactorings and resilient frontend execution.",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Navigator - United Airlines",
    description:
      "Sophisticated internal tool designed for United call center agents to streamline management of complex passenger bookings and service requests, replacing legacy systems and reducing call times.",
    icon: "WEB",
    category: ["AIRLINES", "CORE"],
    tags: [
      { name: "Angular", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "CSS", color: "text-cyan-400" },
    ],
  },
  {
    title: "TOPS - Capital Groups",
    description:
      "Comprehensive real-time and historical stock analysis platform for all companies, market trends tracking, and intuitive investor analytics built with lag-free rendering.",
    icon: "WEB",
    category: ["FINTECH", "ANALYTICS"],
    tags: [
      { name: "Angular", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "SASS", color: "text-cyan-400" },
    ],
  },
  {
    title: "SmartApp Builder",
    description:
      "Dynamic click-and-drag layout generation engine from data objects for web and mobile entry, view, and list pages. Bridges dynamic schema directly into running UI.",
    icon: "BOTH",
    category: ["DRAG-AND-DROP"],
    tags: [
      { name: "Angular", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "CouchDB", color: "text-cyan-400" },
      { name: "Postgres", color: "text-cyan-400" },
    ],
  },
  {
    title: "Hatsun Service Ticket",
    description:
      "Multi-tenant farmer ticket resolution system across 6 Indian languages with advanced image-loading, web portals, and live Play Store production deployment.",
    icon: "MOBILE",
    category: ["DAIRY", "OUTLETS"],
    tags: [
      { name: "Ionic", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "NodeJs", color: "text-cyan-400" },
      { name: "MySQL", color: "text-cyan-400" },
    ],
  },
  {
    title: "Alliance Insurance",
    description:
      "Secure Vehicle Loan Policy Details entry system featuring client-side encryption mechanisms for sensitive financial transmission and rapid underwriter evaluation.",
    icon: "WEB",
    category: ["POLICY", "ENGINE"],
    tags: [
      { name: "Angular", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "CSS", color: "text-cyan-400" },
    ],
  },
  {
    title: "Tata AIG General",
    description:
      "Home Loan Policy Details entry system with encrypted data transmission, high-res claim forms, and seamless backend underwriting pipeline integration.",
    icon: "WEB",
    category: ["POLICY", "ENGINE"],
    tags: [
      { name: "Angular", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-cyan-400" },
      { name: "CSS", color: "text-cyan-400" },
    ],
  },
];
