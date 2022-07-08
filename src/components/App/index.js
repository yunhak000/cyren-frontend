import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { Reset } from "styled-reset";

import useStore from "../../store";

import deviceCheck from "../../utils/deviceCheck";

import Login from "../Login";
import Header from "../Header";
import Main from "../Main";
import Photo from "../Photo";
import Map from "../Map";
import Video from "../Video";
import PCAlert from "../Modal/PCAlert";
import MobileAlert from "../Modal/MobileAlert";
import PhotoDetail from "../Modal/PhotoDetail";
import PageNotFound from "../404";

export default function App() {
  const { isMonitoring, isAlert, isShowPhotoDetail } = useStore();

  return (
    <>
      <GlobalStyles isMonitoring={isMonitoring} />
      <Reset />
      {deviceCheck() === "desktop" && isMonitoring && <Video />}
      {deviceCheck() === "desktop" && isAlert && <PCAlert />}
      {isShowPhotoDetail && <PhotoDetail />}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={[<Header key="header" />, <Main key="main" />]} />
          <Route path="/photo" element={[<Header key="header" />, <Photo key="photo" />]} />
          <Route path="/map" element={[<Header key="header" />, <Map key="map" />]} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
      {deviceCheck() !== "desktop" && isAlert && <MobileAlert />}
    </>
  );
}
