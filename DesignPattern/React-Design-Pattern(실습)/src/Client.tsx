import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpForm from "./compound/SignUpForm";
import PraticeContainer from "./container-presenter/pratice/PraticeContainer";
import SignUpPage from "./hoc/wrapper/SignUpPage";
import Provider from "./provider/pratice/Provider";

function Client() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={"/provider"} element={<Provider />} />
        <Route path={"/hoc"} element={<SignUpPage />} />
        <Route path={"/compound"} element={<SignUpForm />} />
        <Route path={"/container-presenter"} element={<PraticeContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Client;
