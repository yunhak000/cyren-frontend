import styled from "styled-components";

const check = (e) => {
  e.target.classList.toggle("on");
};

export default function PhotoList() {
  return (
    <>
      <PhotoListWrap>
        <div className="photo-button-wrap">
          <button className="all-delete">전체삭제</button>
          <button className="delete">삭제</button>
        </div>
        <div className="photo-list-items">
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
          <div>
            <span onClick={check}></span>
            <img src="/images/photo.jpg" alt="사진" />
          </div>
        </div>
      </PhotoListWrap>
    </>
  );
}

const PhotoListWrap = styled.div`
  .photo-button-wrap {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    text-align: right;

    @media screen and (max-width: 1200px) {
      margin: 10px 0;
    }

    button {
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      color: #fff;
      background-color: #df2828;

      @media screen and (max-width: 1200px) {
        padding: 8px 15px;
        font-size: 14px;
      }
    }

    .all-delete {
      background-color: #606060;
    }
  }

  .photo-list-items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 10px;
    column-gap: 10px;

    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 5px;
      column-gap: 5px;
    }
  }

  .photo-list-items div {
    position: relative;

    span {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fff;

      @media screen and (max-width: 1200px) {
        width: 15px;
        height: 15px;
      }
    }

    .on:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
      border-radius: 50%;
      background-color: #1a73e8;
    }

    img {
      width: 100%;
      border-radius: 5px;
    }
  }
`;
