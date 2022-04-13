import React, { useContext } from "react";
import { Context } from "../Context";

export default function Button ({login=false}) {
  
  const {setRegister, setLogin} = useContext(Context);
  
  return (
    <button
      className='login__button'
      onClick={() => {
            login? setRegister(true):
            setLogin(true)
            }}
    >
         {login? 'Login': 'Sign Up'}
    </button>
  )
}