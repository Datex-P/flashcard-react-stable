import Facebook from "./Facebook";
import Google from "./Google";
import { useHistory } from 'react-router-dom'

function LoginWithSignUp() {
  const history = useHistory()

  return (
    <>
      <div className='height110px login__field-distance flex-column justify-between align-center'>
        <div className='mb-10px justify-start width100pc login__reset-col'>
          Or login with:
        </div>
        <div className='posRelative flex-column justify-between height120px'>
          <Facebook />
          <Google />
        </div>
      </div>
      <span className='mt-10px col-darkslategrey'>
        Not a member?
        <div
          onClick={()=>{history.push('/register')}}
          className='posRelative cursorPointer login__text-dec-none login__col-navajowhite ml-10px'
        >
          Sign up!
        </div>
      </span>
      <div
        onClick={()=>{history.push('/forgotPassword')}}
        className='posRelative cursorPointer login__text-dec-none login__col-navajowhite mt-10px mr-18px'
      >
        Forgot your password?
      </div>
    </>
  );
}

export default LoginWithSignUp;
