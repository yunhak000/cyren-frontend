import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default function PCAlert() {
  const content = (
    <>
      <audio src="/audio/siren_bgm.mp3" autoPlay loop />
      <PCAlertWrap boxFade={boxFade}></PCAlertWrap>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer"));
}

const PCAlertWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  animation: ${boxFade} 1s linear infinite;
  background-color: rgba(255, 0, 0, 0.7);
`;
