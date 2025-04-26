import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Package, Users, ShoppingCart, BarChart } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const stats = [
    { name: "Total Products", value: "24", icon: <Package size={24} /> },
    { name: "Registered Users", value: "12", icon: <Users size={24} /> },
    { name: "Orders", value: "42", icon: <ShoppingCart size={24} /> },
    { name: "Revenue", value: "$6,238", icon: <BarChart size={24} /> }
  ];

  return (
    <div className="space-y-6" id="main">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name || "User"}! Here's an overview of your
          store.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            id="stats-wrapper"
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

      <section className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Developer Test Instructions
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="prose max-w-none">
            <h4>Your Task: Create a Product Management Module</h4>
            <p>Implement the Products page with the following features:</p>
            <ul>
              <li>
                Display a list of products with fields for name, description,
                price, and status
              </li>
              <li>Create a form to add new products</li>
              <li>Implement edit functionality for existing products</li>
              <li>Add delete functionality with confirmation dialog</li>
              <li>Implement proper form validation for all inputs</li>
              <li>Connect the frontend with the backend API</li>
            </ul>

            <h4>Technical Requirements:</h4>
            <ul>
              <li>Use the existing authentication system</li>
              <li>Implement proper state management for the products</li>
              <li>Create reusable components as needed</li>
              <li>Implement proper error handling and loading states</li>
              <li>Follow the established design patterns in the codebase</li>
              <li>Include appropriate tests for your implementation</li>
            </ul>

            <p>
              <strong>Note:</strong> The Products page is currently empty.
              You'll need to implement it completely, connecting to the backend
              API endpoints at <code>/api/products</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
