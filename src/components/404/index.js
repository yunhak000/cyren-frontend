import styled from "styled-components";

const PageNotFound = () => {
  return (
    <PageNotFoundWrap>
      <p className="title">404 page not found</p>
      <p className="description">페이지를 찾을 수 없습니다.</p>
    </PageNotFoundWrap>
  );
};

const PageNotFoundWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }

  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export default PageNotFound;
