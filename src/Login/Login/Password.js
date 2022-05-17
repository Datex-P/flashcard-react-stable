import React, {useState, useRef, forwardRef} from "react";
import eyesClosed from '../../icons/eye-closed-pwd.png'
import eyesOpened from '../../icons/eye-opened-pwd.svg'

const Password = forwardRef((props, passwordRef) => {

  const [showPassword, setShowPassword] = useState(false)
  // const passwordRef = useRef(null)

  return (
  <div className= "login__LoginInput flex-column">
  <div>
    <input
      id='password'
      ref={passwordRef}
      name='password'
      placeholder='password'
      type={showPassword? 'text':'password'}
      required
      pattern='[a-zA-Z0-9]+'
      title= 'Only a-z 0-9 allowed'
      className='login__input login__icon__keys pl-30px login__eyeopen'
    />
    <img 
      src={showPassword? eyesOpened : eyesClosed} 
      alt='eyesClosed' 
      className='width16px height16px cursorPointer' 
      style={{transform:'translate(170px, -26px)'}} 
      onClick={()=>setShowPassword(!showPassword)}
    />
  </div>
</div> 
)
});

export default Password