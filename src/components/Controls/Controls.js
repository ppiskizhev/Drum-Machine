import React, { Component } from 'react';
import styled from 'styled-components';

const StyledControls = styled.div`
  display: flex;
  width: auto;
  height: 40%;
  margin: auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  
  @media (min-width: 600px) {
    width: 42%;
    height: auto;
    margin: 0;

  }
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
  id: 'power'
})`
  display: none;

  &:checked + label > span::before {
    left: 19px;
  }
`;

const Label = styled.label`
  display: block;
  position: relative;
  padding-bottom: 17px;
  box-sizing: border-box;
`;

const ControlToggler = styled.span`
  position: absolute;
  display: block;
  width: 38px;
  height: 16px;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);  
  background-color: black;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 17px;
    height: 12px;
    top: 2px;
    left: 2px;
    background-color: orange;
  }
`;

const ControlsDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  background-color: #80827e;
  box-sizing: border-box; 
`;

const ControlsVolume = styled.div`
  width: 180px;
`;

const ControlsVolumeInput = styled.input.attrs({
  type: 'range',
  min: '0',
  max: '1',
  step: '0.01'
})`
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 5px; /* Specified height */
  background: #000000; /* Grey background */
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 8px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: orange; /* Green background */
    cursor: pointer; 
  }

  &::-moz-range-thumb {
    width: 8px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: orange; /* Green background */
    cursor: pointer; 
  }
`;

export class Controls extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code == 'KeyB' && this.props.isPowered) {
      this.props.onBankChange();
    }
  }

  render() {
    return (
      <StyledControls>
        <div className="controls__power">
          <Checkbox onChange={this.props.onPowerChange} /> 
          <Label htmlFor="power">
            Power
            <ControlToggler></ControlToggler>
          </Label>
        </div>
        <ControlsDisplay>
          <span className="controls__display-inner">
            {this.props.isPowered ? this.props.display : ''}
          </span>
        </ControlsDisplay>
        <ControlsVolume>
          <ControlsVolumeInput 
            onChange={this.props.onVolumeChange} 
            value={this.props.volume} 
            disabled={!this.props.isPowered} 
          />
        </ControlsVolume>
        <div className="controls__bank">
          <Checkbox 
            onChange={this.props.onBankChange} 
            checked={this.props.isBankChecked} 
            disabled={!this.props.isPowered} 
          /> 
          <Label htmlFor="bank">
            Bank (B)
            <ControlToggler></ControlToggler>
          </Label>
        </div>
      </StyledControls>
    );
  }
}