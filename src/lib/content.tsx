import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import heroPlants from "../assets/hero-plants.jpg";
import dealPlant from "../assets/deal-plant.jpg";

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    image: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    body: string;
    founderInitials: string;
    founderRole: string;
    founderName: string;
  };
  deals: {
    eyebrow: string;
    title: string;
    priceLabel: string;
    ctaLabel: string;
    image: string;
  };
};

const DEFAULTS: SiteContent = {
  hero: {
    eyebrow: "Welcome to PotnPlant",
    title: "Green thumbs\nbelong here.",
    body: "POTPLANT is your everything garden centre for plants in Kenya. We enhance life and beauty of your indoor and outdoor spaces through selected plants. At POTPLANT KENYA our services and products are tailored to suit your everyday gardening needs.",
    ctaLabel: "Shop all plants",
    image: heroPlants,
  },
  journey: {
    eyebrow: "Welcome to PotnPlant",
    title: "Our journey to dreams",
    body: "Empowering all people to be plant people — a collection of notes from our team of plant experts across a variety of plant care topics, to grow the confidence of the next generation of plant parents.",
    founderInitials: "P.N.",
    founderRole: "Founder / CEO",
    founderName: "Peter Njoroge",
  },
  deals: {
    eyebrow: "Highlight items",
    title: "Deals of the day",
    priceLabel: "Only Ksh. 25",
    ctaLabel: "Only Ksh. 25",
    image: dealPlant,
  },
};

const KEY = "potnplant.content.v1";

type Ctx = {
  content: SiteContent;
  update: <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) => void;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setContent({
          hero: { ...DEFAULTS.hero, ...parsed.hero },
          journey: { ...DEFAULTS.journey, ...parsed.journey },
          deals: { ...DEFAULTS.deals, ...parsed.deals },
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      content,
      update: (section, patch) => {
        setContent((prev) => {
          const next = { ...prev, [section]: { ...prev[section], ...patch } };
          try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
          return next;
        });
      },
      reset: () => {
        setContent(DEFAULTS);
        try { localStorage.removeItem(KEY); } catch { /* ignore */ }
      },
    }),
    [content],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
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
