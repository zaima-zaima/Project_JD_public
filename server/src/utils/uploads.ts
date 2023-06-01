import path from "path";
import fs from "fs";
import multer from "multer";
export default async function (destination: string) {
  try {
    await fs.promises.readdir(path.resolve(__dirname, "../../../uploads"));
  } catch {
    await fs.promises.mkdir(path.resolve(__dirname, "../../../uploads"));
  }

  try {
    await fs.promises.readdir(destination);
  } catch (e) {
    await fs.promises.mkdir(destination);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const timeStamp = Date.now();
      const random = Math.random().toString(36).slice(-10);
      const ext = path.extname(file.originalname);
      cb(null, `${timeStamp}${random}${ext}`);
    },
  });

  const upload = multer({ storage: storage });
  return upload;
}
