import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../firebase";
import useStore from "../../store";

import deviceCheck from "../../utils/deviceCheck";

import Video from "../Video";

export default function Header() {
  const navigate = useNavigate();
  const { setToggleAlert, setSocket, socket, setMonitoring, isMonitoring, userEmail } = useStore();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        socket && socket.disconnect();
        setSocket({ socket: null });

        navigate("/login");
      }
    });

    if (socket) {
      socket.on("request-monitoring-state", () => {
        socket.emit("response-monitoring-state", isMonitoring, userEmail);
      });

      socket.on("setting-monitoring", (isMonitoring) => {
        setMonitoring(isMonitoring);
      });

      socket.on("response-alert-sounding", () => {
        setToggleAlert(true);
      });

      socket.on("response-alert-off", () => {
        setToggleAlert(false);
      });
    }
  }, [isMonitoring]);

  return (
    <HeaderWrap isMonitoring={isMonitoring}>
      <div className="container">
        <h1>
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </h1>
        {deviceCheck() === "desktop" && isMonitoring && <Video />}
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          로그아웃
        </button>
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  padding: 22px 0;
  z-index: 1;
  background-color: ${(props) => (props.isMonitoring ? "#df2828" : "#1a73e8")};

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: inline-block;

      img {
        @media screen and (max-width: 1200px) {
          width: 60px;
        }
      }
    }

    button {
      font-weight: bold;
      border: none;
      border-radius: 10px;
      padding: 8px 25px;
      background-color: #fff;
      color: ${(props) => (props.isMonitoring ? "#df2828" : "#1a73e8")};

      @media screen and (max-width: 1200px) {
        font-size: 14px;
        padding: 5px 15px;
      }
    }
  }
`;
