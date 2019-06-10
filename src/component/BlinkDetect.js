import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import CanvasFilters from 'utils/CanvasFilters';
import 'sass/BlinkDetect.sass';

export default class BlinkDetect extends Component {
    videoEl = null;
    eyeCanvasEl = null;
    filterCanvasEl = null;
    userMediaConstraints = {
        audio: false,
        video: {
            frameRate: {
                min: 15,
                ideal: 30,
                max: 60,
            },
            facingMode: 'user',
        },
    };
    TinyFaceDetectorOptions = null;

    frameReq = null;
    lastTime = null;
    eyeRect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
    };
    curData = null;
    oldData = null;

    async componentDidMount() {
        await navigator.mediaDevices
            .getUserMedia(this.userMediaConstraints)
            .then(stream => {
                this.videoEl.srcObject = stream;
            });
        await faceapi.loadTinyFaceDetectorModel('/models');
        await faceapi.loadFaceLandmarkModel('/models');

        this.TinyFaceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
            inputSize: 160,
            scoreThreshold: 0.5,
        });
        this.lastTime = Date.now();

        if (this.videoEl.srcObject) {
            await this.detectionLoop();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameReq);
    }

    detectionLoop = async () => {
        this.frameReq = requestAnimationFrame(this.detectionLoop);
        if (Date.now() - this.lastTime < 1000 / 10) {
            // 10fps
            return;
        }
        this.lastTime = Date.now();

        const faceDetectionTask = faceapi.detectSingleFace(
            this.videoEl,
            this.TinyFaceDetectorOptions
        );
        const detectionWithLandmarks = await faceDetectionTask.withFaceLandmarks();

        if (detectionWithLandmarks) {
            this.drawTwoEye(detectionWithLandmarks);
        }
    };

    drawTwoEye = detectionWithLandmarks => {
        let eyeData = null;

        eyeData = detectionWithLandmarks.landmarks.getRightEye();
        this.eyeRect.x = eyeData[3].x;
        this.eyeRect.y = (eyeData[1].y + eyeData[2].y) / 2;
        this.eyeRect.w = Math.abs(eyeData[0].x - eyeData[3].x);
        this.eyeRect.h = Math.abs(
            (eyeData[4].y + eyeData[5].y) / 2 -
                (eyeData[1].y + eyeData[2].y) / 2
        );
        this.eyeCanvasEl
            .getContext('2d')
            .drawImage(
                this.videoEl,
                this.eyeRect.x,
                this.eyeRect.y,
                -this.eyeRect.w,
                this.eyeRect.h,
                0,
                0,
                40,
                60
            );

        eyeData = detectionWithLandmarks.landmarks.getLeftEye();
        this.eyeRect.x = eyeData[3].x;
        this.eyeRect.y = (eyeData[1].y + eyeData[2].y) / 2;
        this.eyeRect.w = Math.abs(eyeData[0].x - eyeData[3].x);
        this.eyeRect.h = Math.abs(
            (eyeData[4].y + eyeData[5].y) / 2 -
                (eyeData[1].y + eyeData[2].y) / 2
        );
        this.eyeCanvasEl
            .getContext('2d')
            .drawImage(
                this.videoEl,
                this.eyeRect.x,
                this.eyeRect.y,
                -this.eyeRect.w,
                this.eyeRect.h,
                40,
                0,
                40,
                60
            );

        const data = this.eyeCanvasEl
            .getContext('2d')
            .getImageData(0, 0, 80, 60);
        const brightness = CanvasFilters.getBrightness(data);
        const dynamicContrast = brightness > 75 ? 3.5 : 2.3; // dark is 2
        const grayscale = CanvasFilters.grayscale(data, dynamicContrast, 0.5);
        const { pixels: threshold } = CanvasFilters.threshold(grayscale, 80);
        this.filterCanvasEl.getContext('2d').putImageData(threshold, 0, 0);

        this.correlation();
    };

    correlation = () => {
        if (this.curData) {
            this.oldData = this.curData;
        }
        this.curData = this.filterCanvasEl
            .getContext('2d')
            .getImageData(0, 0, 80, 60);

        let count = 0;
        const total = this.curData.data.length;
        for (let i = 0; i < total; i += 4) {
            if (this.oldData && this.curData.data[i] !== this.oldData.data[i]) {
                count++;
            }
        }

        const currentCorrelation = count / 4800;
        if (currentCorrelation > 0.38) {
            this.props.birdFly();
        }
    };

    render() {
        return (
            <div id="blink-detect">
                <video
                    id="input-video"
                    ref={ref => (this.videoEl = ref)}
                    autoPlay
                    muted
                    playsInline
                />
                <div className="parse">
                    <canvas
                        ref={ref => (this.eyeCanvasEl = ref)}
                        width="80"
                        height="60"
                    />
                    <canvas
                        ref={ref => (this.filterCanvasEl = ref)}
                        width="80"
                        height="60"
                    />
                </div>
            </div>
        );
    }
}
