import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js"; // Importa os dados de users

const JWT_SECRET = "developer-test-secret-key";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

export const getUser = (req, res) => {
  const user = users.find((user) => user.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
};
