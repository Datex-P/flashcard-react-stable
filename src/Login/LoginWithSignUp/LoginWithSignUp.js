import Facebook from "./Facebook";
import Google from "./Google";

function LoginWithSignUp() {

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
        <a
          href='/register'
          className='posRelative login__text-dec-none login__col-navajowhite ml-10px'
        >
          Sign up!
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
