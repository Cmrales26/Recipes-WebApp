import jwt from "jsonwebtoken";

const secret = process.env.TOKENKEY;

export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
