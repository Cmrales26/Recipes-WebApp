import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "recipeswebapp@gmail.com",
    pass: "ypgo nhtu darw fujp",
  },
});
