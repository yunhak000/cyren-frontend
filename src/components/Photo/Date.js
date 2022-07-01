import styled from "styled-components";

export default function Date() {
  return (
    <DateWrap className="date">
      <button className="prev">
        <img src="/images/left_arrow.png" alt="" />
      </button>
      <span>2022-07-02</span>
      <button className="next">
        <img src="/images/right_arrow.png" alt="" />
      </button>
    </DateWrap>
  );
}

const DateWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 40px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  background-color: #fff;

  @media screen and (max-width: 1200px) {
    padding: 15px 25px;
    font-size: 18px;
  }

  button {
    padding: 0;
    background: none;
    border: none;

    img {
      width: 13px;
    }
  }
`;
