import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts } from "../services/productsAPI";
import { useAuth } from "../contexts/AuthContext"; // Importar useAuth

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  userId: string;
}

interface ProductsContextType {
  products: Product[];
  loadProducts: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { token } = useAuth(); // Obtém o token do AuthContext
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    if (!token) {
      setError("No token found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts(token); // Passa o token obtido do AuthContext
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadProducts(); // Carrega os produtos sempre que o token mudar
    }
  }, [token]); // Dependência no token para recarregar os produtos

  return (
    <ProductsContext.Provider
      value={{ products, loadProducts, loading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
