// import path from "path";
import { fs } from "file-system";
import multer from "multer";
import sharp from "sharp";
import path from "path";

export const removeProfilePhoto = (req, res) => {
  const { username } = req.params;
  const filePath = `public/PP/${username}.jpg`;

  fs.unlink(filePath, (err) => {
    if (err) {
      res.json(err);
      return;
    } else {
      res.status(200).json("Foto de perfil eliminada");
    }
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/PP");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadProfilePhoto = (req, res) => {
  const data = req.body;
  console.log(data)
  sharp(req.file.buffer)
    .webp()
    .toBuffer()
    .then((buffer) => {
      req.file.buffer = buffer;
      req.file.mimetype = "image/webp";
      const filename = path.parse(req.file.originalname).name + ".webp";
      fs.writeFile(`./public/PP/${filename}`, buffer, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Error al guardar la imagen" });
        } else {
          res.status(200).json({
            message: "Imagen subida y convertida a WebP exitosamente",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error al convertir la imagen a WebP" });
    });
};
