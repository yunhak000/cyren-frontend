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

export const uploadFile = (file, fileName, userEmail) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file.name,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", async (evt) => {
      const today = dayjs().format("YYYY-MM-DD");
      const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const s3Url = "https://siren-photo-bucket.s3.ap-northeast-2.amazonaws.com/" + fileName;

      await fetch("http://localhost:8000/photo/newPhotos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          fileName,
          s3Url,
          today,
          dateTime,
        }),
      }).then((response) => {
        console.log(response);
      });
    })
    .send((err) => {
      if (err) console.log(err);
    });
};
