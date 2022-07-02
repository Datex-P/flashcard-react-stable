import Button from '../Button'
import {forwardRef} from 'react'
import React, { useContext } from 'react';
import { Context } from '../../Context';


const ButtonContainer = forwardRef((props, okRef) =>{

  
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