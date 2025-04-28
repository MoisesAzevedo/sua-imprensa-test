import React, { useState } from "react";

type Product = {
  name: string;
  category: string;
  price: number;
  status: any;
};

type ProductsByCategoryChartProps = {
  products: Product[];
};

const SearchCard: React.FC<ProductsByCategoryChartProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categoryData = products.reduce<Record<string, Product[]>>(
    (acc, product) => {
      acc[product.category] = [...(acc[product.category] || []), product];
      return acc;
    },
    {}
  );

  const data = Object.keys(categoryData).map((category) => ({
    category,
    products: categoryData[category]
  }));

  const filteredCategories = data.filter((item) => {
    const categoryMatch = item.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const productsMatch = item.products.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return categoryMatch || productsMatch;
  });

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg h-[350px] flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
        <input
          type="text"
          placeholder="Search"
          className="p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Área que rola */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {filteredCategories.map((item) => {
            const isCategoryMatching = item.category
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

            return (
              <li key={item.category} className="border-b border-gray-300">
                <div
                  className="flex justify-between items-center p-2 cursor-pointer text-sm text-gray-700"
                  onClick={() => toggleCategory(item.category)}
                >
                  <span>{item.category}</span>
                  <span className="text-gray-500">
                    {openCategory === item.category ? "−" : "+"}
                  </span>
                </div>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openCategory === item.category ? "500px" : "0",
                    opacity: openCategory === item.category ? 1 : 0,
                    pointerEvents:
                      openCategory === item.category ? "all" : "none"
                  }}
                >
                  <ul className="pl-4 space-y-1">
                    {item.products
                      .filter((product) => {
                        if (isCategoryMatching) {
                          return true;
                        }
                        return product.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                      })
                      .map((product, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center text-sm text-gray-600 py-1 border-b last:border-b-0"
                        >
                          <span className="flex-1">{product.name}</span>
                          <span className="flex-1 text-center">
                            {formatCurrency(product.price)}
                          </span>
                          <span
                            className="flex-1 text-center"
                            style={{
                              color:
                                product.status === "sold"
                                  ? "var(--light-red)"
                                  : "var(--primary)"
                            }}
                          >
                            {product.status}
                          </span>
                          <span className="flex-1 text-center">
                            {formatCurrency(product.price * 1)}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchCard;
