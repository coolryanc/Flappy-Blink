import React, { PureComponent } from 'react';
import 'sass/BlinkDetect.sass';

export default class BlinkDetect extends PureComponent {
    videoEl = null;
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

    async componentDidMount() {
        await navigator.mediaDevices
            .getUserMedia(this.userMediaConstraints)
            .then(stream => {
                this.videoEl.srcObject = stream;
            });
    }

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
            </div>
        );
    }
}
