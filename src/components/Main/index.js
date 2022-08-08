import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import deviceCheck from "../../utils/deviceCheck";
import useStore from "../../store";
import Guide from "../Modal/Guide";

const Main = () => {
  const { socket, toggleMonitoring, isMonitoring, userEmail, isShowGuideModal } = useStore();

  const startMonitoring = () => {
    toggleMonitoring();
  };

  const stopMonitoring = () => {
    toggleMonitoring();
  };

  useEffect(() => {
    if (deviceCheck() === "desktop") {
      socket && socket.emit("response-monitoring-state", isMonitoring, userEmail);
    }
  }, [isMonitoring]);

  return (
    <>
      {isShowGuideModal && deviceCheck() === "desktop" && <Guide />}
      <MainWrap isMonitoring={isMonitoring}>
        {deviceCheck() === "desktop" && (
          <span className="qr-code-wrap">
            <span className="qr-text">QR</span>
            <img src="/images/qr_code.png" alt="qr_code" />
          </span>
        )}

        {isMonitoring ? <img src="/images/monitoring_logo.png" alt="감시중일때의 로고" /> : <img src="/images/not_monitoring_logo.png" alt="감시중이지 않을때의 로고" />}
        <div>
          <Link to="/photo">
            <img src="/images/photo.png" alt="사진첩 아이콘" />
            <span>photo</span>
          </Link>
          <Link to="/map">
            <img src="/images/map.png" alt="내기기위치 아이콘" />
            <span>map</span>
          </Link>
        </div>
        {deviceCheck() === "desktop" ? (
          isMonitoring ? (
            <button className="stop-monitoring" onClick={stopMonitoring}>
              감시 종료
            </button>
          ) : (
            <button onClick={startMonitoring}>감시 시작</button>
          )
        ) : null}
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .qr-code-wrap {
    position: absolute;
    top: -20px;
    right: 0;

    .qr-text {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;
      border: 2px solid #000;
      background-color: #fff;
    }

    img {
      display: none;
      position: absolute;
      top: 100%;
      left: 100%;
      border: 1px solid #000;
    }

    :hover {
      img {
        display: block;
      }
    }
  }

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

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      padding: 40px 30px;
      cursor: pointer;
      border: ${(props) => (props.isMonitoring ? "4px solid #df2828" : "4px solid #1a73e8")};
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

    a:last-child {
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

  button.stop-monitoring {
    background-color: #df2828;
  }
`;

export default Main;
