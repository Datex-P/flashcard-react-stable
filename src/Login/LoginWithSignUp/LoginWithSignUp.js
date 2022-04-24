import Facebook from "./Facebook";
import Google from "./Google";

function LoginWithSignUp({ setUser }) {

  if(document.getElementsByClassName('posRelative flex-column justify-between height120px')) {
    let elem = document.getElementsByClassName('posRelative flex-column justify-between height120px')
    console.log(elem, 'elem 2 here')
//    let k = elem[2]
   // k.style.height = '39px'
  //  console.log(elem[2], 'elem here')
    console.log(elem.childNodes, 'elem here')
  }

  return (
    <>
      <div className='height120px login__field-distance flex-column justify-between align-center'>
        <div className='mb-10px justify-start width100pc'>Or login with:</div>
         <div className='posRelative flex-column justify-between height120px'>
          <Facebook setUser={setUser} />
           <Google /> 
        </div>
      </div>
      <span className='mt-10px'>
        Not a member?
         <a
           href='/register'
           className='posRelative login__text-dec-none login__col-navajowhite ml-10px'
         >
           Sign up
         </a> 
       </span>
       <a
           href='/forgotPassword'
           className='posRelative login__text-dec-none login__col-navajowhite mt-10px mr-18px'
         >
           Forgot your password?
         </a>  
    </>
  );
}

export default LoginWithSignUp;
