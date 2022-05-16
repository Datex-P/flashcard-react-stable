import React, {useRef} from "react";

function UserName () {

  const loginRef = useRef(null)

  return (
    <div className= "login__LoginInput flex-column mb-20px">
    <div>
      <input
        id='login'
        placeholder='name'
        ref={loginRef}
        name='login'
        className='login__input login__icon__user pl-25px'
        required
        pattern='[a-zA-Z0-9]'
        title= 'Only a-z 0-9 allowed'
      />
    </div>
  </div>
  )
}

export default UserName