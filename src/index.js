import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'
import ContextProvider from './Context';
//import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  // <BrowserRouter>
    <ContextProvider>
      
          <App/>
      
    </ContextProvider>
  // </BrowserRouter>
  ,
  document.getElementById('root')
);



