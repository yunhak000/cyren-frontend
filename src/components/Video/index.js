import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { motionDetector } from "../../utils/motionDetector";

import useStore from "../../store";

const Video = () => {
  const { setToggleAlert, socket, userEmail } = useStore();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let timer = useRef();
  let isShowPCAlert = useRef(false);

  const webcamCapture = () => {
    return webcamRef.current.getScreenshot();
  };

  const detectWebcamFeed = async (posenet_model) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      if (!webcamRef.current.stream.active) {
        if (!isShowPCAlert.current) {
          setToggleAlert(true);

          socket.emit("request-alert-sounding", userEmail);

          isShowPCAlert.current = true;
        }
      }
      const video = webcamRef.current.video;
      const pose = await posenet_model.estimateSinglePose(video);

      motionDetectorResult(pose);
    }
  };

  const runPosenet = async () => {
    const posenet_model = await posenet.load({
      scale: 0.8,
    });

    timer.current = setInterval(() => {
      detectWebcamFeed(posenet_model);
    }, 100);
  };

  const motionDetectorResult = (pose) => {
    motionDetector(pose["keypoints"], 0.9, webcamCapture, userEmail, socket);
  };

  useEffect(() => {
    runPosenet();

    return () => {
      canvasRef.current = null;
      webcamRef.current = null;

      clearInterval(timer.current);
    };
  }, []);

  return (
    <VideoWrap>
      <Webcam ref={webcamRef} />
      <canvas ref={canvasRef} />
    </VideoWrap>
  );
};

const VideoWrap = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;

  video {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export default Video;
