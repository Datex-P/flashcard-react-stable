import React, {  useState, forwardRef } from 'react';
const eyesClosed: string =  require('../../icons/eye-closed-pwd.png');
const eyesOpened: string =  require('../../icons/eye-opened-pwd.svg');

const  Password = forwardRef<HTMLInputElement>((_, passwordRef) => {
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