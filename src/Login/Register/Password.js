import React, {  useState, forwardRef } from 'react';
import eyesClosed from '../../icons/eye-closed-pwd.png'
import eyesOpened from '../../icons/eye-opened-pwd.svg'

const  Password = forwardRef((props, passwordRef) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='width200px mt-15px'>
      <img
        src={showPassword? eyesOpened : eyesClosed}
        id='register-password'
        alt='click to enter user name'
        className='width16px height16px login__img-login-password cursorPointer'
        style={{transform:'translate(180px, 28px)'}}
        onClick={()=>setShowPassword(!showPassword)}
      />
     <input
        id='register-password-inp'
        placeholder='Choose a password'
        type={showPassword? 'text':'password'}
        ref={passwordRef}
        className='login__input login__icon__keys'
        required
        pattern='[a-zA-Z0-9]+'
        title= 'Only a-z 0-9 allowed'          
      />
    </div>
  )
})

export default Password