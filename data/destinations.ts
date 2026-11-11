import { u } from "./site";

/** SAMPLE destination data: confirm figures with the client before launch. */
export type SkillTag = "Skilled" | "Unskilled";

export type Destination = {
  slug: string;
  country: string;
  city: string; // the node on the globe
  flag: string; // ISO 3166-1 alpha-2 (flag-icons)
  lat: number;
  lng: number;
  region: "europe" | "middle-east" | "asia-pacific" | "north-america";
  sectors: string[];
  salary: string;
  processing: string;
  openRoles: number;
  tags: SkillTag[];
  image: string;
  imageAlt: string;
};

export const destinations: Destination[] = [
  {
    slug: "uk", country: "United Kingdom", city: "London", flag: "gb", lat: 51.507, lng: -0.128, region: "europe",
    sectors: ["Care work", "Nursing", "HGV driving"], salary: "£24k – £38k / yr", processing: "8 – 12 weeks", openRoles: 46,
    tags: ["Skilled"], image: u("1513635269975-59663e0ac1ad"), imageAlt: "London skyline along the River Thames",
  },
  {
    slug: "germany", country: "Germany", city: "Berlin", flag: "de", lat: 52.52, lng: 13.405, region: "europe",
    sectors: ["Nursing", "IT", "Electrical trades"], salary: "€2,600 – €4,200 / mo", processing: "10 – 16 weeks", openRoles: 31,
    tags: ["Skilled"], image: u("1560969184-10fe8719e047"), imageAlt: "Brandenburg Gate in Berlin",
  },
  {
    slug: "canada", country: "Canada", city: "Toronto", flag: "ca", lat: 43.653, lng: -79.383, region: "north-america",
    sectors: ["Agriculture", "Food processing", "Trucking"], salary: "CA$17 – CA$28 / hr", processing: "12 – 20 weeks", openRoles: 24,
    tags: ["Skilled", "Unskilled"], image: u("1517935706615-2717063c2225"), imageAlt: "Toronto skyline at dusk",
  },
  {
    slug: "poland", country: "Poland", city: "Warsaw", flag: "pl", lat: 52.23, lng: 21.012, region: "europe",
    sectors: ["Warehousing", "Welding", "Manufacturing"], salary: "PLN 4,800 – 7,500 / mo", processing: "6 – 10 weeks", openRoles: 58,
    tags: ["Unskilled", "Skilled"], image: u("1519197924294-4ba991a11128"), imageAlt: "Old town street in Poland",
  },
  {
    slug: "japan", country: "Japan", city: "Tokyo", flag: "jp", lat: 35.676, lng: 139.65, region: "asia-pacific",
    sectors: ["Caregiving (Kaigo)", "Food service", "Construction"], salary: "¥190k – ¥260k / mo", processing: "16 – 24 weeks", openRoles: 19,
    tags: ["Skilled"], image: u("1540959733332-eab4deabeeaf"), imageAlt: "Tokyo street lit up at night",
  },
  {
    slug: "uae", country: "United Arab Emirates", city: "Dubai", flag: "ae", lat: 25.205, lng: 55.271, region: "middle-east",
    sectors: ["Hospitality", "Security", "Retail"], salary: "AED 1,800 – 4,500 / mo", processing: "3 – 6 weeks", openRoles: 72,
    tags: ["Unskilled", "Skilled"], image: u("1580674684081-7617fbf3d745"), imageAlt: "Dubai skyline with modern towers",
  },
  {
    slug: "qatar", country: "Qatar", city: "Doha", flag: "qa", lat: 25.285, lng: 51.531, region: "middle-east",
    sectors: ["Security", "Hospitality", "Facilities"], salary: "QAR 1,500 – 4,000 / mo", processing: "4 – 6 weeks", openRoles: 40,
    tags: ["Unskilled", "Skilled"], image: u("1436491865332-7a61a109cc05"), imageAlt: "Aircraft wing above the clouds",
  },
  {
    slug: "australia", country: "Australia", city: "Sydney", flag: "au", lat: -33.869, lng: 151.209, region: "asia-pacific",
    sectors: ["Electrical", "Aged care", "Meat processing"], salary: "A$28 – A$45 / hr", processing: "12 – 20 weeks", openRoles: 17,
    tags: ["Skilled"], image: u("1506973035872-a4ec16b8e8d9"), imageAlt: "Sydney Opera House and harbour",
  },
];

export const NAIROBI = { lat: -1.286, lng: 36.817 };

export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);
