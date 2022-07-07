import { uploadFile } from "./s3Uploader";
import uuid from "react-uuid";

let isPhotoCapture = true;

export function motionDetector(keypoints, minConfidence, webcamCapture) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score > minConfidence) {
      if (isPhotoCapture) {
        isPhotoCapture = false;

        const url = webcamCapture();

        (async () => {
          const file = await urlToFile(url, uuid(), "image/jpeg");

          console.log("업로드");

          uploadFile(file);
        })();

        setTimeout(() => {
          isPhotoCapture = true;
        }, 1000);
      }

      continue;
    }
  }
}

const urlToFile = async (url, filename, mimeType) => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();

  return new File([buf], filename, { type: mimeType });
};
