import { ShoppingCart } from "lucide-react";
import { Fragment, useMemo, useState } from "react";

import catTerrarium from "../../../assets/cat-terrarium.jpg";
import catSucculents from "../../../assets/cat-succulents.jpg";
import catPotter from "../../../assets/cat-potter.jpg";
import catHanging from "../../../assets/cat-hanging.jpg";

import { products, type Product } from "../../../lib/products";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useContent, type SiteContent } from "../../../lib/content";

type ProductTab = "all" | "new" | "sale";

export default function HomePage() {
  const [tab, setTab] = useState<ProductTab>("all");

  const { content } = useContent();
  const { hero, journey, deals } = content;

  const list = useMemo(() => {
    return products.filter((product) => {
      if (tab === "all") return true;
      if (tab === "sale") return product.tag === "SALE";
      return product.tag === "NEW";
    });
  }, [tab]);

  return (
    <StoreLayout>
      <HeroSection hero={hero} />
      <OurServices journey={journey} />
      <CategorySection />
      <ProductsSection tab={tab} setTab={setTab} products={list} />
      <DealsSection deals={deals} />
    </StoreLayout>
  );
}

function HeroSection({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section className="relative bg-secondary/60">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <p className="eyebrow">{hero.eyebrow}</p>
          </div>

          <h1 className="mt-6 whitespace-pre-line font-display text-5xl leading-[1.05] md:text-7xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-md text-muted-foreground">{hero.body}</p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="/shop"
              className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-leaf-deep"
            >
              {hero.ctaLabel}
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src={hero.image}
            alt="Hero"
            width={1600}
            height={1200}
            className="w-full"
          />

          <div className="absolute -bottom-4 right-0 hidden bg-card px-5 py-3 text-xs font-medium tracking-widest md:block">
            <span className="text-foreground">02</span>
            <span className="mx-3 inline-block h-px w-12 align-middle bg-border" />
            <span className="text-muted-foreground">03</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurServices({ journey }: { journey: SiteContent["journey"] }) {
  const services = [
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
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="eyebrow">{journey.eyebrow}</p>

        <h2 className="mt-3 font-display text-5xl">Our Services</h2>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          {journey.body}
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-border bg-card p-8 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-4xl">
              {service.icon}
            </div>

            <h3 className="mb-5 text-xl font-semibold text-primary">
              {service.title}
            </h3>

            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 font-bold text-primary">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategorySection() {
  const categories = [
    {
      img: catTerrarium,
      name: "Small Plants",
      count: 13,
      className: "md:row-span-2",
    },
    {
      img: catSucculents,
      name: "Succulents",
      count: 3,
    },
    {
      img: catPotter,
      name: "Potter Plants",
      count: 6,
    },
    {
      img: catHanging,
      name: "Terrariums",
      count: 1,
    },
    {
      img: catPotter,
      name: "Hanging",
      count: 6,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <p className="eyebrow">All kinds of plants</p>
        <h2 className="mt-3 font-display text-5xl">Discovery category</h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
        {categories.map((category) => (
          <CategoryTile
            key={category.name}
            img={category.img}
            name={category.name}
            count={category.count}
            className={category.className}
          />
        ))}
      </div>
    </section>
  );
}

function ProductsSection({
  tab,
  setTab,
  products,
}: {
  tab: ProductTab;
  setTab: (tab: ProductTab) => void;
  products: Product[];
}) {
  const tabs: { key: ProductTab; label: string }[] = [
    { key: "all", label: "All Plants" },
    { key: "new", label: "New Arrivals" },
    { key: "sale", label: "Sale" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-10 font-display text-2xl md:text-3xl">
        {tabs.map((item, index) => (
          <Fragment key={item.key}>
            {index > 0 && <span className="text-muted-foreground/40">|</span>}

            <button
              type="button"
              onClick={() => setTab(item.key)}
              className={
                tab === item.key
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-foreground"
              }
            >
              {item.label}
            </button>
          </Fragment>
        ))}
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function DealsSection({ deals }: { deals: SiteContent["deals"] }) {
  return (
    <section className="bg-muted/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative">
          <div className="absolute left-10 top-6 h-64 w-64 rounded-full bg-card" />

          <img
            src={deals.image}
            alt="Deal of the day"
            width={1200}
            height={1200}
            loading="lazy"
            className="relative mx-auto max-h-[500px] object-contain"
          />

          <span className="absolute right-4 top-16 grid h-24 w-24 place-items-center rounded-full bg-accent text-accent-foreground">
            <div className="px-2 text-center">
              <div className="font-display text-sm font-bold leading-tight">
                {deals.priceLabel}
              </div>
            </div>
          </span>
        </div>

        <div>
          <p className="eyebrow">{deals.eyebrow}</p>
          <h2 className="mt-3 font-display text-5xl">{deals.title}</h2>

          <div className="mt-10 flex flex-wrap gap-4">
            {["02", "18", "44", "09"].map((number, index) => (
              <div key={`${number}-${index}`} className="text-center">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-card font-display text-3xl">
                  {number}
                </div>

                <p className="mt-3 eyebrow">
                  {["Days", "Hours", "Mins", "Secs"][index]}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
          >
            <ShoppingCart className="h-4 w-4" />
            {deals.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  img,
  name,
  count,
  className = "",
}: {
  img: string;
  name: string;
  count: number;
  className?: string;
}) {
  return (
    <a
      href="/shop"
      className={`group relative block overflow-hidden bg-muted ${className}`}
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="h-full min-h-[260px] w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card px-6 py-3 text-center shadow-sm">
        <span className="font-display text-xl">{name}</span>
        <span className="ml-2 text-sm text-muted-foreground">( {count} )</span>
      </div>
    </a>
  );
}