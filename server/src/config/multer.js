import { randomUUID } from "crypto";
import multer, { diskStorage } from "multer";

const destination_path = "./src/uploads/";

const local_storage = multer.diskStorage({
  destination: destination_path,
  filename: (_req, file, cb) => {
    const ext = file.extname(file.originalname);
    cb(null, `${file.fieldname}-${crypto.randomUUID.toString()}${ext}`);
  },
});

const uploadLocalFile = multer({
  storage: local_storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default uploadLocalFile;
