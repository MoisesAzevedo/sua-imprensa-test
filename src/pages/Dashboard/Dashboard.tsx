// Dashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Package,
  Users,
  ShoppingCart,
  BarChart as RevenueIcon
} from "lucide-react";
import { useProducts } from "../../contexts/ProductContext";
/* components */

import ProductChart from "./components/ProductChart";
import ProductPieChart from "./components/ProductPieChart";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products } = useProducts();

  // Mock data for dashboard stats
  const stats = [
    { name: "Total Products", value: "24", icon: <Package size={24} /> },
    { name: "Registered Users", value: "12", icon: <Users size={24} /> },
    { name: "Orders", value: "42", icon: <ShoppingCart size={24} /> },
    { name: "Revenue", value: "$6,238", icon: <RevenueIcon size={24} /> }
  ];

  // Contagem de produtos ativos e desativados
  const activeCount = products.filter(
    (product) => product.status === "active"
  ).length;
  const disabledCount = products.filter(
    (product) => product.status === "disabled"
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
      <section className="">
        <div className="  border-gray-200 ">
          <div className="grid lg:grid-cols-[calc(60%-16px),40%] gap-4">
            {/* col 1 */}
            <div className=" ">
              {products.length === 0 ? (
                <div className="text-center text-gray-600 font-semibold">
                  Products not found
                </div>
              ) : (
                <ProductChart products={products} />
              )}
            </div>

            {/* col 2 */}
            <div>
              <ProductPieChart
                activeCount={activeCount}
                disabledCount={disabledCount}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
