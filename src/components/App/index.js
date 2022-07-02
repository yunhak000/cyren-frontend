import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { Reset } from "styled-reset";

import Login from "../Login";
import Header from "../Header";
import Main from "../Main";
import Photo from "../Photo";
import Map from "../Map";
import PageNotFound from "../404";

function App() {
  return (
    <>
      <GlobalStyles />
      <Reset />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={[<Header key="header" />, <Main key="main" />]} />
          <Route path="/photo" element={[<Header key="header" />, <Photo key="photo" />]} />
          <Route path="/map" element={[<Header key="header" />, <Map key="map" />]} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
