import { Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import {
  fileToDataUrl,
  useContent,
  type SiteContent,
} from "../../../lib/content";

export default function ContentAdmin() {
  const { content, update, reset } = useContent();

  return (
    <div className="p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Site content</p>
          <h1 className="mt-1 font-display text-4xl">Pages & sections</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit homepage text, services, categories, contact details, and images.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all content to defaults?")) reset();
          }}
          className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to defaults
        </button>
      </header>

      <div className="mt-8 space-y-6">
        <HeroEditor content={content} update={update} />
        <ServicesEditor content={content} update={update} />
        <CategoriesEditor content={content} update={update} />
        <ProductsEditor content={content} update={update} />
        <ContactEditor content={content} update={update} />
      </div>
    </div>
  );
}

type UpdateFn = <K extends keyof SiteContent>(
  section: K,
  patch: Partial<SiteContent[K]>
) => void;

function HeroEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: UpdateFn;
}) {
  return (
    <SectionCard title="Hero section">
      <Field
        label="Eyebrow"
        value={content.hero.eyebrow}
        onChange={(v) => update("hero", { eyebrow: v })}
      />

      <Field
        label="Title"
        value={content.hero.title}
        onChange={(v) => update("hero", { title: v })}
        multiline
      />

      <Field
        label="Body"
        value={content.hero.body}
        onChange={(v) => update("hero", { body: v })}
        multiline
      />

      <Field
        label="CTA label"
        value={content.hero.ctaLabel}
        onChange={(v) => update("hero", { ctaLabel: v })}
      />

      <ImageField
        label="Hero image"
        value={content.hero.image}
        onChange={(v) => update("hero", { image: v })}
      />
    </SectionCard>
  );
}

function ServicesEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: UpdateFn;
}) {
  const services = content.services.items;

  return (
    <SectionCard title="Services section">
      <Field
        label="Eyebrow"
        value={content.services.eyebrow}
        onChange={(v) => update("services", { eyebrow: v })}
      />

      <Field
        label="Title"
        value={content.services.title}
        onChange={(v) => update("services", { title: v })}
      />

      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={`${service.title}-${index}`}
            className="rounded-md border border-border p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-display text-xl">Service {index + 1}</h3>

              <button
                type="button"
                onClick={() => {
                  update("services", {
                    items: services.filter((_, itemIndex) => itemIndex !== index),
                  });
                }}
                className="inline-flex items-center gap-2 rounded border border-destructive px-3 py-2 text-xs font-semibold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>

            <div className="space-y-3">
              <Field
                label="Icon"
                value={service.icon}
                onChange={(v) => {
                  const items = [...services];
                  items[index] = { ...items[index], icon: v };
                  update("services", { items });
                }}
              />

              <Field
                label="Title"
                value={service.title}
                onChange={(v) => {
                  const items = [...services];
                  items[index] = { ...items[index], title: v };
                  update("services", { items });
                }}
              />

              <Field
                label="Points - one per line"
                value={service.points.join("\n")}
                multiline
                onChange={(v) => {
                  const items = [...services];
                  items[index] = {
                    ...items[index],
                    points: v
                      .split("\n")
                      .map((point) => point.trim())
                      .filter(Boolean),
                  };
                  update("services", { items });
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          update("services", {
            items: [
              ...services,
              {
                icon: "🌱",
                title: "New Service",
                points: ["Describe this service here."],
              },
            ],
          })
        }
        className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
      >
        <Plus className="h-4 w-4" />
        Add service
      </button>
    </SectionCard>
  );
}

function CategoriesEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: UpdateFn;
}) {
  const categories = content.categories.items;

  return (
    <SectionCard title="Categories section">
      <Field
        label="Eyebrow"
        value={content.categories.eyebrow}
        onChange={(v) => update("categories", { eyebrow: v })}
      />

      <Field
        label="Title"
        value={content.categories.title}
        onChange={(v) => update("categories", { title: v })}
      />

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div
            key={`${category.name}-${index}`}
            className="rounded-md border border-border p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-display text-xl">Category {index + 1}</h3>

              <button
                type="button"
                onClick={() => {
                  update("categories", {
                    items: categories.filter(
                      (_, itemIndex) => itemIndex !== index
                    ),
                  });
                }}
                className="inline-flex items-center gap-2 rounded border border-destructive px-3 py-2 text-xs font-semibold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>

            <div className="space-y-3">
              <Field
                label="Name"
                value={category.name}
                onChange={(v) => {
                  const items = [...categories];
                  items[index] = { ...items[index], name: v };
                  update("categories", { items });
                }}
              />

              <Field
                label="Product count"
                value={String(category.count)}
                onChange={(v) => {
                  const items = [...categories];
                  items[index] = {
                    ...items[index],
                    count: Number(v) || 0,
                  };
                  update("categories", { items });
                }}
              />

              <ImageField
                label="Category image"
                value={category.image}
                onChange={(v) => {
                  const items = [...categories];
                  items[index] = { ...items[index], image: v };
                  update("categories", { items });
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          update("categories", {
            items: [
              ...categories,
              {
                name: "New Category",
                count: 0,
                image: content.hero.image,
              },
            ],
          })
        }
        className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
      >
        <Plus className="h-4 w-4" />
        Add category
      </button>
    </SectionCard>
  );
}

function ProductsEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: UpdateFn;
}) {
  return (
    <SectionCard title="Products section">
      <Field
        label="All products tab"
        value={content.productsSection.allLabel}
        onChange={(v) => update("productsSection", { allLabel: v })}
      />

      <Field
        label="New arrivals tab"
        value={content.productsSection.newLabel}
        onChange={(v) => update("productsSection", { newLabel: v })}
      />

      <Field
        label="Sale tab"
        value={content.productsSection.saleLabel}
        onChange={(v) => update("productsSection", { saleLabel: v })}
      />
    </SectionCard>
  );
}

function ContactEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: UpdateFn;
}) {
  return (
    <SectionCard title="Contact section">
      <Field
        label="Eyebrow"
        value={content.contact.eyebrow}
        onChange={(v) => update("contact", { eyebrow: v })}
      />

      <Field
        label="Title"
        value={content.contact.title}
        onChange={(v) => update("contact", { title: v })}
      />

      <Field
        label="Body"
        value={content.contact.body}
        multiline
        onChange={(v) => update("contact", { body: v })}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Field
          label="Phone"
          value={content.contact.phone}
          onChange={(v) => update("contact", { phone: v })}
        />

        <Field
          label="Email"
          value={content.contact.email}
          onChange={(v) => update("contact", { email: v })}
        />

        <Field
          label="Location"
          value={content.contact.location}
          onChange={(v) => update("contact", { location: v })}
        />
      </div>

      <Field
        label="Form title"
        value={content.contact.formTitle}
        onChange={(v) => update("contact", { formTitle: v })}
      />

      <Field
        label="Button label"
        value={content.contact.buttonLabel}
        onChange={(v) => update("contact", { buttonLabel: v })}
      />
    </SectionCard>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <div className="flex items-start gap-4">
        <img
          src={value}
          alt={label}
          className="h-28 w-28 rounded-md object-cover ring-1 ring-border"
        />

        <div className="flex-1 space-y-2">
          <input
            value={value.startsWith("data:") ? "" : value}
            placeholder={value.startsWith("data:") ? "Uploaded file" : "Image URL"}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
          />

          <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-border bg-background px-3 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-muted">
            <Upload className="h-3.5 w-3.5" />
            Upload image

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                  onChange(await fileToDataUrl(file));
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}