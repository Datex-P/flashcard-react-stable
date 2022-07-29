import {  useContext } from 'react';
import '../../../styles.scss';
import '../login.css';
import { Context } from '../../../context/Context';


export const RegisterLogic = ({passwordRef, userNameRef, history}) => {

  const {apiURL} = useContext(Context)

  async function registerUser(e) {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current && emailRef.current) {
    //e preventDefault is needed because forms
    //have a standard behaviour of redirecting
    let name = userNameRef.current.value;
    let password = passwordRef.current.value;
    let email = emailRef.current.value;

    const response = await fetch(`${apiURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        name:name,
        password:password,
        email:email
      })
    });
    const data = await response

    if (data.status === 200) {
      history.push('/checkemail');
    } 
    if (data.status === 400) {
      alert('Something went wrong')
    }
    console.log(data,'data here');
  }
}

  return {
    registerUser
  }
}