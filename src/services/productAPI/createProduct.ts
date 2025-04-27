// src/services/createProduct.ts
import axios from "axios";

export async function createProduct(
  data: { name: string; description: string; price: number; status: string },
  token: any
) {
  const response = await axios.post(
    "http://localhost:5000/api/products",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}
