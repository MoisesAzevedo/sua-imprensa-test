import { deleteProduct } from "../../../services/productAPI/deleteProduct";

/**
 * Handles the deletion of a product with user confirmation.
 * @param productId The ID of the product to delete.
 * @param token The authentication token.
 * @param productName The name of the product (for confirmation message).
 * @param reloadProducts Function to reload the list of products after deletion.
 */
export const deleteProductAction = async (
  productId: string,
  token: any,
  productName: string,
  reloadProducts: () => void
) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${productName}?`
  );

  if (!confirmDelete) {
    console.log("Product deletion canceled by the user.");
    return;
  }

  try {
    await deleteProduct(productId, token);
    console.log(`Product ${productName} deleted successfully.`);

    reloadProducts();
  } catch (error) {
    console.error("deleteProductAction: delete error:", error);
  }
};
