import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "developer-test-secret-key";

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (in a real app, you would use a proper database)
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2a$10$XQeGJBZc6TQpcJXCM1L0beJh6hU5sKbZ1V0BN/8rV4.JQhWtYXZtK" // "password"
  }
];

const products = [
  {
    id: "1",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 99.99,
    status: "active",
    userId: "1"
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Auth routes
app.post(
  "/api/auth/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    // Create token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  }
);

app.post(
  "/api/auth/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Find user
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  }
);

app.get("/api/auth/user", authenticateToken, (req, res) => {
  const user = users.find((user) => user.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
});

// Products routes
app.get("/api/products", authenticateToken, (req, res) => {
  const userProducts = products.filter(
    (product) => product.userId === req.user.id
  );
  res.json(userProducts);
});

app.post(
  "/api/products",
  [
    authenticateToken,
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, description, price, status } = req.body;

    const newProduct = {
      id: (products.length + 1).toString(),
      name,
      description: description || "",
      price: parseFloat(price),
      status: status || "active",
      userId: req.user.id
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

app.get("/api/products/:id", authenticateToken, (req, res) => {
  const product = products.find(
    (product) => product.id === req.params.id && product.userId === req.user.id
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.put(
  "/api/products/:id",
  [
    authenticateToken,
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const productIndex = products.findIndex(
      (product) =>
        product.id === req.params.id && product.userId === req.user.id
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, status } = req.body;

    products[productIndex] = {
      ...products[productIndex],
      name,
      description: description || products[productIndex].description,
      price: parseFloat(price),
      status: status || products[productIndex].status
    };

    res.json(products[productIndex]);
  }
);

app.delete("/api/products/:id", authenticateToken, (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === req.params.id && product.userId === req.user.id
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];
  res.json(deletedProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
