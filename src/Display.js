import React from 'react';
import Button from 'react-bootstrap/Button';
import {Howl, Howler} from 'howler';
import AudioPlayer from 'react-h5-audio-player';
import './Display.css'

export default class Display extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            etDevice: "",
            play: false
        };
    }
    audio = new Howl({
        src: ['audio50ms.wav']
    })

    chirp = () => {
        this.audio.play()
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
                <h1 className='Display'>Welcome</h1>
            <div className='Display-header'>
                <h2>Audio</h2>
                <p>This is a 50ms sample of audio at 22kHz</p>
            <Button variant="primary"
                    onClick={this.chirp}
                >
                Chirp
                </Button>
            </div>
            <div className='Display-header'>
                <h2>Bluetooth</h2>
                <p>Click to connect your bluetooth device to the browser</p>
                <Button variant="primary"
                    onClick={() => this.handleClick()}
                >
                Connect
                </Button>
                </div>
            </div>

          
        );
    }
}