import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateProductThunk } from "../store/adminProductSlice";
import { fetchAdminCategoriesThunk } from "../store/adminCategorySlice";
import {
  clearSelectedProduct,
  fetchProduct,
} from "../../shop/store/productsSlice";

type ProductForm = {
  name: string;
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
  description: "",
  price: "",
  oldPrice: "",
  stock: "",
  tag: "",
  categoryId: "",
  image: null,
};

const API_URL = "http://localhost:3000";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    item: selectedProduct,
    loading,
    error: fetchError,
  } = useAppSelector((state) => state.products);

  const { updating, updateError } = useAppSelector(
    (state) => state.adminProducts
  );

  const {
    categories,
    loading: loadingCategories,
    error: categoryError,
  } = useAppSelector((state) => state.adminCategories);

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [preview, setPreview] = useState("");

  const selectedProductCategoryId = useMemo(() => {
    if (!selectedProduct) return "";

    if (typeof selectedProduct.category === "string") {
      return (
        categories.find(
          (category) =>
            category.name.toLowerCase() ===
            selectedProduct.category.toLowerCase()
        )?.id || ""
      );
    }

    return "";
  }, [selectedProduct, categories]);

  useEffect(() => {
    dispatch(fetchAdminCategoriesThunk());

    if (id) {
      dispatch(fetchProduct(id));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedProduct) return;

    setForm({
      name: selectedProduct.name || "",
      description: selectedProduct.description || "",
      price: String(selectedProduct.price ?? ""),
      oldPrice: String(selectedProduct.oldPrice ?? ""),
      stock: String(selectedProduct.stock ?? ""),
      tag: selectedProduct.tag || "",
      categoryId: selectedProductCategoryId,
      image: null,
    });

    setPreview(selectedProduct.image || "");
  }, [selectedProduct, selectedProductCategoryId]);

  const updateField = <K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const getImageUrl = (image?: string) => {
    if (!image) return "";

    if (image.startsWith("http") || image.startsWith("blob:")) {
      return image;
    }

    return `${API_URL}${image}`;
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      toast.error("Product ID is missing.");
      return;
    }

    if (!form.categoryId) {
      toast.error("Please select a category.");
      return;
    }

    const payload = new FormData();

    payload.append("name", form.name.trim());
    payload.append("description", form.description.trim());
    payload.append("price", form.price);
    payload.append("stock", form.stock);
    payload.append("categoryId", form.categoryId);

    if (form.oldPrice) {
      payload.append("oldPrice", form.oldPrice);
    }

    if (form.tag) {
      payload.append("tag", form.tag);
    }

    if (form.image) {
      payload.append("image", form.image);
    }

    try {
      const result = await dispatch(
        updateProductThunk({
          id,
          payload,
        })
      ).unwrap();

      toast.success(result?.message || "Product updated successfully.");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error: any) {
      toast.error(error || updateError || "Failed to update product");
    }
  };

  if (loading) {
    return <div className="p-8">Loading product...</div>;
  }

  if (fetchError) {
    return (
      <div className="p-8">
        <div className="rounded border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {fetchError}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-1 font-display text-4xl">Edit Product</h1>
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
        {updateError && (
          <div className="mb-5 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {updateError}
          </div>
        )}

        {categoryError && (
          <div className="mb-5 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {categoryError}
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

          <label className="block md:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Category
            </span>

            <select
              value={form.categoryId}
              required
              disabled={loadingCategories}
              onChange={(event) => updateField("categoryId", event.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {loadingCategories ? "Loading categories..." : "Select category"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
              Product image
            </span>

            <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border bg-background p-4">
              {preview && (
                <img
                  src={getImageUrl(preview)}
                  alt="Product preview"
                  className="h-40 w-40 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/160x160?text=No+Image";
                  }}
                />
              )}

              <label className="inline-flex w-fit cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep">
                <Upload className="h-4 w-4" />
                Change image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
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
            disabled={updating || loadingCategories}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {updating ? "Updating..." : "Update Product"}
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