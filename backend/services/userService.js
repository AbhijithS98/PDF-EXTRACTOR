import UserRepository from "../repositories/userRepository.js";
import generateTokens from "../utils/generateToken.js";
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class UserService {

  // Register User
  async registerUser({name, email, password}) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      const error = Error('User already exists');
      error.name = 'ValidationError';  
      throw error;
    }    
    const newUser = await UserRepository.createUser({ name, email, password });  
    return newUser;
  }




  async loginUser(email, password, res) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      const error = Error('User not found');
      error.name = 'ValidationError';  
      throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const error = Error('Invalid password');
      error.name = 'ValidationError';  
      throw error;
    }

    // Generate JWT token for the user
    const token = generateTokens(res,user._id)
    return {user,token};
  }



  async clearCookie(req, res) {
   
    try {
      res.cookie('refreshJwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),  
      });

    } catch (error) {
      error.name = 'ValidationError';  
      throw error;
    }
  }




  async pdfUpload(req) {
    
    const _id = req.user.userId;
    const User = await UserRepository.findUserById(_id);
    if (!User) {
        const error = Error("User not exists");
        error.name = 'ValidationError';  
        throw error;
    }
  
    console.log("filepath", req.file?.path);
    const uploadedFilePath = req.file?.path.replace(/\\/g, "/").replace(/^public\//, "") ?? null;
    const uploadedFileName = req.file?.originalname;
    console.log("newpath", uploadedFilePath);

    if (!uploadedFilePath || !uploadedFileName) {
      const error = new Error("No file uploaded");
      error.name = "ValidationError";
      throw error;
    }
   
    const newUploadedFile = {
    fileName: uploadedFileName,
    filePath: uploadedFilePath,
    uploadedAt: new Date(),
    };

    const updatedUser = await UserRepository.updateUserById(
      _id,
      { $push: { "pdfFiles.uploaded": newUploadedFile } }
    );

    return updatedUser;
  }



  async getUploadedAndExtractedPdfs(req) {
   
    try {
      const _id = req.user.userId;

      const User = await UserRepository.findUserById(_id);
      if (!User) {
        const error = Error("User not exists");
        error.name = 'ValidationError';  
        throw error;
      }
 
      // Retrieve both uploaded and extracted files in a single query
      const userDetails = await UserRepository.getUserDetailsById(_id, {
        "pdfFiles.uploaded": 1,
        "pdfFiles.extracted": 1
      });

      // Check if the user has any files
      if (!userDetails || !userDetails.pdfFiles) {
        return {
          uploaded: [],
          extracted: []
        };
      }

      const uploadedFiles = userDetails.pdfFiles.uploaded || [];
      const extractedFiles = userDetails.pdfFiles.extracted || [];

      return {
        uploaded: uploadedFiles,
        extracted: extractedFiles
      };

    } catch (error) {
      console.error("Error fetching uploaded and extracted PDF files:", error.message);
      throw error;
    }
  }




  async generatePdf(req, res) {
    
    try {
      const { fileId, selectedPages, newPdfName } = req.body;
      const _id = req.user.userId; 
    
      if (!fileId || !newPdfName || !selectedPages || selectedPages.length === 0) {
        const error = new Error("File ID, newpdfname and selected pages are required.")
        error.name = 'ValidationError'
        throw error;
      }

      // Find the user and the PDF file in the database
      const User = await UserRepository.findUserById(_id);
      if (!User) {
        const error = new Error("User id is invalid")
        error.name = 'ValidationError'
        throw error;
      }

      const uploadedFile = User.pdfFiles.uploaded.find((file) => file._id.toString() === fileId);
        if (!uploadedFile) {
          const error = new Error("Uploaded file not found.")
          error.name = 'ValidationError'
          throw error;
        }

      const filePath = path.join(__dirname, `../public/${uploadedFile.filePath}`);
      

        // Load the original PDF from the file system
        const existingPdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
        // Extract the selected pages
        const newPdfDoc = await PDFDocument.create();
        for (let pageNumber of selectedPages) {
          const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
          newPdfDoc.addPage(copiedPage);
        }
    
        // Save the new PDF to the server
        const extractedPdfBytes = await newPdfDoc.save();
        const extractedFileName = `${newPdfName}_${Date.now()}.pdf`;
        const extractedFilePath = path.join(__dirname, "../public/extractedPdfs", extractedFileName);
        console.log("name:",extractedFileName, "pth:",extractedFilePath);

        
        // Check if the directory exists
        const dirPath = path.dirname(extractedFilePath);
        console.log("dirpathhhh: ",dirPath);
        
        if (!fs.existsSync(dirPath)) {
          // Create the directory if it doesn't exist
          fs.mkdirSync(dirPath, { recursive: true });
          console.log("Directory created:", dirPath);
        } else {
          console.log("Directory already exists:", dirPath);
        }

        fs.writeFileSync(extractedFilePath, extractedPdfBytes);
    
        const relativeExtractedFilePath = extractedFilePath.replace(/\\/g, "/").replace(/^.*\/public\//, "");
        console.log("refp:",relativeExtractedFilePath);
        
        // Save the new PDF file to the user's document
        const extractedFile = {
          fileName: `${newPdfName}.pdf`,
          filePath: relativeExtractedFilePath,
        };
    
        User.pdfFiles.extracted.push(extractedFile);
        await User.save();
        return relativeExtractedFilePath;
        
    } catch (error) {
      console.error("Error creating new pdf:", error.message);
      throw error
    }
  }

}


export default new UserService();
