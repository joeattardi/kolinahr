import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'file?name=logo.png!./images/logo.png';
import './scss/index.scss';

ReactDOM.render(<App />, document.getElementById('app'));

