<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useQrCodeStore } from "@/stores/QRCodeStore";
import qrPosition from '../config/references.json'

const store = useQrCodeStore();
const dynamicQR = "https://qrtiger.com/api/campaign/";
const deleteQR = "https://qrtiger.com/api/campaign/delete/";
const editQR = "https://qrtiger.com/api/campaign/edit/";
const message = ref("");
const isError = ref(false);
const isSelected = ref(false);
const isSizeSelected = ref(false);
const qrIdValues = ref<string[]>([]);
const selectedQrId = ref("");
const imageUrl = ref("");
const padding = 20;
let qrId = ref("");


const videoPlayer = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);

const initializeCanvasSize = () => {
  const video = videoPlayer.value;
  const canvas = canvasElement.value;

  if (video && canvas) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
  }
};

window.addEventListener("resize", initializeCanvasSize);

onMounted(() => {
  initializeCanvasSize();
});

const playSelectedFile = (event) => {
  const file = event.raw;
  const type = file.type;
  const videoNode = videoPlayer.value as HTMLVideoElement;
  const canPlay = videoNode.canPlayType(type);

  if (canPlay === "") {
    message.value = "No video playback capabilities found";
    isError.value = true;
    return;
  }

  const fileURL = URL.createObjectURL(file);
  videoNode.src = fileURL;
};

const saveProperties = () => {
  console.log(
    "The properties for QRcode are:",
    JSON.stringify(store.selectedOption)
  );
};

const editCampaign = async () => {

  if (!selectedQrId.value) {
    console.error("Please select a QR ID to edit.");
    return;
  }

  const apiPayload = {
    qr: {
      size: store.selectedOption.size,
      colorDark: store.selectedOption.colorDark,
      logo: "",
      eye_color: true,
      eye_color01: store.selectedOption.eye_color01,
      eye_color02: store.selectedOption.eye_color02,
      eye_outer: "eyeOuter2",
      eye_inner: "eyeInner1",
      qrData: "pattern0",
      backgroundColor: store.selectedOption.backgroundColor,
      transparentBkg: false,
      qrCategory: "url",
      frame: 1,
      frameText: store.selectedOption.frameText,
      text: "https://www.qrcode-tiger.com/",
    },
    qrUrl: store.selectedOption.qrUrl,
    qrType: "qr2",
    qrCategory: "url",
  };

  const apiUrl = `${editQR}${selectedQrId.value}`;
  console.log("You sent Edit message to url: ", apiUrl);

  try {
    const editResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer 8abb6b80-5948-11ee-ab13-63fc7137c4ca",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!editResponse.ok) {
      throw new Error("Failed to edit campaign");
    }
    const responseJson = await editResponse.json();
    imageUrl.value = responseJson.imageUrl;

    console.log(`Campaign with qrId ${selectedQrId.value} has been edit successfully`
    );
  } catch (error) {
    console.error("API error:", error);
  }
};

const deleteCampaign = async () => {
  const apiUrl = `${deleteQR}${qrId.value}`;
  console.log("You sent DELETE message to url: ", apiUrl);

  try {
    const deleteResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer 8abb6b80-5948-11ee-ab13-63fc7137c4ca",
      },
    });

    if (!deleteResponse.ok) {
      throw new Error("Failed to delete campaign");
    }

    console.log(
      `Campaign with qrId ${qrId.value} has been deleted successfully`
    );
  } catch (error) {
    console.error("API error:", error);
  }
};
const createCampaign = async () => {

  const apiPayload = {
    qr: {
      size: store.selectedOption.size,
      colorDark: store.selectedOption.colorDark,
      logo: "",
      eye_color: true,
      eye_color01: store.selectedOption.eye_color01,
      eye_color02: store.selectedOption.eye_color02,
      eye_outer: "eyeOuter2",
      eye_inner: "eyeInner1",
      qrData: "pattern0",
      backgroundColor: store.selectedOption.backgroundColor,
      transparentBkg: false,
      qrCategory: "url",
      frame: 1,
      frameText: store.selectedOption.frameText,
      text: "https://www.qrcode-tiger.com/",
    },
    qrUrl: store.selectedOption.qrUrl,
    qrType: "qr2",
    qrCategory: "url",
  };

  try {
    const postResponse = await fetch(dynamicQR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 8abb6b80-5948-11ee-ab13-63fc7137c4ca",
      },
      body: JSON.stringify(apiPayload),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to send details to the API");
    }

    const responseJson = await postResponse.json();
    imageUrl.value = responseJson.imageUrl;
    qrId.value = responseJson.data.qrId;
    qrIdValues.value.push(qrId.value);
    selectedQrId.value = qrId.value;
    console.log("Created campaign with qrId:", qrId.value);

  } catch (error) {
    console.error("API error:", error);
  }
};

