import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles.scss'
import ContextProvider from './Context';
//import { BrowserRouter } from 'react-router-dom'
import Amplify, {API} from 'aws-amplify';
import config from './aws-exports.js'

Amplify.configure(config)

Amplify.configure({
  // OPTIONAL - if your API requires authentication 
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:9339b991-ea66-4303-928b-e8d190a8073e',
      // REQUIRED - Amazon Cognito Region
      region: 'US_EAST_1', 
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'XX-XXXX-X_abcd1234', 
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
  },
  API: {
      endpoints: [
          {
              name: "Flashcard",
              endpoint: "https://1234567890-abcdefgh.amazonaws.com"
          },
          {
              name: "MyCustomCloudFrontApi",
              endpoint: "https://api.my-custom-cloudfront-domain.com",

          }
      ]
  }
});


ReactDOM.render(
  // <BrowserRouter>
    <ContextProvider>
      
          <App/>
      
    </ContextProvider>
  // </BrowserRouter>
  ,
  document.getElementById('root')
);



