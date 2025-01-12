import React, { useEffect } from "react";
import FormPdf from "../components/FormPdf";
import { useSelector } from "react-redux";

const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.userAuth);

  useEffect(()=>{
    if(userInfo){
      console.log("userInfo: ",userInfo);      
    }
  },[userInfo]);

  return (
    <>
    <div className="text-center mt-5">
      <h2>{`Welcome to PDF extractor ${userInfo? userInfo.name : ''}`}</h2>
      <p>Please upload the PDF file to extract down below !</p> 
    </div>
    <FormPdf />
    </>
  )
}


export default HomeScreen;
