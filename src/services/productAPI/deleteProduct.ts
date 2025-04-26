import axios from "axios";

export const deleteProduct = async (productId: string, token: any) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Produto com ID ${productId} excluído com sucesso!`);
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
};
