# PDF Extractor

PDF Extractor is a full-stack web application designed to help users upload, manage, and extract specific pages from PDF documents. With built-in user authentication and an intuitive UI, users can securely store their PDFs and generate new PDF files by extracting only the pages they need.

## 🚀 Features

- **User Authentication:** Secure registration, login, logout, and token refresh mechanisms using JWT.
- **Password Management:** Forgot and reset password functionality via secure email links (Nodemailer).
- **PDF Uploading:** Easily upload PDF files to the server.
- **PDF Viewing:** View all uploaded PDF files directly within the application.
- **Page Extraction:** Select and extract specific pages from an uploaded PDF to create and download a brand new PDF file.
- **Modern UI:** Responsive, user-friendly interface powered by React and Bootstrap.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React (Vite)
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **PDF Handling:** React-PDF
- **Styling & UI:** Bootstrap, SweetAlert2, React Toastify
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js & Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Uploads:** Multer
- **PDF Manipulation:** pdf-lib
- **Email Service:** Nodemailer

## 📁 Project Structure

```text
PDF-extractor/
├── backend/                # Node.js Express Server
│   ├── config/             # Database and environment configurations
│   ├── controllers/        # Request handlers (e.g., userController.js)
│   ├── middlewares/        # Custom middlewares (authMiddleware, multerConfig)
│   ├── models/             # Mongoose database models
│   ├── public/             # Static files (stores uploaded PDFs)
│   ├── repositories/       # Database query abstraction
│   ├── routes/             # API route definitions (e.g., userRoutes.js)
│   ├── services/           # Core business logic
│   ├── utils/              # Utility functions and helpers
│   └── server.js           # Backend application entry point
├── frontend/               # React + Vite Client Application
│   ├── public/             # Public static assets
│   ├── src/
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── redux/          # Redux slices and store configuration
│   │   ├── screens/        # Page-level components
│   │   └── utils/          # Client-side utility functions
│   ├── index.html          # HTML entry point
│   └── vite.config.js      # Vite bundler configuration
└── package.json            # Root package.json for concurrently running client & server
```

## ⚙️ Setup and Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd PDF-extractor
```

### 2. Install Dependencies
Install dependencies for the root, backend, and frontend:
```bash
# Install concurrently at the root level
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in both the `backend` and `frontend` directories with the appropriate configurations.

**`backend/.env`**
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
# MongoDB Connection String
MONGO_URI=your_mongodb_uri
# JWT Secret Keys
JWT_SECRET=your_jwt_secret
# Nodemailer configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```
*(Note: adjust your Vite environment variables based on your frontend setup.)*

### 4. Run the Application
You can start both the frontend and backend servers simultaneously from the root directory using `concurrently`:

```bash
# Make sure you are in the root directory
cd ../
npm run dev
```

- The **Frontend** will be running at `http://localhost:5173`
- The **Backend** will be running at `http://localhost:5000`

## 🛡️ License
This project is licensed under the [ISC License](LICENSE).
