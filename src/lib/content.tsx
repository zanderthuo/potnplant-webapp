import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import heroPlants from "../assets/hero-plants.jpg";

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    image: string;
  };
};

const DEFAULTS: SiteContent = {
  hero: {
    eyebrow: "Welcome to PotnPlant",
    title: "POTNPLANT",
    body:
      "PotnPlant is your complete garden centre for plants in Kenya. We enhance the beauty of indoor and outdoor spaces through carefully selected plants, gardening products, and professional plant care services tailored to your needs.",
    ctaLabel: "Shop Plants",
    image: heroPlants,
  },
};

const KEY = "potnplant.content.v1";

type Ctx = {
  content: SiteContent;
  update: (
    section: keyof SiteContent,
    patch: Partial<SiteContent[keyof SiteContent]>
  ) => void;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);

      if (raw) {
        const parsed = JSON.parse(raw);

        setContent({
          hero: {
            ...DEFAULTS.hero,
            ...parsed.hero,
          },
        });
      }
    } catch {
      // ignore local storage errors
    }
  }, []);

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