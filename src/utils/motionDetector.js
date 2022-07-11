import { uploadFile } from "./s3Controller";
import uuid from "react-uuid";

let isPhotoCapture = true;

export const motionDetector = (keypoints, minConfidence, webcamCapture, userEmail, socket) => {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score > minConfidence) {
      if (isPhotoCapture) {
        isPhotoCapture = false;

        const url = webcamCapture();

        (async () => {
          const fileName = uuid() + ".jpg";
          const file = await urlToFile(url, fileName, "image/jpeg");

          uploadFile(file, fileName, userEmail, socket);
        })();

        setTimeout(() => {
          isPhotoCapture = true;
        }, 1000);
      }

      continue;
    }
  }
};

const urlToFile = async (url, filename, mimeType) => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();

  return new File([buf], filename, { type: mimeType });
};
