import { pool } from "../db/db.js";

export const sendPincode = (email, pin) => {
  const pincode = {
    from: "recipeswebapp@gmail.com",
    to: email,
    subject: "Codigo de Verficación",
    html: `
      <h1>Su código de verificación</h1>
      <p>Por favor, no comparta este código con nadie. Es confidencial.</p>
      <p style="font-size: 18px; font-weight: bold;">${pin}</p>
    `,
  };
  return pincode;
};

export const codeExists = async (username) => {
  try {
    const [res] = await pool.query(
      "SELECT pin, email FROM users WHERE username = ? ",
      [username]
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifycode = async (username, pin) => {
  try {
    const [res] = await pool.query(
      "SELECT pin FROM users WHERE username = ? AND pin = ?",
      [username, pin]
    );
    if (res.length === 0) {
      return "El codigo Ingresado no coincide";
    }

    const deletecode = await pool.query(
      "UPDATE users SET pin = NULL WHERE username = ?",
      [username]
    );
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
