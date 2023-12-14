import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserExists } from "../libs/LoginValidation.js";
import { createAccesToken } from "../middleware/CreateToken.js";

const secret = process.env.TOKENKEY;

export const createuser = async (req, res) => {
  const data = req.body;
  const dietary = JSON.stringify(data.dietary);

  if (await UserExists(data.username)) {
    return res.status(404).json({ message: "User already exists" });
  }

  const PasswordHash = await bcrypt.hash(data.password, 10);

  try {
    const [newUser] = await pool.query(
      "INSERT INTO users (name, lastname, username, email, password, dietary, bio) VALUES (?,?,?,?,?,?,?)",
      [
        data.name,
        data.lastname,
        data.username,
        data.email,
        PasswordHash,
        dietary,
        data.bio,
      ]
    );

    delete data.password;

    const token = await createAccesToken(data);

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginuser = async (req, res) => {
  const data = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      data.username,
    ]);
    if (!rows[0]) {
      return res.status(404).json({ message: "Invalid Credential" });
    }
    const PasswordMatch = await bcrypt.compare(data.password, rows[0].password);
    if (!PasswordMatch) {
      return res.status(404).json({ message: "Invalid credential" });
    }

    delete rows[0].password;

    const token = await createAccesToken(rows[0]);

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.status(200).json(rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200).end();
};

export const validationtoken = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({ message: "No token provided" });
  }
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(data);
  });
};
