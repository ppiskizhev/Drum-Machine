import React, { Component } from 'react';
import { Pad } from '../Pad/Pad';
import styled from 'styled-components';

const StyledPadsDisplay = styled.div`
  display: flex;
  width: auto;
  max-width: 270px;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  order: 2;
  box-sizing: border-box;
  
  @media (min-width: 600px) {
    width: 58%;
    margin: 0;
    order: 0;
  }
`;

export class PadsDisplay extends Component {
  render() {
    const padsBank = this.props.padsBank;
    const drumPads = padsBank.map((pad) => (
      <Pad 
        keyTrigger={pad.keyTrigger} 
        id={pad.id} 
        code={pad.code} 
        url={pad.url} 
        isPowered={this.props.isPowered}
        volume={this.props.volume}
        updateDisplay={this.props.updateDisplay}
      />
    ));

    return (
      <StyledPadsDisplay>
        {drumPads}
      </StyledPadsDisplay>
    );
  }
}