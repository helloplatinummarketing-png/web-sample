import { unsplash as u, images } from "./site";

export type SkillTag = "Skilled" | "Unskilled";

export type Destination = {
  slug: string;
  name: string;
  city: string;
  flag: string; // ISO 3166-1 alpha-2 for the flag image
  coords: [number, number]; // [longitude, latitude] of main city, for the globe
  image: string;
  imageAlt: string;
  summary: string;
  sectors: string[];
  processing: string; // SAMPLE average
  tags: SkillTag[];
  openRoles: number; // SAMPLE
  language: string;
};

export const NAIROBI: [number, number] = [36.8219, -1.2921];

export const destinations: Destination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    city: "London",
    flag: "gb",
    coords: [-0.1278, 51.5074],
    image: u("1513635269975-59663e0ac1ad"),
    imageAlt: "Aerial view of London and the River Thames",
    summary: "Steady demand for carers, nurses and drivers through the Health & Care and Skilled Worker routes.",
    sectors: ["Healthcare", "Social care", "Logistics"],
    processing: "8–12 weeks",
    tags: ["Skilled"],
    openRoles: 46,
    language: "IELTS / OET",
  },
  {
    slug: "germany",
    name: "Germany",
    city: "Berlin",
    flag: "de",
    coords: [13.405, 52.52],
    image: u("1560969184-10fe8719e047"),
    imageAlt: "The Brandenburg Gate in Berlin",
    summary: "Europe's largest economy is actively recruiting nurses, technicians and IT talent from abroad.",
    sectors: ["Nursing", "Engineering", "IT"],
    processing: "10–16 weeks",
    tags: ["Skilled"],
    openRoles: 38,
    language: "German A2–B1",
  },
  {
    slug: "canada",
    name: "Canada",
    city: "Toronto",
    flag: "ca",
    coords: [-79.3832, 43.6532],
    image: u("1517935706615-2717063c2225"),
    imageAlt: "Toronto skyline at sunset with the CN Tower",
    summary: "Employer-sponsored work permits in agriculture, food processing and long-haul transport.",
    sectors: ["Agriculture", "Food processing", "Transport"],
    processing: "12–24 weeks",
    tags: ["Skilled", "Unskilled"],
    openRoles: 27,
    language: "IELTS General / CELPIP",
  },
  {
    slug: "poland",
    name: "Poland",
    city: "Warsaw",
    flag: "pl",
    coords: [21.0122, 52.2297],
    image: u("1519197924294-4ba991a11128"),
    imageAlt: "Warsaw city centre at night",
    summary: "An accessible entry point to the EU with year-round warehouse, factory and welding roles.",
    sectors: ["Warehousing", "Manufacturing", "Welding"],
    processing: "8–14 weeks",
    tags: ["Skilled", "Unskilled"],
    openRoles: 64,
    language: "Basic English",
  },
  {
    slug: "japan",
    name: "Japan",
    city: "Tokyo",
    flag: "jp",
    coords: [139.6503, 35.6762],
    image: u("1540959733332-eab4deabeeaf"),
    imageAlt: "A busy Tokyo street at dusk",
    summary: "The Specified Skilled Worker programme offers long-term roles in care, food and manufacturing.",
    sectors: ["Caregiving", "Manufacturing", "Food service"],
    processing: "12–20 weeks",
    tags: ["Skilled"],
    openRoles: 19,
    language: "Japanese JLPT N4",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    city: "Dubai",
    flag: "ae",
    coords: [55.2708, 25.2048],
    image: u("1580674684081-7617fbf3d745"),
    imageAlt: "Downtown Dubai skyline with the Burj Khalifa",
    summary: "Fast hiring cycles in hospitality, retail, security and construction, often with housing included.",
    sectors: ["Hospitality", "Security", "Construction"],
    processing: "3–6 weeks",
    tags: ["Skilled", "Unskilled"],
    openRoles: 82,
    language: "Basic English",
  },
  {
    slug: "qatar",
    name: "Qatar",
    city: "Doha",
    flag: "qa",
    coords: [51.531, 25.2854],
    image: images.airport,
    imageAlt: "A traveller looking at an airport departures board",
    summary: "Opportunities in facilities management, hospitality and security, with accommodation and transport.",
    sectors: ["Hospitality", "Facilities", "Security"],
    processing: "4–8 weeks",
    tags: ["Skilled", "Unskilled"],
    openRoles: 41,
    language: "Basic English",
  },
  {
    slug: "australia",
    name: "Australia",
    city: "Sydney",
    flag: "au",
    coords: [151.2093, -33.8688],
    image: u("1506973035872-a4ec16b8e8d9"),
    imageAlt: "Sydney Harbour with the Opera House",
    summary: "Employer-sponsored Skills in Demand visas for qualified tradespeople, nurses and engineers.",
    sectors: ["Trades", "Healthcare", "Engineering"],
    processing: "12–20 weeks",
    tags: ["Skilled"],
    openRoles: 23,
    language: "IELTS / PTE",
  },
];

export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);
