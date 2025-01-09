import express from 'express';
import { uploadPdf } from '../middlewares/multerConfig.js';

const router = express.Router();

router.post('/upload',uploadPdf, (req,res) => {
  res.send({ message: 'File uploaded successfully', file: req.file });
});

export default router;
