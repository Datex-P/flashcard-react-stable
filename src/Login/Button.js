import React, { useContext } from "react";
import { Context } from "../Context";
import { useHistory } from "react-router-dom";


export default function Button ({login=false}) {
  
  let history = useHistory();
  const {setRegister, setLogin} = useContext(Context);
  
  return (
    <button
      className='login__button justify-center-align-center'
      onClick={() => {
           // login? setRegister(true):
           // history.push("/register");
            //setLogin(true)
            
      }}
      type='submit'
    >
        Login
    </button>
  )
}