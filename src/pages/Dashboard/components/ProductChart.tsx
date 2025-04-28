import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ProductChartProps {
  products: { name: string; price: number }[];
}

const ProductChart: React.FC<ProductChartProps> = ({ products }) => {
  // Prepare Y-axis ticks based on product prices
  const prices = products.map((p) => p.price);
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const ticks = [0, maxPrice * 0.25, maxPrice * 0.5, maxPrice * 0.75, maxPrice];

  // Get the primary color from CSS variable
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary");

  return (
    <div className="relative flex overflow-hidden shadow rounded-lg p-4 rounded  bg-white  shadow rounded-lg transition-all hover:shadow-md">
      {/* Sticky Y-Axis Values */}
      <div className="sticky h-[231px] w-[60px] mt-[23px] left-0 z-10   flex flex-col justify-between px-2">
        {ticks
          .slice()
          .reverse()
          .map((t) => (
            <span key={t} className="text-xs text-gray-700">
              R${t.toFixed(0)}
            </span>
          ))}
      </div>

      {/* Scrollable Chart */}
      <div className="overflow-x-auto flex-1">
        <div style={{ minWidth: products.length * 80 + 100, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={products}
              margin={{ left: 0, right: 20, top: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="name"
                textAnchor="end"
                interval={0}
                tickFormatter={(name) =>
                  name.length > 3 ? `${name.substring(0, 3)}...` : name
                }
              />
              <YAxis hide />
              <Tooltip formatter={(value) => `R$ ${value}`} />
              <Bar
                dataKey="price"
                fill={primaryColor || "#6366f1"}
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductChart;
