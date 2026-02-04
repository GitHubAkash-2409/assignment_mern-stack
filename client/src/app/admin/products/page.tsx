import ProductsTable from '@/components/admin/ProductsTable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const AdminProductsPage = async () => {
  let products = [];
  try {
    const res = await fetch(`${API_URL}/api/products`, { cache: 'no-store', next: { revalidate: 0 } });
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Products Management</h1>
      <ProductsTable initial={products} apiBase={API_URL} />
    </div>
  );
};

export default AdminProductsPage;
