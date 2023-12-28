import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserExists, checkpass } from "../libs/LoginValidation.js";
import { createAccesToken } from "../middleware/CreateToken.js";
import { codeExists, sendPincode, verifycode } from "../libs/Sendemail.js";
import { transporter } from "../config/mailer.js";
import path from "path";
import { fs } from "file-system";

const secret = process.env.TOKENKEY;

export const createuser = async (req, res) => {
  const data = req.body;

  if (await UserExists(data.username)) {
    return res.status(404).json({ message: "User already exists" });
  }

  const PasswordHash = await bcrypt.hash(data.password, 10);

  try {
    const [newUser] = await pool.query(
      "INSERT INTO users (name, lastname, username, email, phone, password, bio, rol, status) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        data.name,
        data.lastname,
        data.username,
        data.email,
        data.phone,
        PasswordHash,
        data.bio,
        "user",
        "1",
      ]
    );

    delete data.password;

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveuser_dietaty = async (req, res) => {
  const user = req.params;
  const data = req.body;

  try {
    for (let i = 0; i < data.length; i++) {
      const [rows] = await pool.query(
        "INSERT INTO user_categoria (id_usuario, id_categoria) VALUES (?,?)",
        [user.username, data[i]]
      );
    }
    res.json({ message: "success" });
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

    const passcheck = await checkpass(data.username, data.password);

    if (!passcheck) {
      return res.status(404).json({ message: "Invalid credential" });
    }

    if (rows[0].status !== "1") {
      return res
        .status(403)
        .json({ message: "User is currently disabled" })
        .end();
    }

    delete rows[0].password;

    const Pprouter = "public/PP";

    const imgPath = path.join(Pprouter, `${rows[0].username}.webp`);

    if (fs.existsSync(imgPath)) {
      const profilePictureUrl = `http://localhost:5500/ProfileP/${rows[0].username}.webp`;
      rows[0].profilePictureUrl = profilePictureUrl;
    } else {
      rows[0].profilePictureUrl = null;
    }

    const token = await createAccesToken(rows[0]);

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.status(200).json(rows[0]);
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

export const updateuser = async (req, res) => {
  const user = req.params;
  const data = req.body;
  console.log(data);
  try {
    const passcheck = await checkpass(user.username, data.password);

    if (!passcheck) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const [rows] = await pool.query(
      "UPDATE users SET name = ?, lastname = ?, bio = ?, email = ?, phone = ? WHERE username = ?",
      [
        data.name,
        data.lastname,
        data.bio,
        data.email,
        data.phone,
        user.username,
      ]
    );

    const Pprouter = "public/PP";

    let profilePictureUrl = "";

    if (data.removing) {
      profilePictureUrl = null;
    } else {
      profilePictureUrl = `http://localhost:5500/ProfileP/${user.username}.webp`;
    }

    const newdata = {
      username: user.username,
      name: data.name,
      lastname: data.lastname,
      bio: data.bio,
      email: data.email,
      phone: data.phone,
      profilePictureUrl: profilePictureUrl,
    };

    const token = await createAccesToken(newdata);

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.json({ message: "user updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changepassword = async (req, res) => {
  const { username } = req.params;
  const { newpassword, codeverify } = req.body;

  const codeValidation = await verifycode(username, codeverify);

  console.log(codeValidation);

  if (codeValidation !== true) {
    return res.status(404).json({ message: codeValidation });
  }

  try {
    const PasswordHash = await bcrypt.hash(newpassword, 10);
    const [rows] = await pool.query(
      "UPDATE users SET password = ? WHERE username = ?",
      [PasswordHash, username]
    );
    res.json({ message: "Contraseña Actualizada con exito" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Enable and Disable access validation real user

export const disableAccess = async (req, res) => {
  const user = req.params;
  try {
    const [rows] = await pool.query(
      "UPDATE users SET status = 0 WHERE username =?",
      [user.username]
    );
    res.json({ menubar: `${user.username} have been desible` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const enableAccess = async (req, res) => {
  const user = req.params;
  try {
    const [rows] = await pool.query(
      "UPDATE users SET status = 1 WHERE username =?",
      [user.username]
    );
    res.json({ menubar: `${user.username} have been enable` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const sendPinvalidation = async (req, res) => {
  const { username } = req.params;
  const Pin = Math.floor(Math.random() * 900000) + 100000;

  const rescode = await codeExists(username);

  if (!rescode[0].pin) {
    const email = rescode[0].email;
    let mailOptions = sendPincode(email, Pin);
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Correo enviado: " + info.response);
      }
    });

    try {
      const saveindb = await pool.query(
        "UPDATE users SET pin = ? WHERE email = ?",
        [Pin, email]
      );
      console.log("Codigo almacenado");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

    res.status(200).json("El codigo ha sido envido");
  } else {
    res.status(202).json("El codigo ya ha sido enviado anteriormente");
  }
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

export const validatePassword = async (req, res) => {
  const { password } = req.body;
  const { username } = req.params;

  const ispass = await checkpass(username, password);

  if (!ispass) {
    return res.status(404).json({ message: "Contraseña Incorrecta" });
  }
  return res.status(200).json(true);
};

export const getDietary = async (req, res) => {
  const user = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT user_categoria.id_categoria,categorias.nombre_categoria FROM user_categoria JOIN categorias on user_categoria.id_categoria = categorias.id_categoria WHERE id_usuario = ?",
      [user.username]
    );
    res.json(rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeDietaryCategory = async (req, res) => {
  const user = req.params;
  const data = req.body;
  try {
    const [rows] = await pool.query(
      "DELETE FROM user_categoria WHERE id_usuario = ? AND id_categoria =?",
      [user.username, data.id_categoria]
    );
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
