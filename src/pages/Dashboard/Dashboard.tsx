// Dashboard.tsx
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Package,
  Users,
  ShoppingCart,
  BarChart as RevenueIcon
} from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
import { calculateRevenue } from "../../utils/calculateSales";
import { calculateSoldItems } from "../../utils/calculateSales";

/* components */
import ProductChart from "./components/ProductChart";
import ProductPieChart from "./components/ProductPieChart";
import SearchCard from "./components/SearchCard";
import QuickAccess from "./components/QuickAccess";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  useEffect(() => {
    // Optionally handle loading state or show a loader
    if (loading) {
      console.log("Loading products...");
    }
  }, [loading]);

  // Calculando o valor total de todos os produtos
  const totalRevenue = calculateRevenue(products);

  // Calculando o número de itens vendidos
  const totalSoldItems = calculateSoldItems(products);

  // Mock data for dashboard stats, but now coming from the context
  const stats = [
    {
      name: "Total Products",
      value: products.length.toString(),
      icon: <Package size={24} />
    },
    {
      name: "Registered Users",
      value: "12", // This should be dynamically fetched from your users context or backend
      icon: <Users size={24} />
    },
    {
      name: "Orders",
      value: totalSoldItems.toString(),
      icon: <ShoppingCart size={24} />
    },
    {
      name: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <RevenueIcon size={24} />
    }
  ];

  // Count active and disabled products
  const activeCount = products.filter(
    (product) => product.status === "available"
  ).length;
  const disabledCount = products.filter(
    (product) => product.status === "sold"
  ).length;

  return (
    <div className="space-y-6" id="main">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name || "User"}! Here's an overview of your
          store.
        </p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3 text-indigo-600">
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* metrics */}
      <section className="flex flex-col border-gray-200 gap-4">
        <div className="grid lg:grid-cols-[calc(60%-16px),40%] gap-4">
          <div>
            {products.length === 0 ? (
              <div className="text-center text-gray-600 font-semibold">
                Products not found
              </div>
            ) : (
              <ProductChart products={products} />
            )}
          </div>
          <div>
            <ProductPieChart
              activeCount={activeCount}
              disabledCount={disabledCount}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[calc(40%-16px),60%] gap-4">
          <div>
            <QuickAccess />
          </div>
          <div>
            <SearchCard products={products} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
