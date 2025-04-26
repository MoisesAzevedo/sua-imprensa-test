import { useProducts } from "../../../contexts/ProductContext";

const ProductDisplay: React.FC = () => {
  const { products, loading, error } = useProducts();

  return (
    <section
      className="h-[560px] bg-white shadow space-y-4 sm:rounded-lg p-6"
      data-section="product-display"
    >
      <header className="border-b pb-4" data-header="product-display-header">
        <h2 className="text-xl font-semibold">Registered Products</h2>
      </header>

      <div className="overflow-y-scroll h-[400px] scrollbar-thin scrollbar-width-5 space-y-4 pr-3">
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}
        {!loading &&
          !error &&
          products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-md shadow-sm flex flex-col space-y-2"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <span
                className={`flex justify-center w-20 mt-2 px-3 py-1 text-sm text-white rounded-md ${
                  product.status === "active" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {product.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDisplay;
