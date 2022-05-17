import usersSolid from "../../icons/users.svg";
import React, { forwardRef } from "react";


const UserName = forwardRef((props, userNameRef) => {

  return (
    <div className='width200px'>
      <img
        src={usersSolid}
        alt='click to enter user name'
        className='width16px height16px login__img-login-password'
        style={{ transform: 'translate(10px, 28px)' }}
      />
      <input
        id='user-name'
        type='text'
        placeholder='Choose a user-name'
        className='login__input'
        ref={userNameRef}
        required
        pattern='[a-zA-Z0-9]+'
        title='Only a-z 0-9 allowed'
      />
    </div>
  )
})

export default UserName