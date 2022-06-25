import React, { useRef, useState } from "react";
import "../styles.scss";
import "./login.css";
import ParticleBackground from "./Particles/ParticlesBackground";
import { useHistory } from "react-router-dom";
import FlashcardLogo from "./FlashcardLogo";
import Password from "./Register/Password";
import jwt_decode from "jwt-decode";
import Alert from "react-bootstrap/Alert";

function NewPwd() {
  const passwordRef1 = useRef(null);
  const passwordRef2 = useRef(null);
  const [pwdDifferent, setPwdDifferent] = useState(false);
  
  const history = useHistory();

  async function resetPwdHandler(e) {
    if (passwordRef1.current.value === passwordRef2.current.value) {
      try {
        console.log("got triggered");
        e.preventDefault();
        //e preventDefault is needed because forms
        //have a standard behaviour of redirecting
        // console.log(name, "name in ref");
        let password = passwordRef1.current.value;
        let url = window.location.href.lastIndexOf("/");
        let token = window.location.href.slice(url + 1);

        let decoded = jwt_decode(token);
        let { email } = decoded;

        const response = await fetch("http://localhost:4000/confirm_new_pwd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();

        if (data.status === "ok") {
          history.push("/login");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    } else {
      setPwdDifferent(true);
      setTimeout(() => {
        setPwdDifferent(false);
      }, 4000);
    }
  }

  return (
    // <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <FlashcardLogo register />
          <div className='flex-column align-center mb-25px'>
            <div className='login__register__text login__col-navajowhite'>
              Reset
            </div>
            <div className='login__reset-col '>Type your new password.</div>
          </div>
          <form onSubmit={resetPwdHandler}>
            <div className='align-center flex-column posRelative'>
              <Password ref={passwordRef1} />
              <Password ref={passwordRef2} />
              <div className='login__button__container login__field-distance justify-between flex-column width75pc height75px mt-20px'>
                <button className='login__button justify-center-align-center cursorPointer'>
                  Reset Password
                </button>
              </div>
            </div>
          </form>
          {pwdDifferent && (
            <div className='bs-5'>
              <Alert variant={"danger"} className={"height35px"}>
                Passwords are different.
              </Alert>
            </div>
          )}
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default NewPwd;
