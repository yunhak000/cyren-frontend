import { useEffect, useState } from "react";
import styled from "styled-components";
import KakaoMapScript from "../../utils/kakaoMapScript";
import useStore from "../../store";

const Map = () => {
  const [location, setLocation] = useState([]);
  const { userEmail } = useStore();

  const getLocation = async () => {
    const res = await fetch("http://localhost:8000/locations/lastLocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
      }),
    }).catch((error) => error && console.log(error));

    const lastLocation = await res.json();

    setLocation(lastLocation);
  };

  useEffect(() => {
    getLocation();
  }, [userEmail]);

  useEffect(() => {
    location.length && KakaoMapScript(location[0].latitude, location[0].longitude);
  }, [location]);

  return (
    <MapWrap className="container">
      <div id="myMap"></div>
    </MapWrap>
  );
};

const MapWrap = styled.div`
  padding: 30px 0;

  #myMap {
    border: 1px solid #ddd;
    height: 500px;
    padding: 20px;
    border-radius: 20px;

    @media screen and (max-width: 1200px) {
      height: 300px;
    }
  }
`;

export default Map;
