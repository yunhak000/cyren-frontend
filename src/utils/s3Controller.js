import AWS from "aws-sdk";
import dayjs from "dayjs";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_S3_BUCKET },
  region: process.env.REACT_APP_S3_REGION,
});

export const uploadFile = (file, fileName, userEmail, socket) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file.name,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", async (evt) => {
      const date = dayjs().format("YYYY-MM-DD");
      const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const s3Url = "https://siren-photo-bucket.s3.ap-northeast-2.amazonaws.com/" + fileName;

      await fetch(`${process.env.REACT_APP_SERVER_URL}/photos/newPhotos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          fileName,
          s3Url,
          date,
          dateTime,
        }),
      }).catch((error) => console.log(error));

      socket.emit("change-photos", userEmail);
    })
    .send((error) => {
      error && console.log(error);
    });
};

export const deleteFile = (photoIds, socket, userEmail, callPhotoList) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Delete: {
      Objects: photoIds,
      Quiet: false,
    },
  };

  myBucket.deleteObjects(params, async (error) => {
    if (error) {
      console.log(error, error.stack);
    } else {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/photos/removePhotos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoIds,
        }),
      }).catch((error) => {
        alert("삭제에 실패했습니다.");
        error && console.log(error);
      });

      alert("삭제되었습니다.");

      socket.emit("change-photos", userEmail);

      callPhotoList();
    }
  });
};
