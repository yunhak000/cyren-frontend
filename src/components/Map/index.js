import styled from "styled-components";

export default function Map() {
  return (
    <MapWrap className="container">
      <div></div>
    </MapWrap>
  );
}

const MapWrap = styled.div`
  padding: 30px 0;

  div {
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
  }
`;
