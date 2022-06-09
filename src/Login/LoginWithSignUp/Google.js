import {useEffect} from 'react'
// https://developers.google.com/identity/sign-in/web
// documentation google for login

function Google () {
  // useEffect(()=>{
  //   setTimeout(()=>{
  //   let element = document.querySelector('.abcRioButton')
  //   let wrapper = document.querySelector('.abcRioButtonContentWrapper')
  //   console.log(element, 'element here')

  //   if(element) {
  //     element.style.height = '39px'
  //     element.style.width = '159px'
  //     element.style.borderRadius = '5px'
  //     wrapper.style.display = 'flex'
  //     wrapper.style.alignItems = 'center'
  //     wrapper.style.paddingLeft = '20px'
  //   }
  // },3000)
  // },[])

  return (
     <div 
      className='g-signin2 width150px height30px' 
      dataOnsuccess='onSignIn'>
     </div>     
  )
}

export default Google