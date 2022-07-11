import { useEffect, useRef } from "react";
import styled from "styled-components";

import useStore from "../../store";

import { deleteFile } from "../../utils/s3Controller";

const PhotoList = () => {
  const { date, userEmail, photos, setPhotos, setPhotoUrl, setIsShowPhotoDetail, socket } = useStore();
  let photoIds = useRef([]);

  const showDetailPhoto = (url) => {
    setPhotoUrl(url);
    setIsShowPhotoDetail(true);
  };

  const callPhotoList = async () => {
    if (userEmail) {
      const data = await fetch("http://localhost:8000/photos/photoLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          date,
        }),
      }).catch((error) => error && console.log(error));

      const photos = await data.json();

      setPhotos(photos);
    }
  };

  const photoAllDelete = () => {
    const photoAllList = [];

    photos.map((photo) => {
      photoAllList.push({ Key: photo.fileName });
    });

    if (window.confirm("정말 삭제 하시겠습니까?")) {
      deleteFile(photoAllList, socket, userEmail, callPhotoList);
    }
  };

  const photoCheck = (e) => {
    const isPhotoIds = photoIds.current.filter((photoId) => photoId.Key === e.target.id);

    if (isPhotoIds.length) {
      e.target.classList.remove("on");
      photoIds.current = photoIds.current.filter((photoId) => {
        return photoId.Key !== e.target.id;
      });
    } else {
      e.target.classList.add("on");
      photoIds.current.push({ Key: e.target.id });
    }
  };

  useEffect(() => {
    photoIds.current = [];

    callPhotoList();

    socket &&
      socket.on("call-photo-list", () => {
        callPhotoList();
      });
  }, [date, userEmail]);

  return (
    <>
      <PhotoListWrap>
        {photos.length ? (
          <div className="photo-button-wrap">
            <button className="photo-all-delete" onClick={photoAllDelete}>
              전체삭제
            </button>
            <button
              className="delete"
              onClick={() => {
                if (window.confirm("정말 삭제 하시겠습니까?")) {
                  deleteFile(photoIds.current, socket, userEmail, callPhotoList);
                }
              }}
            >
              삭제
            </button>
          </div>
        ) : null}
        <div className="photo-list-items">
          {photos &&
            photos.map((photo) => {
              return (
                <div key={photo._id}>
                  <span onClick={photoCheck} id={photo.fileName}></span>
                  <img
                    src={photo.s3Url}
                    alt="사진"
                    onClick={() => {
                      showDetailPhoto(photo.s3Url);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </PhotoListWrap>
    </>
  );
};

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

    .photo-all-delete {
      background-color: #444;
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

    div {
      cursor: pointer;
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

export default PhotoList;
