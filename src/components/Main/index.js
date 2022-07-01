import styled from "styled-components";

import deviceType from "../../util/deviceCheck";

export default function Main() {
  return (
    <MainWrap>
      <img src="/images/not_monitoring_logo.png" alt="" />
      <div>
        <p>
          <img src="/images/photo.png" alt="사진첩 아이콘" />
          <span>photo</span>
        </p>
        <p>
          <img src="/images/map.png" alt="내기기위치 아이콘" />
          <span>map</span>
        </p>
      </div>
      {deviceType() === "desktop" && <button>감시 시작</button>}
    </MainWrap>
  );
}

const MainWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    @media screen and (max-width: 1200px) {
      width: 225px;
    }
  }

  div {
    padding-top: 60px;
    display: flex;

    @media screen and (max-width: 1200px) {
      padding-top: 50px;
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      padding: 40px 30px;
      cursor: pointer;
      border: 4px solid #1a73e8;
      border-radius: 20px;
      background-color: #fff;

      @media screen and (max-width: 1200px) {
        padding: 20px;
        margin-right: 30px;
      }

      img {
        margin-bottom: 30px;

        @media screen and (max-width: 1200px) {
          width: 70px;
          margin-bottom: 20px;
        }
      }

      span {
        font-size: 18px;
        font-weight: bold;
      }
    }

    p:last-child {
      margin-right: 0;
    }
  }

  button {
    padding: 15px 150px;
    font-size: 20px;
    border: none;
    border-radius: 20px;
    margin-top: 60px;
    color: #fff;
    background-color: #1a73e8;
  }
`;
