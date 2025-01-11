import express from 'express';
import { uploadPdf } from '../middlewares/multerConfig.js';
import userController from '../controllers/userController.js';
import verifyUserToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.post('/upload',uploadPdf, (req,res) => {
  res.send({ message: 'File uploaded successfully', file: req.file });
});




export default router;
