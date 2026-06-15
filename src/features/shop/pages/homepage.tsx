import { Mail, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";

import catTerrarium from "../../../assets/cat-terrarium.jpg";
import catSucculents from "../../../assets/cat-succulents.jpg";
import catPotter from "../../../assets/cat-potter.jpg";
import catHanging from "../../../assets/cat-hanging.jpg";

import type { Product } from "../../../lib/products";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useContent, type SiteContent } from "../../../lib/content";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../store/productsSlice";

type ProductTab = "all" | "new" | "sale";

const PRODUCTS_PER_PAGE = 8;

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const [tab, setTab] = useState<ProductTab>("all");

  const { content } = useContent();
  const { hero } = content;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const list = useMemo(() => {
    return items.filter((product) => {
      if (tab === "all") return true;
      if (tab === "sale") return product.tag === "SALE";
      return product.tag === "NEW";
    });
  }, [items, tab]);

  return (
    <StoreLayout>
      <HeroSection hero={hero} />
      <OurServices />
      <ProductsSection
        tab={tab}
        setTab={setTab}
        products={list}
        loading={loading}
        error={error}
      />
      <ContactSection />
    </StoreLayout>
  );
}

function HeroSection({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#062d19] via-[#0f4f2b] to-[#18733d]" />
      <div className="absolute -left-32 top-8 h-96 w-96 rounded-full bg-[#4caf50]/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#f4b400]/20 blur-3xl" />
      <div className="absolute bottom-[-120px] left-1/2 h-80 w-80 rounded-full bg-[#c86b3c]/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,180,0,0.12),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#f4b400]" />
            <p className="text-xs uppercase tracking-[0.25em] text-[#f4d35e]">
              {hero.eyebrow}
            </p>
          </div>

          <h1 className="mt-6 whitespace-pre-line font-display text-5xl leading-[0.95] text-white md:text-7xl">
            {hero.title}
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-7 text-white/80"
            dangerouslySetInnerHTML={{
              __html: hero.body
                .replace(
                  /PotnPlant KENYA/g,
                  '<strong style="color:#f4b400">PotnPlant KENYA</strong>'
                )
                .replace(
                  /plants in Kenya/g,
                  '<strong style="color:#f4b400">plants in Kenya</strong>'
                )
                .replace(
                  /PotnPlant/g,
                  '<strong style="color:#f4b400">PotnPlant</strong>'
                ),
            }}
          />

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/shop"
              className="rounded-md bg-[#f4b400] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#062d19] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-[#ffd35a]"
            >
              {hero.ctaLabel}
            </a>

            <a
              href="#services"
              className="rounded-md border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
            >
              View services
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2rem] bg-[#f4b400]/20" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur">
            <img
              src={hero.image}
              alt="Hero"
              width={1600}
              height={1200}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-5xl text-[#0f4f2b]">{title}</h2>
      <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#2f7d32] via-[#8bcf7a] to-[#f4b400]" />
    </div>
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
        <>
        Our gardeners understand the essence of a healthy plant.
        <strong> Soil, water, light, and environment </strong>
        affect plant growth. We ensure your plants are cared for
        according to their unique needs.
      </>,
      ],
    },
    {
      title: "Hire a Gardener",
      icon: "👨‍🌾",
      points: [
        "Our experienced gardeners provide customized care to your garden ensuring your plants remain healthy and improve your living spaces",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-24 bg-gradient-to-b from-[#dff1de] via-[#eaf7e8] to-[#f5fbf4] px-6 py-24"
    >
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#2f7d32]/15 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-[#f4b400]/12 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow="What We Offer" title="Our Services" />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-[#2f7d32]/15 bg-white/90 p-8 text-left shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary/15 to-[#f4b400]/15 text-4xl ring-1 ring-primary/10">
                {service.icon}
              </div>

              <h3 className="mb-5 text-xl font-semibold text-[#0f4f2b] group-hover:text-primary">
                {service.title}
              </h3>

              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {service.points.map((point, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-0.5 font-bold text-primary">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
    { img: catSucculents, name: "Outdoor Potted Plants", count: 3 },
    { img: catPotter, name: "Plant Stands", count: 6 },
    { img: catHanging, name: "Compost Soil", count: 1 },
    { img: catPotter, name: "Gardening Tools", count: 6 },
  ];

  return (
    <section
      id="categories"
      className="relative overflow-hidden scroll-mt-24 bg-[#e4f4e2] px-6 py-20"
    >
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2f7d32]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow="Our Products" title="Product Categories" />

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
      </div>
    </section>
  );
}

function ProductsSection({
  tab,
  setTab,
  products,
  loading,
  error,
}: {
  tab: ProductTab;
  setTab: (tab: ProductTab) => void;
  products: Product[];
  loading: boolean;
  error: string | null;
}) {
  const [page, setPage] = useState(1);

  const tabs: { key: ProductTab; label: string }[] = [
    { key: "all", label: "All Products" },
    { key: "new", label: "New Arrivals" },
    { key: "sale", label: "Sale" },
  ];

  useEffect(() => {
    setPage(1);
  }, [tab, products.length]);

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
    <section
      id="products"
      className="relative overflow-hidden scroll-mt-24 bg-gradient-to-b from-[#e2f3df] via-[#edf8eb] to-[#f7fcf6] px-6 py-20"
    >
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#2f7d32]/15 blur-3xl" />
      <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-[#f4b400]/12 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-6 font-display text-2xl md:gap-10 md:text-3xl">
          {tabs.map((item, index) => (
            <Fragment key={item.key}>
              {index > 0 && <span className="text-primary/25">|</span>}

              <button
                type="button"
                onClick={() => handleTabChange(item.key)}
                className={
                  tab === item.key
                    ? "text-[#0f4f2b]"
                    : "text-muted-foreground/70 hover:text-primary"
                }
              >
                {item.label}
              </button>
            </Fragment>
          ))}
        </div>

        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#2f7d32] via-[#8bcf7a] to-[#f4b400]" />

        {loading && (
          <p className="mt-12 text-center text-muted-foreground">
            Loading products...
          </p>
        )}

        {!loading && error && (
          <p className="mt-12 text-center text-destructive">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No products found.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
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
                  className="inline-flex h-10 items-center gap-2 border border-primary/20 bg-white/70 px-4 text-sm text-[#0f4f2b] backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:bg-primary/10"
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
                          : "border-primary/20 bg-white/70 text-[#0f4f2b] hover:bg-primary/10"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="inline-flex h-10 items-center gap-2 border border-primary/20 bg-white/70 px-4 text-sm text-[#0f4f2b] backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:bg-primary/10"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden scroll-mt-24 bg-gradient-to-br from-[#d8eed8] via-[#eaf7e8] to-[#f9f5df]"
    >
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#2f7d32]/15 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#f4b400]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Get in touch
          </p>

          <h2 className="mt-3 font-display text-5xl text-[#0f4f2b]">
            Contact Us
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#2f7d32] via-[#8bcf7a] to-[#f4b400]" />

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
              value="Rabai Road, Nairobi, Kenya"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#2f7d32]/15 bg-white/90 p-8 shadow-xl shadow-primary/10 backdrop-blur">
          <h3 className="font-display text-2xl text-[#0f4f2b]">
            Send us a message
          </h3>

          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-primary/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-primary/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <input
              type="tel"
              placeholder="Phone number"
              className="w-full border border-primary/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <textarea
              rows={5}
              placeholder="Tell us what you need..."
              className="w-full border border-primary/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-leaf-deep"
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
    <div className="flex items-center gap-4 rounded-2xl border border-[#2f7d32]/15 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:border-primary/25 hover:bg-white">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 font-semibold text-[#0f4f2b]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
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
      className={`group relative block overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-[#2f7d32]/15 ${className}`}
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="h-full min-h-[260px] w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#062d19]/55 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border border-white/40 bg-white/85 px-6 py-3 text-center shadow-sm backdrop-blur">
        <span className="font-display text-xl text-[#0f4f2b]">{name}</span>
        <span className="ml-2 text-sm text-muted-foreground">( {count} )</span>
      </div>
    </a>
  );
}