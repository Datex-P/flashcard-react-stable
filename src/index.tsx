import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles.scss'
import ContextProvider from './Context';
//import { BrowserRouter } from 'react-router-dom'
import Amplify from 'aws-amplify';
import config from './aws-exports.js'

Amplify.configure(config)

ReactDOM.render(
  // <BrowserRouter>
    <ContextProvider>
      
          <App/>
      
    </ContextProvider>
  // </BrowserRouter>
  ,
  document.getElementById('root')
);



