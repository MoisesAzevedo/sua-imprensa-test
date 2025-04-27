import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useProducts } from "../../../contexts/ProductContext";

import { updateProduct } from "../../../services/productAPI/updateProduct";

interface EditProductModalProps {
  product: any;
  onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose
}) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [status, setStatus] = useState(product.status);

  const { token } = useAuth();
  const { loadProducts } = useProducts();

  const handleCancel = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProduct(
        product.id,
        { name, description, price: Number(price), status },
        token
      );

      alert("Product updated successfully!");
      loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div
      className="fixed inset-0 !m-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onMouseDown={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <header className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Edit {name}</h2>
        </header>

        <form onSubmit={editSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="edit-name" className="text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-md resize-none"
              rows={3}
            ></textarea>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="edit-price" className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="edit-price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="border p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="edit-status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-black rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
