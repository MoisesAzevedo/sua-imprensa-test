// src/utils/calculateRevenue.ts
export const calculateRevenue = (
  products: { price: number; status: string }[]
) => {
  return products
    .filter((product) => product.status === "sold") // Filtra os produtos com status "sold"
    .reduce((total, product) => total + product.price, 0); // Soma os preços dos produtos filtrados
};

export const calculateSoldItems = (products: { status: string }[]) => {
  return products.filter((product) => product.status === "sold").length;
};
