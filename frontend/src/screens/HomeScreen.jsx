import React from "react";
import FormPdf from "../components/FormPdf";

const HomeScreen = () => {
  return (
    <div>
      <h2>Welcome to PDF extractor</h2>
      <p>Please upload the PDF file to extract down below !</p>
      <FormPdf />
    </div>
  )
}


export default HomeScreen;