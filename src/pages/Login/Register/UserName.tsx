import React, { forwardRef } from "react";
import usersSolid from '../../../icons/users.svg';


const UserName = forwardRef<HTMLInputElement>((_, userNameRef) => {

  return (
    <div className='width200px'>
      <img
        src={usersSolid}
        alt='click to enter user name'
        className='width16px height16px mr-9px'
        style={{transform: 'translate(10px, 28px)'}}
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