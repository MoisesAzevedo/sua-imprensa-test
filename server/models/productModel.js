const products = [
  {
    id: "1",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 99.99,
    status: "active",
    userId: "1",
    category: "Electronics"
  }
];

const findProductByIdAndUserId = (id, userId) =>
  products.find((product) => product.id === id && product.userId === userId);

const findUserProducts = (userId) =>
  products.filter((product) => product.userId === userId);

const createProduct = (name, description, price, status, category, userId) => {
  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description: description || "",
    price: parseFloat(price),
    status: status || "active",
    userId,
    category: category || "Select a category"
  };

  products.push(newProduct);
  return newProduct;
};

const updateProduct = (
  id,
  name,
  description,
  price,
  status,
  category,
  userId
) => {
  const productIndex = products.findIndex(
    (product) => product.id === id && product.userId === userId
  );

  if (productIndex === -1) return null;

  products[productIndex] = {
    ...products[productIndex],
    name,
    description: description || products[productIndex].description,
    price: parseFloat(price),
    status: status || products[productIndex].status,
    category: category || products[productIndex].category
  };

  return products[productIndex];
};

const deleteProduct = (id, userId) => {
  const productIndex = products.findIndex(
    (product) => product.id === id && product.userId === userId
  );

  if (productIndex === -1) return null;

  return products.splice(productIndex, 1)[0];
};

export {
  products,
  findProductByIdAndUserId,
  findUserProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
