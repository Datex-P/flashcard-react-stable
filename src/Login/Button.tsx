import React from "react";
import { useHistory } from "react-router-dom";

export default function Button ({text, login=false, verify=false}) {
  
  let history = useHistory();
  

  return (
    <button
      className={`${verify? 'login__verify__button': 'login__button'} justify-center-align-center`}
      // onClick={
      // //   () => {
      // //      // login? setRegister(true):
      // //      // history.push("/register");
      // //       //setLogin(true)
            
      // // }
      // }
      type='submit'
    >
        {text}
    </button>
  )
}