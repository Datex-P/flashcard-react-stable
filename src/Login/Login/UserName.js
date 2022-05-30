import React, {forwardRef} from "react";

const UserName = forwardRef((props, userNameRef) => {

  // const loginRef = useRef(null)



  return (
    <div className= "login__LoginInput flex-column mb-20px">
    <div>
      <input
        id='login'
        type='text'
        placeholder='name'
        ref={userNameRef}
        name='login'
        className='login__input login__icon__user pl-25px'
        required
        pattern='[a-zA-Z0-9]+'
        title= 'Only a-z 0-9 allowed'
      />
    </div>
  </div>
  )
})

export default UserName