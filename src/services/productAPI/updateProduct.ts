// src/services/updateProduct.ts
import axios from "axios";

export async function updateProduct(
  id: string,
  data: { name: string; description: string; price: number; status: string },
  token: any
) {
  const response = await axios.put(
    `http://localhost:5000/api/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}