const handleFileChange = (file) => {
  if (file.raw) {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file.raw);

    video.addEventListener('loadedmetadata', () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const videoDimension = `${videoWidth}x${videoHeight}`;
      store.setSelectedVideoDimensionsValue(videoDimension);
      console.log(videoDimension)
      playSelectedFile(file);
    });
  }
}

// const updateSelectedVideoUrlValue = (selectedValue) => {
//   store.setSelectedVideoUrlValue(selectedValue);
// };
const updateSelectedQrCodeUrlValue = (selectedValue) => {
  store.setSelectedQrCodeUrlValue(selectedValue);
};
const updateSelectedQrCodePositionValue = (selectedValue) => {
  store.setSelectedQrCodePositionValue(selectedValue);
};
const updateSelectedQrCodeSize = (label) => {
  store.setSelectedQrCodeSizeValue(label);
};
const updateSelectedBackGroundValue = (selectedValue) => {
  store.setSelectedBackGroundColorValue(selectedValue);
};
const updateSelectedQrPatternsColorValue = (selectedValue) => {
  store.setSelectedQrPatternsColorValue(selectedValue);
};
const updateSelectedQrEyesColorValue = (selectedValue) => {
  store.setSelectedQrEyesColorValue(selectedValue);
};
const updateSelectedQrInnerEyesColorValue = (selectedValue) => {
  store.setSelectedQrInnerEyesColorValue(selectedValue);
};
const updateSelectedCallToActionValue = (selectedValue) => {
  store.setSelectedCallToActionValue(selectedValue);
};

const generateQRCode = () => {
  if (!store.selectedOption.qrUrl) {
    isError.value = true;
    isSizeSelected.value = true;
    return;
  }
  createCampaign()
  isError.value = false;
};

const changeImagePosition = () => {
  const canvas = canvasElement.value;
  const ctx = canvas.getContext("2d");
  const image = new Image();

  const selectedPosition = store.selectedOption.qrPosition;
  if (!selectedPosition) {
    isSelected.value = true;
    return;
  }
  let imageWidth = 0;
  let imageHeight = 0;
  switch (store.selectedOption.videoDimension) {
    case '1920x1080':
    case '1080x1920':
      switch (store.selectedOption.size) {
        case "200":
          imageWidth = 200;
          imageHeight = 200;
          break;
        case "260":
          imageWidth = 260;
          imageHeight = 260;
          break;
        case "320":
          imageWidth = 320;
          imageHeight = 320;
          break;
      }
      break;

    case '1280x720':
    case '720x1280':
      switch (store.selectedOption.size) {
        case "133":
          imageWidth = 133;
          imageHeight = 133;
          break;
        case "173":
          imageWidth = 173;
          imageHeight = 173;
          break;
        case "213":
          imageWidth = 213;
          imageHeight = 213;
          break;
      }
      break;
  }

  image.src = imageUrl.value;
  image.width = imageWidth;
  image.height = imageHeight;

  let x = 0;
  let y = 0;
  switch (selectedPosition) {
    case "Top Right":
      x = canvas.width - imageWidth;
      y = padding;
      break;
    case "Top Left":
      x = 0;
      y = padding;
      break;
    case "Middle Right":
      x = canvas.width - imageWidth;
      y = (canvas.height - imageHeight) / 2;
      break;
    case "Middle Left":
      x = 0;
      y = (canvas.height - imageHeight) / 2;
      break;
    case "Bottom Right":
      x = canvas.width - imageWidth;
      y = canvas.height - imageHeight - padding;
      break;
    case "Bottom Left":
      x = 0;
      y = canvas.height - imageHeight - padding;
      break;
    default:
      break;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, x, y, imageWidth, imageHeight);
};
</script>

