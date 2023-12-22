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
