// src/services/createProduct.ts
import axios from "axios";

interface ProductData {
  name: string;
  description: string;
  price: number;
  status: string;
  category: string;
}

export async function createProduct(data: ProductData, token: any) {
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
