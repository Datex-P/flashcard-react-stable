import React, {forwardRef, useEffect, useContext} from 'react'
import { Context } from '../../Context';
const email: string =  require('../../icons/email.svg');

const Email = forwardRef<HTMLInputElement>((_, emailRef) => {
  // https://www.carlrippon.com/react-forwardref-typescript/

  const {emailAddress, setEmailAddress} = useContext(Context)
  
  useEffect(()=>{
    console.log(emailAddress, 'email adress here')
  },[emailAddress, setEmailAddress])


  function emailHandler(e) {
    let email = e.target.value
    let position = email.indexOf('@')
    if (position !==-1) {
      let webadress = `www.${email.slice(position+1)}`
      setEmailAddress(webadress)
    }
  }

  return (
    <div className='width200px mt-15px'>
      <img
        src={email}
        alt='enter email address'
        className='width16px height16px mr-9px login__email-transform'
      />
      <input
        placeholder='Your email'
        type='email'
        id='emailinput'
        className='login__input'
        required
        ref={emailRef}
        onChange={emailHandler}
      //  pattern='[a-zA-Z0-9]+'
        title='Only a-z 0-9 allowed'
      />
    </div>
  )
})

export default Email