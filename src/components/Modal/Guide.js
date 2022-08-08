import styled from "styled-components";
import useStore from "../../store";

const Guide = () => {
  const { setIsShowGuideModal } = useStore();

  return (
    <GuideWrap>
      <div className="giude-area">
        <h3 className="title">해당서비스는 다음과 같은 설정을해야 정상적으로 이용가능합니다.</h3>
        <ul>
          <li>랩탑의 절전모드를 해제해주세요.</li>
          <li>노트북 볼륨을 키워주세요.</li>
        </ul>
        <p className="close-wrap">
          <span
            onClick={() => {
              setIsShowGuideModal(false);
            }}
          >
            닫기
          </span>
        </p>
      </div>
    </GuideWrap>
  );
};

const GuideWrap = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .giude-area {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    white-space: nowrap;
    border: 1px solid #444;
    border-radius: 20px;
    background: #fff;
  }

  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    padding: 10px;
    border-radius: 10px;
    background: #ebebeb;

    li {
      position: relative;
      line-height: 30px;
      text-align: center;
      padding-left: 10px;
    }
  }

  .close-wrap {
    text-align: center;
    margin-top: 20px;

    span {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      background: #444;
      color: #fff;
    }
  }
`;

export default Guide;
