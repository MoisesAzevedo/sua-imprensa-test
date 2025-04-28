import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ProductPieChartProps {
  activeCount: number;
  disabledCount: number;
}

const ProductPieChart: React.FC<ProductPieChartProps> = ({
  activeCount,
  disabledCount
}) => {
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root)
    .getPropertyValue("--primary")
    .trim();
  const redColor = getComputedStyle(root)
    .getPropertyValue("--light-red")
    .trim();

  const data = [
    { name: "Active", value: activeCount },
    { name: "Disabled", value: disabledCount }
  ];

  const COLORS = [primaryColor, redColor];

  return (
    <div className=" h-[100%] relative flex flex-col   items-center p-4  bg-white shadow rounded-lg transition-all hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Product Status
      </h3>
      <ResponsiveContainer width={250} height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            fill={primaryColor}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPieChart;
