export interface Project {
  id: string;
  title: string;
  kanji: string;
  category: 'All' | 'Distributed Systems' | 'Generative AI' | 'Creative Tech' | 'Full-Stack';
  badge: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architectureDetails: {
    title: string;
    points: string[];
  }[];
  links: {
    github?: string;
    live?: string;
    caseStudyText?: string;
  };
  isFeatured?: boolean;
  displayOrder?: number;
}

export const PROJECTS: Project[] = [];

