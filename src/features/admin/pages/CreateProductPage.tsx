import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createProductThunk } from "../store/adminProductSlice";
import toast from "react-hot-toast";

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  price: string;
  oldPrice: string;
  stock: string;
  tag: "HOT" | "NEW" | "SALE" | "";
  categoryId: string;
  image: File | null;
};

const initialForm: ProductForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  oldPrice: "",
  stock: "",
  tag: "",
  categoryId: "86dacd10-3c63-452c-b415-76ce81fe3c04",
  image: null,
};

export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { creating, createError } = useAppSelector(
    (state) => state.adminProducts
  );

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [preview, setPreview] = useState("");

  const updateField = <K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const payload = new FormData();

  payload.append("name", form.name);
  payload.append("slug", form.slug);
  payload.append("description", form.description);
  payload.append("price", form.price);
  payload.append("oldPrice", form.oldPrice);
  payload.append("stock", form.stock);
  payload.append("categoryId", form.categoryId);

  if (form.tag) {
    payload.append("tag", form.tag);
  }

  if (form.image) {
    payload.append("image", form.image);
  }

  try {
    const result = await dispatch(createProductThunk(payload)).unwrap();

    toast.success(result?.message || "Product created successfully.");

setTimeout(() => {
  navigate("/admin/products");
}, 1200);
  } catch (error: any) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      createError ||
      "Failed to create product";

    toast.error(message);
  }
};
  return (
    <div className="p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-1 font-display text-4xl">Create Product</h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>
      </header>

      <form
        onSubmit={onSubmit}
        className="mt-8 max-w-4xl rounded-lg border border-border bg-card p-6"
      >
        {createError && (
          <div className="mb-5 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {createError}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Product name"
            value={form.name}
            onChange={(value) => updateField("name", value)}
            required
          />

          <Field
            label="Slug"
            value={form.slug}
            onChange={(value) => updateField("slug", value)}
            required
          />

          <Field
            label="Price"
            type="number"
            value={form.price}
            onChange={(value) => updateField("price", value)}
            required
          />

          <Field
            label="Old price"
            type="number"
            value={form.oldPrice}
            onChange={(value) => updateField("oldPrice", value)}
          />

          <Field
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(value) => updateField("stock", value)}
            required
          />

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Tag
            </span>

            <select
              value={form.tag}
              onChange={(event) =>
                updateField("tag", event.target.value as ProductForm["tag"])
              }
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">No tag</option>
              <option value="HOT">HOT</option>
              <option value="NEW">NEW</option>
              <option value="SALE">SALE</option>
            </select>
          </label>

          <div className="md:col-span-2">
            <Field
              label="Category ID"
              value={form.categoryId}
              onChange={(value) => updateField("categoryId", value)}
              required
            />
          </div>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Product image
            </span>

            <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border bg-background p-4">
              {preview && (
                <img
                  src={preview}
                  alt="Product preview"
                  className="h-40 w-40 rounded object-cover"
                />
              )}

              <label className="inline-flex w-fit cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep">
                <Upload className="h-4 w-4" />
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Description
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows={5}
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {creating ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}