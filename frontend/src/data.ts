import { PortfolioData } from './types';
import profileAvatar from './assets/images/profile_avatar_1780223061602.png';

export const mockPortfolioData: PortfolioData = {
  profile: {
    name: "Sofía Garcés",
    role: "Full-Stack Creative Engineer",
    description: "Diseño y desarrollo interfaces de usuario de alta fidelidad, con un enfoque en animaciones atractivas, código limpio y arquitecturas robustas que escalan.",
    longDescription: "Soy una desarrolladora apasionada por la convergencia entre la estética visual y el rendimiento técnico. Me especializo en ecosistemas modernos de JavaScript (React/Node.js), integración de CMS como Strapi, y animaciones avanzadas utilizando Framer Motion. Trabajo para convertir ideas complejas en productos digitales fluidos, accesibles y estéticamente extraordinarios.",
    avatarUrl: profileAvatar,
    resumeUrl: "#", // Se puede descargar el PDF simulado o real
    email: "sofia.garces@creative.dev",
    location: "Medellín, Colombia",
    status: "Disponible para Freelance y Contratos"
  },
  socials: [
    {
      platform: "github",
      url: "https://github.com",
      label: "GitHub"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com",
      label: "LinkedIn"
    },
    {
      platform: "instagram",
      url: "https://instagram.com",
      label: "Instagram"
    },
    {
      platform: "email",
      url: "mailto:sofia.garces@creative.dev",
      label: "Correo"
    }
  ],
  skills: [
    { name: "React / Next.js", category: "Frontend", level: 95, icon: "React" },
    { name: "TypeScript", category: "Frontend", level: 90, icon: "Code2" },
    { name: "Tailwind CSS", category: "Frontend", level: 98, icon: "Palette" },
    { name: "Framer Motion", category: "Frontend", level: 88, icon: "Motion" },
    { name: "Node.js (Express)", category: "Backend", level: 85, icon: "Server" },
    { name: "Strapi CMS / REST APIs", category: "Backend", level: 92, icon: "Database" },
    { name: "Unit Testing (Vitest)", category: "Tools", level: 80, icon: "TestTube" },
    { name: "Git / CI/CD", category: "Tools", level: 85, icon: "GitBranch" },
    { name: "Figma UI/UX Design", category: "Design", level: 85, icon: "Figma" },
    { name: "Prototipado Interactivo", category: "Design", level: 90, icon: "Cpu" }
  ],
  education: [
    {
      institution: "Universidad Nacional de Colombia",
      degree: "Ingeniería de Sistemas e Informática",
      duration: "2018 - 2023",
      description: "Enfoque en desarrollo de software, algoritmos avanzados, bases de datos y metodologías ágiles de ingeniería.",
      type: "education"
    },
    {
      institution: "Strapi University",
      degree: "Strapi Certified Administrator & Developer",
      duration: "2024",
      description: "Certificación oficial en modelado de contenido, APIs de contenido GraphQL/REST, middlewares personalizados e integraciones avanzadas frontend.",
      credentialUrl: "https://strapi.io",
      type: "certification"
    },
    {
      institution: "Interaction Design Foundation (IxDF)",
      degree: "Certificación Profesional UI/UX & Interaction Design",
      duration: "2023",
      description: "Estudio profundo de heurísticas de usabilidad, psicología del diseño, jerarquía tipográfica y accesibilidad WCAG.",
      type: "certification"
    }
  ],
  experience: [
    {
      company: "Estudio de Diseño Prisma",
      role: "Sénior Full-Stack Developer",
      duration: "2024 - Presente",
      description: [
        "Lideré la migración de la web institucional a una SPA de alto rendimiento con React y Strapi, incrementando la velocidad de carga en un 45%.",
        "Diseñé un completo sistema de bento-grid modular editable desde Strapi que permite a editores de contenido lanzar landing pages en minutos.",
        "Implementé microinteraciones con Motion, logrando una tasa de retención de usuario 12% más alta."
      ],
      skills: ["React", "Strapi", "TypeScript", "Framer Motion", "Tailwind CSS"]
    },
    {
      company: "TechnoInnovate S.A.",
      role: "Desarrollador React Frontend",
      duration: "2022 - 2024",
      description: [
        "Desarrollé dashboards de análisis de datos interactivos utilizando Recharts, D3 y Tailwind CSS.",
        "Contribuí al diseño del sistema de componentes interno (UI Library) logrando consistencia de marca en 3 subproductos.",
        "Escribí pruebas unitarias integrales con Vitest y React Testing Library cubriendo el 82% de la lógica clave."
      ],
      skills: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Vitest"]
    },
    {
      company: "AdVantage Studio",
      role: "Frontend Developer Junior",
      duration: "2021 - 2022",
      description: [
        "Maquetación responsiva con enfoque en accesibilidad estética y semántica para e-commerce.",
        "Iniciación e integración de CMS sin cabeza para el manejo descentralizado de publicaciones promocionales."
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "WordPress Headless"]
    }
  ]
};
