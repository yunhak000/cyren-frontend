import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../firebase";
import { socketStore, monitoringStore, userEmailStore } from "../../store";

export default function Header() {
  const navigate = useNavigate();
  const { socket } = socketStore();
  const { isMonitoring } = monitoringStore();
  const { userEmail } = userEmailStore();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        socket && socket.disconnect();
        socketStore.setState({ socket: null });

        navigate("/login");
      }
    });

    if (socket) {
      socket.on("request-monitoring-state", () => {
        socket.emit("response-monitoring-state", isMonitoring, userEmail);
      });

      socket.on("setting-monitoring", (isMonitoring) => {
        userEmailStore.setState({ isMonitoring });
      });
    }
  }, []);

  return (
    <HeaderWrap>
      <div className="container">
        <h1>
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </h1>
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
  background-color: #1a73e8;

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
      color: #1a73e8;

      @media screen and (max-width: 1200px) {
        font-size: 14px;
        padding: 5px 15px;
      }
    }
  }
`;
