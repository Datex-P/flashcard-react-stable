import React, {forwardRef} from 'react';
import Button from '../Button'


interface Props{
  addDeckHandler:()=>void;
  closeHandler:()=>void;
  setInputField:(e:string)=>void;
 // setArrowDown, 
  setHideCreateDeckBtn:(e:boolean)=>void;
  setNameTooShortOrLong:(e:boolean)=>void;
  setScrollbarVisible:(e:boolean)=>void;
ok?:boolean
}


const ButtonContainer = forwardRef<HTMLButtonElement, Props>((props, okRef) =>{

  
  return (
    <div className='width57pc marginAuto posRelative justify-between'>
           <Button 
              ref={okRef}
              {...props}
            />
            <Button 
              ref={okRef}
              ok
              {...props}
             /> 
          </div>
  )
})

export default ButtonContainer