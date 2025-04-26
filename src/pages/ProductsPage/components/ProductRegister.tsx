import React from "react";

const ProductRegister: React.FC = () => {
  return (
    <section
      className="h-[560px] bg-white shadow space-y-4 sm:rounded-lg p-6"
      data-section="product-register"
    >
      <header className="border-b pb-4" data-header="product-register-header">
        <h2 className="text-xl font-semibold">Product Registration</h2>
      </header>

      <form className="space-y-4" data-form="product-register-form">
        <div className="flex flex-col space-y-2" data-field="name">
          <label htmlFor="name" className="text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-2 rounded-md"
            placeholder="Enter the product name"
            required
          />
        </div>

        <div className="flex flex-col space-y-2" data-field="description">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 rounded-md resize-none"
            placeholder="Enter the product description"
            rows={3}
          ></textarea>
        </div>

        <div className="flex flex-col space-y-2" data-field="price">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="border p-2 rounded-md"
            placeholder="Enter the product price"
            required
          />
        </div>

        <div className="flex flex-col space-y-2" data-field="status">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="border p-2 rounded-md"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-900"
            data-action="submit"
          >
            Register
          </button>
          <button
            type="button"
            className="px-4 py-2 text-black rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
            data-action="cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductRegister;
