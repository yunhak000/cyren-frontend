import styled from "styled-components";

import Date from "./Date";
import PhotoList from "./PhotoList";

export default function Photo() {
  return (
    <PhotoWrap>
      <div className="container">
        <Date />
        <PhotoList />
      </div>
    </PhotoWrap>
  );
}

const PhotoWrap = styled.div`
  padding: 30px 0;
`;
