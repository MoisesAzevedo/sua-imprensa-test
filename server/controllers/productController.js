import { products } from "../models/productModel.js"; // Importa os dados de products

export const getProducts = (req, res) => {
  const userProducts = products.filter(
    (product) => product.userId === req.user.id
  );
  res.json(userProducts);
};

export const createProduct = (req, res) => {
  const { name, description, price, status, category } = req.body;

  const newProduct = {
    id: (products.length + 1).toString(),
    name,
    description: description || "",
    price: parseFloat(price),
    status: status || "active",
    userId: req.user.id,
    category: category || "Select a category"
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const getProduct = (req, res) => {
  const product = products.find(
    (product) => product.id === req.params.id && product.userId === req.user.id
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

export const updateProduct = (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === req.params.id && product.userId === req.user.id
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, price, status, category } = req.body;

  products[productIndex] = {
    ...products[productIndex],
    name,
    description: description || products[productIndex].description,
    price: parseFloat(price),
    status: status || products[productIndex].status,
    category: category || products[productIndex].category
  };

  res.json(products[productIndex]);
};

export const deleteProduct = (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === req.params.id && product.userId === req.user.id
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];
  res.json(deletedProduct);
};
