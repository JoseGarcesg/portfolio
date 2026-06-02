export interface Profile {
  name: string;
  role: string;
  description: string;
  longDescription: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  location: string;
  status: string; // e.g. "Available for projects"
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools' | 'Other';
  level: number; // 0 to 100
  icon: string; // Lucide icon name
}

export interface Education {
  institution: string;
  degree: string;
  duration: string; // e.g. "2020 - 2024"
  description?: string;
  credentialUrl?: string;
  type: 'education' | 'certification';
}

export interface Experience {
  company: string;
  role: string;
  duration: string; // e.g. "2023 - Present"
  description: string[];
  skills: string[];
  logo?: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: SocialLink[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}

export interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
  useMock: boolean;
}
