import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import heroPlants from "../assets/hero-plants.jpg";
import catTerrarium from "../assets/cat-terrarium.jpg";
import catSucculents from "../assets/cat-succulents.jpg";
import catPotter from "../assets/cat-potter.jpg";
import catHanging from "../assets/cat-hanging.jpg";

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    image: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      icon: string;
      points: string[];
    }[];
  };
  categories: {
    eyebrow: string;
    title: string;
    items: {
      name: string;
      count: number;
      image: string;
      className?: string;
    }[];
  };
  productsSection: {
    allLabel: string;
    newLabel: string;
    saleLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    phone: string;
    email: string;
    location: string;
    formTitle: string;
    buttonLabel: string;
  };
};

export const DEFAULTS: SiteContent = {
  hero: {
    eyebrow: "Welcome to PotnPlant",
    title: "POTnPLANT",
    body: "PotnPlant is your everything garden centre for plants in Kenya. We enhance life and beauty of your indoor and outdoor spaces through selected plants. At PotnPlant KENYA our services and products are tailored to suit your everyday gardening needs.",
    ctaLabel: "Shop Plants",
    image: heroPlants,
  },

  services: {
    eyebrow: "What We Offer",
    title: "Our Services",
    items: [
      {
        title: "Rent a Potted Plant",
        icon: "🪴",
        points: [
          "We provide beautiful, well-nurtured plants to create a refreshing and lively environment.",
          "We cater for homes, events, and office spaces.",
          "We source and stock a wide selection of healthy indoor and outdoor plants.",
          "We install, maintain, and replace plants according to specific needs.",
        ],
      },
      {
        title: "Plant Care",
        icon: "🌿",
        points: [
          "Our gardeners understand the essence of a healthy plant.",
          "Soil, water, light, and environment affect plant growth.",
          "We ensure your plants are cared for according to their unique needs.",
        ],
      },
      {
        title: "Hire a Gardener",
        icon: "👨‍🌾",
        points: [
          "Our experienced gardeners provide customized care to your garden.",
          "We ensure your plants remain healthy and vibrant.",
          "We help improve your living spaces.",
        ],
      },
    ],
  },

  categories: {
    eyebrow: "Our Products",
    title: "Product Categories",
    items: [
      {
        name: "Indoor Potted Plants",
        count: 13,
        image: catTerrarium,
        className: "md:row-span-2",
      },
      {
        name: "Outdoor Potted Plants",
        count: 3,
        image: catSucculents,
      },
      {
        name: "Plant Stands",
        count: 6,
        image: catPotter,
      },
      {
        name: "Compost Soil",
        count: 1,
        image: catHanging,
      },
      {
        name: "Gardening Tools",
        count: 6,
        image: catPotter,
      },
    ],
  },

  productsSection: {
    allLabel: "All Products",
    newLabel: "New Arrivals",
    saleLabel: "Sale",
  },

  contact: {
    eyebrow: "Get in touch",
    title: "Contact Us",
    body:
      "Need plants for your home, office, event, or garden? Reach out and we will help you choose the right plants and care service.",
    phone: "+254 788 727 645",
    email: "info@potnplant.co.ke",
    location: "Nairobi, Kenya",
    formTitle: "Send us a message",
    buttonLabel: "Send message",
  },
};

const KEY = "potnplant.content.v1";

type Ctx = {
  content: SiteContent;
  update: <K extends keyof SiteContent>(
    section: K,
    patch: Partial<SiteContent[K]>
  ) => void;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

function mergeContent(saved: Partial<SiteContent>): SiteContent {
  return {
    hero: {
      ...DEFAULTS.hero,
      ...saved.hero,
    },
    services: {
      ...DEFAULTS.services,
      ...saved.services,
      items: saved.services?.items ?? DEFAULTS.services.items,
    },
    categories: {
      ...DEFAULTS.categories,
      ...saved.categories,
      items: saved.categories?.items ?? DEFAULTS.categories.items,
    },
    productsSection: {
      ...DEFAULTS.productsSection,
      ...saved.productsSection,
    },
    contact: {
      ...DEFAULTS.contact,
      ...saved.contact,
    },
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? mergeContent(JSON.parse(raw)) : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  const value = useMemo<Ctx>(
    () => ({
      content,

      update: (section, patch) => {
        setContent((prev) => {
          const next = {
            ...prev,
            [section]: {
              ...prev[section],
              ...patch,
            },
          };

          try {
            localStorage.setItem(KEY, JSON.stringify(next));
          } catch {
            // ignore storage errors
          }

          return next;
        });
      },

      reset: () => {
        setContent(DEFAULTS);

        try {
          localStorage.removeItem(KEY);
        } catch {
          // ignore storage errors
        }
      },
    }),
    [content]
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);

  if (!ctx) {
    throw new Error("useContent must be used inside ContentProvider");
  }

  return ctx;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}