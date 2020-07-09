import React from 'react';
import Button from 'react-bootstrap/Button';
import {Howl, Howler} from 'howler';

export default class Display extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            etDevice: "",
            play: false
        };
    }
    audio = new Howl({
        src: ['5khz.mp3']
    })

    toggleAudio = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
            });
    }
    

    handleClick(){
        console.log('Requesting any Bluetooth Device...');
        let options = {
            acceptAllDevices: true
        };
        return navigator.bluetooth.requestDevice(options)
            .then(device => {
                this.setState({etDevice: device});
            })
            .then(_ => this.state.etDevice.gatt.connect());
    }

    render() {
        return (
            <div>
                <Button variant="primary"
                onClick={() => this.handleClick()}
            >
                Connect
            </Button>
            <Button variant="primary"
                onClick={this.toggleAudio}
            >
                {this.state.play ? 'Pause' : 'Play'}
            </Button>
            </div>

          
        );
    }
}