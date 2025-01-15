import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;

//connect to database
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());  
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());

app.use('/api',userRoutes);

app.use(express.static(path.join(__dirname,'public')));
// Serve only uploaded PDFs
console.log("dirname is:",__dirname);


app.use(errorHandler);

app.get('/',(req,res)=>{
  res.send("server readyy")
});


app.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
