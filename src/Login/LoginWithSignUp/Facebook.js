import FacebookLogin from "@greatsumini/react-facebook-login";
import env from "../../env.json";
import { useHistory } from "react-router-dom";
let facebookID = env.Facebook_ID;

function Facebook ({setUser}) {

  const callback = element => element.innerHTML === 'Login with Facebook'
  const elements = Array.from(document.getElementsByTagName('button'))
  console.log(elements, 'elements here')

const result = elements.filter(callback)
      result.innerHTML = 'Facebook'
      console.log(result, 'result here')
    //  result.classList.add('facebook')

console.log(result)
let history = useHistory();

  return (

    <FacebookLogin
              appId={`${facebookID}`}
              style={{
                backgroundColor: "#4267b2",
                color: "#fff",
                fontSize: "13px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                position:'relative',
                zIndex:'4',
                cursor:'pointer'
              }}
              onSuccess={(response) => {
                // history.push("/main")
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
                setUser(true);
              }}
            />
  )

}

export default Facebook