import React from 'react'

export default function LoginInput ({src}) {

  return (
    <div className='d-flex'>
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