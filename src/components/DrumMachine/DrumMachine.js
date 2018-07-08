import React, { Component } from 'react';
import { PadsDisplay } from '../PadsDisplay/PadsDisplay';
import { Controls } from '../Controls/Controls';
import styled, { injectGlobal } from 'styled-components';
import { bankOne, bankTwo } from '../../banks';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: 'Russo One', 'Arial', sans-serif;
    background-color: #000000;
  }
`;

const StyledDrumMachine = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid orange;
  background-color: darkgrey;
  box-sizing: border-box;
  
  @media (min-width: 600px) {
    width: 520px;
    height: auto;
    align-items: stretch;
    flex-direction: row;
    
  }
`;

export class DrumMachine extends Component {
  state = {
    isPowered: true,
    currentBank: bankOne,
    currentBankName: 'Heater Kit',
    isBankChecked: false,
    volume: 0.5,
    display: ''
  }

  handlePowerChange = () => {
    this.setState({
      isPowered: !this.state.isPowered,
      display: ''
    })
  }
  
  handleBankChange = () => {
    const newBank = this.state.currentBank == bankOne ? bankTwo : bankOne;
    const bankName = newBank == bankOne ? 'Heater Kit' : 'Smooth Piano Kit';
    this.setState({
      currentBank: newBank,
      currentBankName: bankName,
      isBankChecked: !this.state.isBankChecked,
      display: bankName
    })
  }

  handleVolumeChange = (e) => {
    const volume = +e.target.value;
    const display = `Volume: ${Math.round(volume * 100)}`;
    this.setState({
      volume: volume,
      display: display
    })
    setTimeout(() => {
      this.setState({
        display: ''
      })
    }, 700);
  }

  updateDisplay = (info) => {
    this.setState({
      display: info
    })
  }

  render() {
    return (
      <StyledDrumMachine>
        <PadsDisplay 
          padsBank={this.state.currentBank} 
          isPowered={this.state.isPowered} 
          volume={this.state.volume}
          updateDisplay={this.updateDisplay}
        />
        <Controls 
          onPowerChange={this.handlePowerChange} 
          onBankChange={this.handleBankChange} 
          isBankChecked={this.state.isBankChecked} 
          onVolumeChange={this.handleVolumeChange}
          volume={this.state.volume}
          display={this.state.display}
          isPowered={this.state.isPowered}
        />
      </StyledDrumMachine>
    );
  }
}