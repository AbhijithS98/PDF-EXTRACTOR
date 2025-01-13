import express from 'express';
import { uploadPdf } from '../middlewares/multerConfig.js';
import userController from '../controllers/userController.js';
import verifyUserToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.post('/refresh-token',userController.refreshToken);
router.post('/upload',verifyUserToken,uploadPdf,userController.uploadPdf);
router.get('/allFiles',verifyUserToken,userController.fetchAllPdfFiles);
router.post('/extract',verifyUserToken,userController.createNewPdf);
// router.post('/upload',verifyUserToken,uploadPdf, (req,res) => {
//   res.json({ message: 'File uploaded successfully', file: req.file });
// });


export default router;
