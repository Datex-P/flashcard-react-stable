import React from "react";

export default function Button ({text, emailAdress, verify=false}) {

  return (
    <button
      className={`justify-center-align-center ${verify? 'login__verify__button': 'login__button'}`}
      type='submit'
    >
      {verify?
       <a 
        href={`https://${emailAdress}`} 
        target='_blank'
        rel="noreferrer"
        style={{color:'seashell', position: 'relative', zIndex: '999'}}>
             {text}
        </a>
        :
        `${text}`
      } 
    </button>
  )
}