import multer from 'multer';
import fs from 'fs';

const uploadPath = "public/uploadedPdfs";


// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); 
  console.log("Upload directory created: ", uploadPath);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file) {    
      cb(new Error('No file found in the request!'), null);
    } else {
      cb(null, uploadPath); 
    }
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
      cb(null, true); 
  } else {
      cb(new Error('Only PDF files are allowed!'), false);
  }
};

export const uploadPdf = multer({
  storage,
  fileFilter
}).single("pdf");