<template>
  <el-card class="box-card">
    <div class="form-container">
      <div class="input-container">
        <el-card>
          <div>
            <el-upload
                v-model="store.selectedOption.videoName"
                @change="handleFileChange"
                ref="uploadRef"
                :auto-upload="false"
                type="file"
                accept="video/*"
            >
              <div>
                <div class="bold-text">Select MP4 file</div>
                <div class="break-line" />
                <el-button type="primary" style="width: 150px">Select File</el-button>
              </div>
            </el-upload>
            <div class="break-line" />
            <div>
              <el-card>
                <div class="bold-text">QRcode Scan URL</div>
                <div class="break-line" />
                <el-input
                    v-model="store.selectedOption.qrUrl"
                    placeholder="Enter Scan URL"
                    style="width: 500px"
                    @change="updateSelectedQrCodeUrlValue"
                ></el-input>
                <el-alert
                    v-if="isError"
                    title="Please enter a URL."
                    type="error"
                    :closable="true"
                ></el-alert>
              </el-card>
            </div>
          </div>
          <div class="break-line" />
          <h2 class="custom-heading">Specify QRcode Visibility</h2>
          <div class="break-line" />
          <el-tabs type="border-card">
            <el-tab-pane label="Size">
              <label class="bold-text">QRcode Size</label>
              <div class="break-line" />
              <el-radio-group v-model="store.selectedOption.size" @change="updateSelectedQrCodeSize">
                <el-radio-button :label="['1920x1080', '1080x1920'].includes(store.selectedOption.videoDimension) ? '200' : '133'">Small</el-radio-button>
                <el-radio-button :label="['1920x1080', '1080x1920'].includes(store.selectedOption.videoDimension) ? '260' : '173'">Medium</el-radio-button>
                <el-radio-button :label="['1920x1080', '1080x1920'].includes(store.selectedOption.videoDimension) ? '320' : '213'">Large</el-radio-button>
              </el-radio-group>
              <div class="break-line" />
            </el-tab-pane>
            <el-alert
                v-if="isSizeSelected"
                title="Please select QRcode size."
                type="error"
                :closable="true"
            ></el-alert>
            <el-tab-pane label="Colors">
              <div class="color-picker-row">
              <div class="color-picker-label">
                <label>QR background</label>
              </div>
              <div class="color-picker-input">
                <el-color-picker
                    v-model="store.selectedOption.backgroundColor"
                    @change="updateSelectedBackGroundValue"
                />
                </div>
              </div>
              <div class="color-picker-row">
                <div class="color-picker-label">
                  <label>QR patterns</label>
                </div>
                <div class="color-picker-input">
                  <el-color-picker
                      v-model="store.selectedOption.colorDark"
                      @change="updateSelectedQrPatternsColorValue"
                  />
                </div>
              </div>
              <div class="color-picker-row">
                <div class="color-picker-label">
                  <label>QR outer eyes</label>
                </div>
                <div class="color-picker-input">
                  <el-color-picker
                      v-model="store.selectedOption.eye_color01"
                      @change="updateSelectedQrEyesColorValue"
                  />
                </div>
              </div>
              <div class="color-picker-row">
                <div class="color-picker-label">
                  <label>QR inner eyes</label>
                </div>
                <div class="color-picker-input">
                  <el-color-picker
                      v-model="store.selectedOption.eye_color02"
                      @change="updateSelectedQrInnerEyesColorValue"
                  />
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="QRcode Preview">
              <img :src="imageUrl" />
            </el-tab-pane>
            <el-tab-pane label="QRcode-Id">
              <label class="bold-text">Select qrId to edit QRcode</label>
              <div class="break-line" />
              <el-select v-model="selectedQrId" placeholder="Select QR ID">
                <el-option
                    v-for="id in qrIdValues"
                    :key="id"
                    :label="id"
                    :value="id"
                />
              </el-select>
            </el-tab-pane>
          </el-tabs>
          <div class="break-line" />
          <label class="bold-text">Call to action</label>
          <div class="break-line" />
          <el-input
              v-model="store.selectedOption.frameText"
              @change="updateSelectedCallToActionValue"
              placeholder="Ex. Scan to Shop"
              :maxlength="15"
              style="width: 200px"
          />
          <div class="break-line" />
          <el-button type="primary" @click="generateQRCode" style="width: 150px">Generate QR Code</el-button>
          <el-button type="primary" @click="editCampaign" style="width: 150px">Edit Qr Code</el-button>
          <el-button class="delete-qr" type="primary" @click="deleteCampaign" style="float: right;width: 150px">Delete Qr Code</el-button>
          <div class="break-line" />
        </el-card>
        <div class="break-line" />
        <label class="bold-text">QRcode position</label>
        <div class="break-line" />
        <el-select
            v-model="store.selectedOption.qrPosition"
            @change="updateSelectedQrCodePositionValue"
            class="m-2"
            placeholder="Select"
        >
          <el-option
              v-for="item in qrPosition.qrPosition.items"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
        <el-alert
            v-if="isSelected"
            title="Please select QRcode position."
            type="error"
            :closable="true"
        ></el-alert>
        <el-button type="primary" @click="changeImagePosition" style="width: 200px">Preview QRcode on video</el-button>
        <div class="break-line" />
        <el-button type="primary" @click="saveProperties" style="width: 100px; float: right">Save</el-button>
      </div>
    </div>
      <div class="break-line" />
  </el-card>
  <div class="break-line" />
  <el-card>
  <div class="video-container">
    <video
        ref="videoPlayer"
        controls
        @loadedmetadata="initializeCanvasSize"
    ></video>
    <canvas ref="canvasElement" class="canvas-overlay"></canvas>
  </div>
  </el-card>
