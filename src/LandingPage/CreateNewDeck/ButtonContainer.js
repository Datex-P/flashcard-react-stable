import Button from '../Button'
import {forwardRef} from 'react'

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