/* hooks */
import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../../contexts/ProductContext";
import { useAuth } from "../../../contexts/AuthContext";
/* icons */
import { MoreVertical } from "lucide-react";
/* actions */
import { deleteProductAction } from "../actions/deleteProductAction";
import { EditProductModal } from "./EditProductModal";

const ProductDisplay: React.FC = () => {
  const { products, loading, error, loadProducts } = useProducts();
  const { token } = useAuth();
  const [openDropMenu, setOpenDropMenu] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const dropMenuRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // open and close dropMenu
  const dropMenuClick = (productId: string) => {
    setOpenDropMenu((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  // close dropMenu on DOM click
  const dropMenuClickOutside = (event: MouseEvent) => {
    // Checks if the click was outside the  dropMenu
    for (const productId in dropMenuRef.current) {
      if (
        dropMenuRef.current[productId] &&
        !dropMenuRef.current[productId]?.contains(event.target as Node)
      ) {
        setOpenDropMenu((prevState) => ({
          ...prevState,
          [productId]: false
        }));
      }
    }
  };

  // listen the DOM click
  useEffect(() => {
    document.addEventListener("mousedown", dropMenuClickOutside);

    return () => {
      document.removeEventListener("mousedown", dropMenuClickOutside);
    };
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const initialDropState = products.reduce((acc, product) => {
        acc[product.id] = false;
        return acc;
      }, {} as { [key: string]: boolean });

      setOpenDropMenu(initialDropState);
    }
  }, [products]);

  return (
    <section
      className=" bg-white shadow space-y-4 sm:rounded-lg p-6"
      data-section="product-display"
    >
      <header className="border-b pb-4" data-header="product-display-header">
        <h2 className="text-xl font-semibold">Registered Products</h2>
      </header>

      <div className="relative grid grid-cols-3 xl:grid-cols-[1fr, 1fr, 1fr] gap-4  ">
        {loading && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500">
            Loading products...
          </p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500">
            No products found.
          </p>
        )}
        {!loading &&
          !error &&
          products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-md shadow-sm flex flex-col space-y-2 "
            >
              <header className="relative flex items-center w-full">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <MoreVertical
                  size={24}
                  className="absolute right-0 text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => dropMenuClick(product.id)}
                />

                {openDropMenu[product.id] === true && (
                  <div
                    ref={(el) => (dropMenuRef.current[product.id] = el)}
                    className="absolute right-0 top-8 bg-white shadow-lg rounded-md border"
                  >
                    <button
                      className="flex justify-center item-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-200"
                      onClick={() => setEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex justify-center item-center w-full px-4 py-2  text-sm text-gray-700 hover:bg-red-100"
                      onClick={() => {
                        deleteProductAction(
                          product.id,
                          token,
                          product.name,
                          loadProducts
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </header>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <span
                className={`flex justify-center w-20 mt-2 px-3 py-1 text-sm text-white rounded-md ${
                  product.status === "active" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {product.status}
              </span>
            </div>
          ))}

        {/* edit modal */}
        {editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={() => setEditProduct(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProductDisplay;
