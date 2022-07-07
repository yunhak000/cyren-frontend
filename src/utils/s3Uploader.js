import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_S3_BUCKET },
  region: process.env.REACT_APP_S3_REGION,
});

export const uploadFile = (file) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file.name,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (evt) => {})
    .send((err) => {
      if (err) console.log(err);
    });
};
