import styled from "styled-components";

import useStore from "../../store";

export default function PhotoDetail() {
  const { photoUrl, setIsShowPhotoDetail } = useStore();
  const closePhotoDetail = () => {
    setIsShowPhotoDetail(false);
  };

  return (
    <PhotoDetailWrap>
      <div>
        <img src={photoUrl} alt="상세사진" />
        <span to="/photo" onClick={closePhotoDetail}>
          X
        </span>
      </div>
    </PhotoDetailWrap>
  );
}

const PhotoDetailWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1;

  div {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      border-radius: 10px;
    }

    span {
      position: absolute;
      bottom: 100%;
      left: 100%;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
      color: #fff;

      @media screen and (max-width: 600px) {
        font-size: 20px;
      }
    }

    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;
