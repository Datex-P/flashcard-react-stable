import FacebookLogin from "@greatsumini/react-facebook-login";
import env from "../env.json";

let facebookID = env.Facebook_ID;

function Facebook ({setUser}) {
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
                width:"80%"
              }}
              onSuccess={(response) => {
                // console.log('Login Success!', response);
                //  setUser(true)
                // <LandingPage/>
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