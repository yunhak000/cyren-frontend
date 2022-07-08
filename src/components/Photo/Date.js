import styled from "styled-components";
import dayjs from "dayjs";

import useStore from "../../store";

export default function Date() {
  const { date, setDate } = useStore();

  const nextDate = () => {
    const dayjsDate = dayjs(date);
    const nextOneDate = dayjsDate.add(1, "day").format("YYYY-MM-DD");

    setDate(nextOneDate);
  };

  const prevDate = () => {
    const dayjsDate = dayjs(date);
    const prevOneDate = dayjsDate.subtract(1, "day").format("YYYY-MM-DD");

    setDate(prevOneDate);
  };

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <DateWrap className="date">
      <button className="prev" onClick={prevDate}>
        <img src="/images/left_arrow.png" alt="" />
      </button>
      <input type="date" value={date} onChange={changeDate} />
      <button className="next" onClick={nextDate}>
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

  input {
    border: none;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1px;
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
