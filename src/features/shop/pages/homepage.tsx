import { Mail, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";
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

const PRODUCTS_PER_PAGE = 8;

export default function HomePage() {
  const [tab, setTab] = useState<ProductTab>("all");

  const { content } = useContent();
  const { hero } = content;

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
      <OurServices />
      <CategorySection />
      <ProductsSection tab={tab} setTab={setTab} products={list} />
      <ContactSection />
    </StoreLayout>
  );
}

function HeroSection({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section id="home" className="relative scroll-mt-24 bg-secondary/60">
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

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="/shop"
              className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-leaf-deep"
            >
              {hero.ctaLabel}
            </a>

            <a
              href="#services"
              className="text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              View services
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
        </div>
      </div>
    </section>
  );
}

function OurServices() {
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
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="text-center">
        <p className="eyebrow">What We Offer</p>

        <h2 className="mt-3 font-display text-5xl">Our Services</h2>

        {/* <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          We provide quality plants, professional plant care services, gardening
          support, and beautiful green solutions for homes, offices, events, and
          outdoor spaces.
        </p> */}
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
      name: "Indoor Potted Plants",
      count: 13,
      className: "md:row-span-2",
    },
    {
      img: catSucculents,
      name: "Outdoor Potted Plants",
      count: 3,
    },
    {
      img: catPotter,
      name: "Plant Stands",
      count: 6,
    },
    {
      img: catHanging,
      name: "Compost Soil",
      count: 1,
    },
    {
      img: catPotter,
      name: "Gardening Tools",
      count: 6,
    },
  ];

  return (
    <section id="categories" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="text-center">
        <p className="eyebrow">Our Products</p>
        <h2 className="mt-3 font-display text-5xl">Product Categories</h2>
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
  const [page, setPage] = useState(1);

  const tabs: { key: ProductTab; label: string }[] = [
    { key: "all", label: "All Products" },
    { key: "new", label: "New Arrivals" },
    { key: "sale", label: "Sale" },
  ];

  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handleTabChange = (selectedTab: ProductTab) => {
    setTab(selectedTab);
    setPage(1);
  };

  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-10 font-display text-2xl md:text-3xl">
        {tabs.map((item, index) => (
          <Fragment key={item.key}>
            {index > 0 && <span className="text-muted-foreground/40">|</span>}

            <button
              type="button"
              onClick={() => handleTabChange(item.key)}
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
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`grid h-10 w-10 place-items-center border text-sm transition ${
                  page === pageNumber
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-muted/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 font-display text-5xl">Contact Us</h2>

          <p className="mt-6 max-w-md text-muted-foreground">
            Need plants for your home, office, event, or garden? Reach out and
            we will help you choose the right plants and care service.
          </p>

          <div className="mt-8 space-y-5">
            <ContactItem
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              value="+254 143 513 999"
              href="tel:+254143513999"
            />

            <ContactItem
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value="info@potnplant.co.ke"
              href="mailto:info@potnplant.co.ke"
            />

            <ContactItem
              icon={<MapPin className="h-5 w-5" />}
              title="Location"
              value="Nairobi, Kenya"
            />
          </div>
        </div>

        <div className="border border-border bg-card p-8">
          <h3 className="font-display text-2xl">Send us a message</h3>

          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <input
              type="tel"
              placeholder="Phone number"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <textarea
              rows={5}
              placeholder="Tell us what you need..."
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:text-primary">
        {content}
      </a>
    );
  }

  return content;
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