/* hooks */
import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../../contexts/ProductContext";
import { useAuth } from "../../../contexts/AuthContext"; // ajuste o caminho conforme seu projeto
/* icons */
import { MoreVertical } from "lucide-react";
/* service */
import { deleteProduct } from "../../../services/productAPI/deleteProduct";

const ProductDisplay: React.FC = () => {
  const { products, loading, error, loadProducts } = useProducts();
  const { token } = useAuth();
  const [openDropMenu, setOpenDropMenu] = useState<{ [key: string]: boolean }>(
    {}
  );

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
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => console.log("Editar", product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-100"
                      onClick={async () => {
                        try {
                          await deleteProduct(product.id, token, product.name);
                          loadProducts();
                        } catch (error) {
                          console.error("ProductDisplay: delete err:", error);
                        }
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
                {product.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDisplay;
