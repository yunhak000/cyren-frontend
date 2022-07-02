import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../firebase";

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? navigate("/") : navigate("/login");
    });
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
