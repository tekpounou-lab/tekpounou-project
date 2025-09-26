// src/types/home.ts

export interface HomePageFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    gradient: string;
  }
  
  export interface HomePageStat {
    number: string;
    label: string;
    icon: LucideIcon;
  }
  
  export interface HomePageTestimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  }