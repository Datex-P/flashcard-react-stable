import email from "../../icons/email.svg";

function Email() {
  return (
    <div className='width200px mt-15px'>
      <img
        src={email}
        alt='enter email address'
        className='width16px height16px login__img-login-password login__email-transform'
      />
      <input
        placeholder='Your email'
        type='text'
        id='emailinput'
        className='login__input'
        required
        pattern='[a-zA-Z0-9]'
        title='Only a-z 0-9 allowed'
      />
    </div>
  )
}

export default Email