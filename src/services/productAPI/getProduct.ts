export async function fetchProducts(token: string) {
  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Unknown error");
  }
}
