import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteProductThunk,
  fetchAdminProductsThunk,
  type AdminProduct,
} from "../store/adminProductSlice";

const PAGE_SIZE = 5;
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductsAdmin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products, loading, fetchError, deleting, deleteError } =
    useAppSelector((state) => state.adminProducts);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchAdminProductsThunk());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const query = q.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category?.name?.toLowerCase().includes(query)
      );
    });
  }, [products, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleSearch = (value: string) => {
    setQ(value);
    setPage(1);
  };

  const getImageUrl = (image?: string) => {
    if (!image) return "https://placehold.co/100x100?text=No+Image";

    if (image.startsWith("http")) return image;

    return `${API_URL}${image}`;
  };

  const handleEdit = (productId: string) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const openDeleteModal = (product: AdminProduct) => {
    setProductToDelete(product);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await dispatch(deleteProductThunk(productToDelete.id)).unwrap();

      toast.success("Product deleted successfully.");

      const remainingItemsOnPage = paginatedProducts.length - 1;

      if (remainingItemsOnPage === 0 && page > 1) {
        setPage((current) => current - 1);
      }

      setProductToDelete(null);
    } catch (error: any) {
      toast.error(error || deleteError || "Failed to delete product");
    }
  };

  return (
    <div className="p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-1 font-display text-4xl">Products</h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products/create")}
          className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-leaf-deep"
        >
          <Plus className="h-4 w-4" />
          New Product
        </button>
      </header>

      <div className="mt-8 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />

          <input
            value={q}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {fetchError && (
          <div className="m-4 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {fetchError}
          </div>
        )}

        {deleteError && (
          <div className="m-4 rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {deleteError}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3 font-normal">Product</th>
                <th className="px-4 py-3 font-normal">Category</th>
                <th className="px-4 py-3 font-normal">Stock</th>
                <th className="px-4 py-3 font-normal">Price</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 text-right font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="border-t border-border px-4 py-8 text-center text-muted-foreground"
                  >
                    Loading products...
                  </td>
                </tr>
              )}

              {!loading && paginatedProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="border-t border-border px-4 py-8 text-center text-muted-foreground"
                  >
                    No products found.
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="h-12 w-12 rounded object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/100x100?text=No+Image";
                          }}
                        />

                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.tag || "No tag"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {product.category?.name || "N/A"}
                    </td>

                    <td className="px-4 py-3">{product.stock}</td>

                    <td className="px-4 py-3 font-semibold">
                      Ksh. {Number(product.price).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(product.id)}
                          className="grid h-8 w-8 place-items-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="Edit product"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDeleteModal(product)}
                          className="grid h-8 w-8 place-items-center rounded text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          title="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex items-center gap-1 border border-border px-3 py-2 text-xs font-semibold uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="inline-flex items-center gap-1 border border-border px-3 py-2 text-xs font-semibold uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-display text-2xl">Delete product?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="grid h-8 w-8 place-items-center rounded text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <img
                  src={getImageUrl(productToDelete.image)}
                  alt={productToDelete.name}
                  className="h-12 w-12 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x100?text=No+Image";
                  }}
                />

                <div>
                  <p className="font-semibold">{productToDelete.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {productToDelete.category?.name || "No category"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 bg-destructive px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-destructive-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}