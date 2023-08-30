import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("midd", file);
    return cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
