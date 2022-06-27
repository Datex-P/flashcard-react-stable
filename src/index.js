import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles.scss'
import ContextProvider from './Context';
import { HashRouter } from "react-router-dom";


ReactDOM.render(
   <HashRouter>
    <ContextProvider>     
          <App/>
    </ContextProvider>
   </HashRouter>
  ,
  document.getElementById('root')
);



