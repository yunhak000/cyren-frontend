import styled from "styled-components";

import useStore from "../../store";

export default function MobileAlert() {
  const { setToggleAlert, socket, userEmail } = useStore();

  console.log("mobileAlert");

  return (
    <MobileAlertWrap>
      <p>경보가 울리는 중입니다.</p>
      <button
        onClick={() => {
          setToggleAlert(false);
          socket.emit("request-alert-off", userEmail);
        }}
      >
        경보 끄기
      </button>
    </MobileAlertWrap>
  );
}

const MobileAlertWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  background-color: #df2828;
  color: #fff;

  p {
    margin-right: 15px;
  }

  button {
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #fff;
    font-weight: bold;
  }
`;
