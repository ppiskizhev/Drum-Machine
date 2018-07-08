import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DrumMachine } from './components/DrumMachine/DrumMachine';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
registerServiceWorker();
