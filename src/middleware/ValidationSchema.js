export const validationSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.issues.map((error) => error.message) });
  }
};
