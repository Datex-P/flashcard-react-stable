import { React, useRef, useState, useContext } from "react";
import "../styles.scss";
import "./login.css";
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import Email from "./Register/Email";
import FlashcardLogo from "./FlashcardLogo";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { Context } from '../Context';

function NewPassword() {

  const {apiURL} = useContext(Context)
  
  const emailRef = useRef(null);
  const [pwdLinkActive, setPwdLinkActive] = useState(null);
  const [emailNotInDB, setEmailNotInDB] = useState(false);
  const history = useHistory();

  async function pwdReset(e) {
    e.preventDefault();
    try {
      //e preventDefault is needed because forms
      //have a standard behaviour of redirecting
      let email = emailRef.current.value;
      const response = await fetch(`${apiURL}/password_reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();

      if (data.status === "email exists") {
        console.log("email exists in database");
        setPwdLinkActive(true);
        setTimeout(() => {
          setPwdLinkActive(false);
        }, 4000);
      } else {
        console.log("email does not exist in database");
        setEmailNotInDB(true);
        setTimeout(() => {
          setEmailNotInDB(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err, "err here");
    }
  }

  return (
    // <ParticleBackground>
    <div className='login'>
      <div className='align-center flex-column login__container'>
        <FlashcardLogo />
        <div className='login__register__text  login__col-navajowhite'>
          Reset your Password
        </div>
        <form className='zIndex-5 width12rem' onSubmit={pwdReset}>
          <div className='login__reset-col'>
            Lost your password? You will receive a link to create a new
            password.
          </div>
          <div className='login__LoginInput flex-column mb-20px'>
            <Email ref={emailRef} />
            <div className='login__button__container login__field-distance justify-between-align-center flex-column width100pc height75px mt-20px'>
              <Button text='Reset password' />
              <div
                onClick={() => {history.push('/login')}}
                className='zIndex-5 justify-center login__link font-13px login__col-navajowhite cursorPointer'
              >
                Back to Login
              </div>
            </div>
          </div>
        </form>
        {(pwdLinkActive || emailNotInDB) && (
          <div className='bs-5'>
            <Alert
              variant={`${emailNotInDB ? "danger" : "info"}`}
              className={"height35px"}
            >
              {emailNotInDB
                ? "Email does not exist in database."
                : "We have e-mailed your password reset link."}
            </Alert>
          </div>
        )}
      </div>
    </div>
    // </ParticleBackground>
  );
}

export default NewPassword;
