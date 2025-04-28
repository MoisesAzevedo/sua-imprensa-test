import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  createProduct,
  findUserProducts,
  findProductByIdAndUserId,
  updateProduct,
  deleteProduct
} from "../models/product.js";

const router = express.Router();

// Products routes
router.get("/", authenticateToken, (req, res) => {
  const userProducts = findUserProducts(req.user.id);
  res.json(userProducts);
});

router.post(
  "/",
  [
    authenticateToken,
    body("name").notEmpty().withMessage("Product name is required now"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("category").notEmpty().withMessage("Category is required")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, description, price, status, category } = req.body;

    const newProduct = createProduct(
      name,
      description,
      price,
      status,
      category,
      req.user.id
    );
    res.status(201).json(newProduct);
  }
);

router.get("/:id", authenticateToken, (req, res) => {
  const product = findProductByIdAndUserId(req.params.id, req.user.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

router.put(
  "/:id",
  [
    authenticateToken,
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("category").notEmpty().withMessage("Category is required")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, description, price, status, category } = req.body;

    const updatedProduct = updateProduct(
      req.params.id,
      name,
      description,
      price,
      status,
      category,
      req.user.id
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  }
);

router.delete("/:id", authenticateToken, (req, res) => {
  const deletedProduct = deleteProduct(req.params.id, req.user.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(deletedProduct);
});

export default router;
