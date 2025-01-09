import multer from 'multer';


const uploadPath = "public/uploadedPdfs";
console.log("uploadpath is: ", uploadPath);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadPath); // Specify upload directory
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
      cb(null, true); // Accept the file
  } else {
      cb(new Error('Only PDF files are allowed!'), false); // Reject the file
  }
};

export const uploadPdf = multer({
  storage,
  fileFilter
}).single("pdf");