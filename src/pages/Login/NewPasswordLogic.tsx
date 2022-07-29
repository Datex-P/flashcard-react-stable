
export const NewPasswordLogic = ({ 
  apiURL, 
  setEmailNotInDB, 
  setPwdLinkActive,
  emailRef
}) => {
  
    async function pwdReset(e) {
    e.preventDefault();
    try {
      //e preventDefault is needed because forms
      //have a standard behaviour of redirecting
      if (emailRef.current) {
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
      }
    } catch (err) {
      console.log(err, "err here");
    }
  }
  
  return {
    pwdReset
  }
}