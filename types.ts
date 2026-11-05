export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  points: string[];
  icon: string;
  iconBg: string;
  location?: string;
  tags?: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string; icon_dark?: string; hover?: string; featured?: boolean }[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  color: string;
  /** Official credential validation page. Omit until available (card shows LINK PENDING). */
  url?: string;
  /** Short credential id shown on the card. */
  credentialId?: string;
  /** Subtitle under the title (e.g. "Meta Professional Certification"). */
  subtitle?: string;
  /** Where the credential is verified (button label). */
  verifyOn?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
  /** Supporting line under the number. */
  desc?: string;
}

export interface Project {
  title: string;
  description: string;
  icon: "MOBILE" | "WEB" | "BOTH";
  tags: { name: string; color: string }[];
  /** Mock-style category chips, e.g. ["AIRLINES", "CORE"]. */
  category?: string[];
}
