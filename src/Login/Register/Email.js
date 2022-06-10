import email from "../../icons/email.svg";
import {forwardRef, useEffect, useContext} from 'react'
import { Context } from '../../Context';

//test

const Email = forwardRef((props, emailRef) => {

  const {emailAdress, setEmailAdress} = useContext(Context)
  
  useEffect(()=>{
    console.log(emailAdress, 'email adress here')
  },[emailAdress, setEmailAdress])


  function emailHandler(e) {
    let email = e.target.value
    let position = email.indexOf('@')
    if (position !==-1) {
      let webadress = `www.${email.slice(position+1)}`
      setEmailAdress(webadress)
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