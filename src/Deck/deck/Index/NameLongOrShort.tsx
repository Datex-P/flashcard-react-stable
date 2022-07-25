import React, {  useContext } from "react";
import { Context } from '../../../Context';

export default function NameLongOrShort({nameTooLongOrShort}) {
  const {nameOfTopDeck} = useContext(Context)
  
  return (
    <>
      {
        nameTooLongOrShort &&
          <div className='deck__tooLongOrShort posAbsolute'>
            {
              `${nameOfTopDeck.length>11? 'Too long' 
                  : 
            nameOfTopDeck.length<4? 'Too short': ''}`
            }
          </div>
       }  
    </>
  )
}
