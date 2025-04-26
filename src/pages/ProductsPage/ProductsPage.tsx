import React from "react";
import ProductRegister from "./components/ProductRegister";
import ProductDisplay from "./components/ProductDisplay";

const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-6" id="main">
      <section id="header-products">
        <h1 className="text-2xl font-bold text-gray-900">
          Products Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This page is intentionally left empty as part of the developer test.
        </p>
      </section>

      <section
        data-section="prod-wrapper"
        className="h-max grid gap-4 overflow-hidden pb-2.5"
      >
        <div
          className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4"
          data-field="line-1"
        >
          <ProductRegister />
          <ProductDisplay />
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
