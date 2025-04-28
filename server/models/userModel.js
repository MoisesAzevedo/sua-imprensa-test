import bcrypt from "bcryptjs";

const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2a$10$XQeGJBZc6TQpcJXCM1L0beJh6hU5sKbZ1V0BN/8rV4.JQhWtYXZtK" // "password"
  }
];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const createUser = async (name, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);
  return newUser;
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { users, findUserByEmail, createUser, validatePassword };
