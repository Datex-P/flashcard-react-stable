export const ForgotLogic = ({
  apiURL,
  emailRef,
  history,
  setPwdLinkActive,
  setEmailNotInDB,
}) => {

  async function pwdReset(e) {
    e.preventDefault();
    try {
      if ("current" in emailRef && emailRef.current ) {
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

      const data = await response;

      if (data.status === 200) {
        setPwdLinkActive(true);
        setTimeout(() => {
          setPwdLinkActive(false);
          history.push('/login')
        }, 4000);
      } else {
        setEmailNotInDB(true);
        setTimeout(() => {
          setEmailNotInDB(false);
        }, 4000);
      }
    }
    } catch (err) {
      console.log(err, "err here");
    }
  }

  return {
    pwdReset
  }
}