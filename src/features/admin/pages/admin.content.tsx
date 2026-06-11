import { Upload, RotateCcw } from "lucide-react";
import {
  useContent,
  fileToDataUrl,
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
            Edit text and imagery for the storefront. Changes save instantly to this browser.
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
        <SectionCard title="Hero section">
          <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => update("hero", { eyebrow: v })} />
          <Field label="Title (use \\n for new line)" value={content.hero.title} onChange={(v) => update("hero", { title: v })} multiline />
          <Field label="Body" value={content.hero.body} onChange={(v) => update("hero", { body: v })} multiline />
          <Field label="CTA label" value={content.hero.ctaLabel} onChange={(v) => update("hero", { ctaLabel: v })} />
          <ImageField label="Hero image" value={content.hero.image} onChange={(v) => update("hero", { image: v })} />
        </SectionCard>

        <SectionCard title="Journey section">
          <Field label="Eyebrow" value={content.journey.eyebrow} onChange={(v) => update("journey", { eyebrow: v })} />
          <Field label="Title" value={content.journey.title} onChange={(v) => update("journey", { title: v })} />
          <Field label="Body" value={content.journey.body} onChange={(v) => update("journey", { body: v })} multiline />

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Founder initials" value={content.journey.founderInitials} onChange={(v) => update("journey", { founderInitials: v })} />
            <Field label="Founder role" value={content.journey.founderRole} onChange={(v) => update("journey", { founderRole: v })} />
            <Field label="Founder name" value={content.journey.founderName} onChange={(v) => update("journey", { founderName: v })} />
          </div>
        </SectionCard>

        <SectionCard title="Deals section">
          <Field label="Eyebrow" value={content.deals.eyebrow} onChange={(v) => update("deals", { eyebrow: v })} />
          <Field label="Title" value={content.deals.title} onChange={(v) => update("deals", { title: v })} />
          <Field label="Price badge" value={content.deals.priceLabel} onChange={(v) => update("deals", { priceLabel: v })} />
          <Field label="CTA label" value={content.deals.ctaLabel} onChange={(v) => update("deals", { ctaLabel: v })} />
          <ImageField label="Deal image" value={content.deals.image} onChange={(v) => update("deals", { image: v })} />
        </SectionCard>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
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
          rows={3}
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
                if (file) onChange(await fileToDataUrl(file));
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export type _SiteContent = SiteContent;