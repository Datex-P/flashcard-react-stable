import Facebook from "./Facebook";
import Google from "./Google";

function LoginWithSignUp({ setUser }) {
  return (
    <>
      <div className='height120px login__field-distance flex-column justify-between align-center'>
        <div className='mb-10px'>Or login with:</div>
        <div className='flex-column justify-between height120px'>
          <Facebook setUser={setUser} />
          <Google />
        </div>
      </div>
      <span className='mt-10px'>
        Not a member?
        <a
          href='/register'
          className='login__text-dec-none login__col-navajowhite ml-10px'
        >
          Sign up now
        </a>
      </span>
    </>
  );
}

export default LoginWithSignUp;
