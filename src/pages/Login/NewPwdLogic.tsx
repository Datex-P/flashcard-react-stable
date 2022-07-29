import { useHistory } from "react-router-dom";

export const NewPwdLogic = ({
  apiURL,
  passwordRef1,
  passwordRef2,
  setPwdDifferent,
  setUpdatedPassword,
  setTokenCorrupted
}) => {

  const history = useHistory()

  async function resetPwdHandler(e) {
    if (passwordRef1.current && passwordRef2.current) {
      if (passwordRef1.current.value === passwordRef2.current.value) {
        try {
          e.preventDefault();
          //e preventDefault is needed because forms
          //have a standard behaviour of redirecting
          let new_password = passwordRef1.current.value;
          let url = window.location.href.indexOf("=");
          let token = window.location.href.slice(url + 1);
    
          const response = await fetch(`${apiURL}/confirm_new_pwd`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              new_password,
            }),
          });
          const data = await response

          if (data.status === 200) {
            setUpdatedPassword(true)
            setTimeout(()=>{
            history.push('/login');
            setUpdatedPassword(false)
            },6000)
          }
          if (data.status === 500) {
            setTokenCorrupted(true)
            setTimeout(()=>{
            history.push('/forgotpassword');
            setTokenCorrupted(false)
            },6000)
          }
        } catch (error) {
          console.log(error, "error here");
        }
    }
    } else {
      setPwdDifferent(true);
      setTimeout(() => {
        setPwdDifferent(false);
      }, 4000);
    }
  }
  return {
    resetPwdHandler
  }
}