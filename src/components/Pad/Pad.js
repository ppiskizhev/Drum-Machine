import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 80px;
  height: 60px;
  margin: 5px;
  border-radius: 3px;
  border-style: none;
  outline: none;
  background-color: ${props => props.activated ? 'orange' : '#80827e'};
  box-shadow: ${props => props.activated ? 'none' : '2px 2px 5px #000000'};
`;

export class Pad extends Component {
  state = {
    activated: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code == this.props.code) {
      this.playSound();
    }
  } 

  activatePad = () => {
    let timerId;
    if (!this.state.activated) {
      this.setState({ activated: true });
      timerId = setTimeout(() => this.setState({ activated: false }), 100);
    } 
  }

  playSound = () => {
    const isPowered = this.props.isPowered;
    if (!isPowered) return;
    let sound = document.getElementById(this.props.keyTrigger);
    sound.volume = this.props.volume;
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    this.props.updateDisplay(this.props.id);
  }

  render() {
    return(
      <Button activated={this.state.activated} key={this.props.keyTrigger} className="drumPad" id={this.props.id} code={this.props.code} onClick={this.playSound}>
        {this.props.keyTrigger}
        <audio src={this.props.url} id={this.props.keyTrigger}></audio>
      </Button>
    );
  }
}