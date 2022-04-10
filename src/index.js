import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './Context';

// ReactDOM.render(

//   <ContextProvider>
     
//         <App/>
    
//   </ContextProvider>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><App/></ContextProvider>)




