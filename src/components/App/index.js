import GlobalStyles from "./GlobalStyles";
import { Reset } from "styled-reset";

import Login from "../Login";
import Header from "../Header";
import Main from "../Main";
import Photo from "../Photo";
import Map from "../Map";

function App() {
  return (
    <>
      <GlobalStyles />
      <Reset />
      {/* <Header /> */}
      <Login />
      {/* <Main /> */}
      {/* <Photo /> */}
      {/* <Map /> */}
    </>
  );
}

export default App;
