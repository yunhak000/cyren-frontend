import styled from "styled-components";

export default function Login() {
  return (
    <LoginWrap>
      <div>
        <img src="/images/monitoring_logo.png" alt="로고 이미지" className="login-logo" />
        <img src="/images/google_login_button.png" alt="구글 로그인 버튼" className="google-login-button" />
      </div>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff6f6;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .login-logo {
      margin-bottom: 57px;

      @media screen and (max-width: 1200px) {
        width: 225px;
        margin-bottom: 40px;
      }
    }

    .google-login-button {
      width: 300px;
      cursor: pointer;

      @media screen and (max-width: 1200px) {
        width: 225px;
      }
    }
  }
`;
