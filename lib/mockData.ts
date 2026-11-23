export interface Service {
  id: string;
  name: string;
  category: "Coupe" | "Barbe" | "Soin" | "Combo";
  price: number;
  duration: number; // in minutes
  description: string;
  popular?: boolean;
  iconName: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  experience: string;
  specialty: string;
  avatar: string;
  availableToday: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceName: string;
  barberName: string;
  date: string; // e.g. "2026-11-23" or "23 Nov 2026"
  time: string; // e.g. "14:30"
  price: number;
  status: "Confirmé" | "En attente" | "Terminé" | "Annulé";
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  appointmentsCount: number;
  lastVisit: string;
  notes?: string;
}

export const INITIAL_SERVICES: Service[] = [
  {
    id: "s1",
    name: "Coupe Classique & Finition",
    category: "Coupe",
    price: 90,
    duration: 35,
    description: "Shampoing, coupe sur mesure aux ciseaux et tondeuse, finition au rasoir et coiffage.",
    popular: true,
    iconName: "cut-outline",
  },
  {
    id: "s2",
    name: "Dégradé Américain (Fade)",
    category: "Coupe",
    price: 110,
    duration: 45,
    description: "Dégradé à blanc millimétré (low, mid, taper ou high fade) avec contours ultra précis.",
    popular: true,
    iconName: "cut-outline",
  },
  {
    id: "s3",
    name: "Taille de Barbe & Serviette Chaude",
    category: "Barbe",
    price: 70,
    duration: 30,
    description: "Sculpture de la barbe, rasage traditionnel avec serviette chaude, application d'huile nourrissante.",
    popular: true,
    iconName: "color-wand-outline",
  },
  {
    id: "s4",
    name: "Pack VIP : Coupe + Barbe + Soin",
    category: "Combo",
    price: 160,
    duration: 65,
    description: "L'expérience complète : coupe personnalisée, soin de barbe complet, serviette chaude et masque visage purifiant.",
    popular: true,
    iconName: "sparkles-outline",
  },
  {
    id: "s5",
    name: "Soin Visage Black Mask & Vapeur",
    category: "Soin",
    price: 80,
    duration: 25,
    description: "Bain de vapeur à l'ozone pour ouvrir les pores, masque noir purifiant anti-points noirs et hydratation.",
    popular: false,
    iconName: "water-outline",
  },
  {
    id: "s6",
    name: "Coloration & Camouflage Barbe",
    category: "Barbe",
    price: 85,
    duration: 30,
    description: "Camouflage naturel des poils blancs pour une barbe dense, uniforme et rajeunie.",
    popular: false,
    iconName: "color-palette-outline",
  },
  {
    id: "s7",
    name: "Coupe Enfant (-12 ans)",
    category: "Coupe",
    price: 60,
    duration: 25,
    description: "Coupe tendance et soignée adaptée aux plus jeunes dans une ambiance détendue.",
    popular: false,
    iconName: "happy-outline",
  },
];

