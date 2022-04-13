import React from 'react'

export default function LoginInput ({src, signUp=false, pwdContainer=false}) {

  return (
    <div className={`${pwdContainer? 
    'login__field-distance d-flex login__LoginInput': 
    'd-flex login__LoginInput'}`}>
    <img 
      src={src} 
      alt='click to enter user name' 
      className='login__img-login-password'
          
    />
    <input 
      value='xyz'
  //    value={this.state.login} 
      // onChange={e=>this.setState({login:e.target.value})} 
      className='login__input'
    />
</div>

  )
}