</template>

        <style scoped lang="scss">
        @import "../assets/styles/main.scss";
        .card-header {
          //display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .box-card {
          width: 60%;
          margin: auto;
        }
        .projectId-container {
          flex: 2;
        }
        .input-container {
          flex: 1;
          margin-right: 20px;
          .bold-text {
            font-family: $secondary_font_family_bold;
            color: $primary_text_color;
          }
        }
        .report-container {
          //background: url("../assets/images/Background_2.png") no-repeat;
          object-fit: contain;
          width: 100%;
          height: calc(100vh - 59px);
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .form-container {
          justify-content: center;
          display: flex;
          align-items: center;
          max-width: 100%;
          flex-wrap: wrap;
        }
        .break-line {
          flex-basis: 100%;
          height: 10px;
        }
        .custom-heading {
          color: #4260a4;
          border-bottom: 2px solid #ad5050;
          padding-bottom: 5px;
        }
        .canvas-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          height: auto;
          pointer-events: none;
          background-color: transparent;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: auto;
          video {
            width: 100%;
            height: 100%;
          }
        }
        .demo-tabs > .el-tabs__content {
          padding: 32px;
          color: #6b778c;
          font-size: 32px;
          font-weight: 600;
        }

        .el-alert {
          margin: 20px 0 0;
        }
        .el-alert:first-child {
          margin: 0;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
        .color-picker-row {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .color-picker-label {
          flex: 1;
        }

        .color-picker-input {
          flex: 2;
        }
        .centered-heading {
          text-align: center;
          margin-top: 20px;
        }
        .delete-qr {
          background-color: #ad5050;
        }


        </style>