export const INITIAL_BARBERS: Barber[] = [
  {
    id: "b1",
    name: "Karim 'The Razor' Amrani",
    role: "Master Barber & Fondateur",
    rating: 4.9,
    reviewCount: 142,
    experience: "10 ans d'expérience",
    specialty: "Dégradés complexes & Rasage traditionnel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    availableToday: true,
  },
  {
    id: "b2",
    name: "Yassine Mansouri",
    role: "Barbier Styliste Senior",
    rating: 4.8,
    reviewCount: 98,
    experience: "7 ans d'expérience",
    specialty: "Sculpture de barbe & Soins premium",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    availableToday: true,
  },
  {
    id: "b3",
    name: "Mehdi Tazi",
    role: "Artiste Coiffeur",
    rating: 4.9,
    reviewCount: 86,
    experience: "5 ans d'expérience",
    specialty: "Coupes modernes & Texturisations",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    availableToday: true,
  },
  {
    id: "b4",
    name: "Hamza El Idrissi",
    role: "Barbier Junior",
    rating: 4.7,
    reviewCount: 45,
    experience: "3 ans d'expérience",
    specialty: "Contours & Coupes classiques",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    availableToday: false,
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    clientName: "Ahmed Benali",
    clientPhone: "+212 612 345 678",
    clientEmail: "ahmed.benali@gmail.com",
    serviceName: "Coupe Classique & Finition",
    barberName: "Karim 'The Razor' Amrani",
    date: "Aujourd'hui",
    time: "10:00",
    price: 90,
    status: "Confirmé",
  },
  {
    id: "apt-2",
    clientName: "Youssef Karim",
    clientPhone: "+212 623 456 789",
    clientEmail: "youssef.karim@gmail.com",
    serviceName: "Pack VIP : Coupe + Barbe + Soin",
    barberName: "Yassine Mansouri",
    date: "Aujourd'hui",
    time: "11:30",
    price: 160,
    status: "En attente",
  },
  {
    id: "apt-3",
    clientName: "Mohamed Amine",
    clientPhone: "+212 634 567 890",
    clientEmail: "amine.med@gmail.com",
    serviceName: "Dégradé Américain (Fade)",
    barberName: "Mehdi Tazi",
    date: "Aujourd'hui",
    time: "14:00",
    price: 110,
    status: "Confirmé",
  },
  {
    id: "apt-4",
    clientName: "Omar Hassan",
    clientPhone: "+212 645 678 901",
    clientEmail: "omar.hassan@gmail.com",
    serviceName: "Taille de Barbe & Serviette Chaude",
    barberName: "Karim 'The Razor' Amrani",
    date: "Aujourd'hui",
    time: "16:00",
    price: 70,
    status: "Annulé",
  },
  {
    id: "apt-5",
    clientName: "Reda Chraibi",
    clientPhone: "+212 655 789 012",
    clientEmail: "reda.chr@gmail.com",
    serviceName: "Dégradé Américain (Fade)",
    barberName: "Mehdi Tazi",
    date: "Demain",
    time: "11:00",
    price: 110,
    status: "Confirmé",
  },
  {
    id: "apt-6",
    clientName: "Bilal Senhaji",
    clientPhone: "+212 661 234 567",
    clientEmail: "bilal.s@gmail.com",
    serviceName: "Soin Visage Black Mask & Vapeur",
    barberName: "Yassine Mansouri",
    date: "Demain",
    time: "15:30",
    price: 80,
    status: "Confirmé",
  },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Ahmed Benali",
    phone: "+212 612 345 678",
    email: "ahmed.benali@gmail.com",
    appointmentsCount: 6,
    lastVisit: "Il y a 2 semaines",
    notes: "Préfère le rasoir coupe-chou avec serviette tiède.",
  },
  {
    id: "c2",
    name: "Youssef Karim",
    phone: "+212 623 456 789",
    email: "youssef.karim@gmail.com",
    appointmentsCount: 4,
    lastVisit: "Il y a 1 mois",
    notes: "Peau sensible, huile eucalyptus.",
  },
  {
    id: "c3",
    name: "Mohamed Amine",
    phone: "+212 634 567 890",
    email: "amine.med@gmail.com",
    appointmentsCount: 9,
    lastVisit: "Il y a 10 jours",
    notes: "Client régulier, Mid Fade avec raie sur le côté.",
  },
  {
    id: "c4",
    name: "Omar Hassan",
    phone: "+212 645 678 901",
    email: "omar.hassan@gmail.com",
    appointmentsCount: 2,
    lastVisit: "Il y a 3 mois",
  },
  {
    id: "c5",
    name: "Reda Chraibi",
    phone: "+212 655 789 012",
    email: "reda.chr@gmail.com",
    appointmentsCount: 5,
    lastVisit: "Il y a 3 semaines",
  },
];

export const SALON_INFO = {
  name: "MY BARBER SHOP",
  tagline: "L'art du rasage et de la coiffure masculine d'exception",
  address: "142 Boulevard d'Anfa, Casablanca",
  phone: "+212 522 88 99 00",
  whatsapp: "+212 661 00 11 22",
  openingHours: "Mardi - Dimanche : 10h00 - 21h00 (Fermé Lundi)",
  instagram: "@mybarbershop_officiel",
};
