import { ref } from "vue";
import { defineStore } from "pinia";

export const useQrCodeStore = defineStore("qrCode", () => {
  const selectedOption = ref({
    videoName: "",
    videoDimension: "",
    qrUrl: "",
    qrPosition: {value: ""},
    size: "",
    backgroundColor: "",
    colorDark: "",
    eye_color01: "",
    eye_color02: "",
    frameText: "",
  });

  const setSelectedOption = (option) => {
    selectedOption.value = option;
  };
  const setSelectedVideoUrlValue = (value) => {
    selectedOption.value.videoName = value;
  };

  const setSelectedVideoDimensionsValue = (value) => {
    selectedOption.value.videoDimension = value;
  };
  const setSelectedQrCodeUrlValue = (value) => {
    selectedOption.value.qrUrl = value;
  };
  const setSelectedQrCodePositionValue = (value) => {
    selectedOption.value.qrPosition = value;
  };
  const setSelectedQrCodeSizeValue = (label) => {
    selectedOption.value.size = label;
  };
  const setSelectedBackGroundColorValue = (value) => {
    selectedOption.value.backgroundColor = value;
  };
  const setSelectedQrPatternsColorValue = (value) => {
    selectedOption.value.colorDark = value;
  };

  const setSelectedQrEyesColorValue = (value) => {
    selectedOption.value.eye_color01 = value;
  };

  const setSelectedQrInnerEyesColorValue = (value) => {
    selectedOption.value.eye_color02 = value;
  };
  const setSelectedCallToActionValue = (value) => {
    selectedOption.value.frameText = value;
  };

  return {
    selectedOption,
    setSelectedOption,
    setSelectedVideoUrlValue,
    setSelectedVideoDimensionsValue,
    setSelectedQrCodeUrlValue,
    setSelectedQrCodePositionValue,
    setSelectedQrCodeSizeValue,
    setSelectedBackGroundColorValue,
    setSelectedQrPatternsColorValue,
    setSelectedQrEyesColorValue,
    setSelectedQrInnerEyesColorValue,
    setSelectedCallToActionValue,
  };
});
