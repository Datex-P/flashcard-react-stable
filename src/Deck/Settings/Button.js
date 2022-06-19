import React, { useContext } from "react";
import { Context } from "../../Context"; 
import { useHistory } from "react-router-dom";


function Button ({setDeleteAccountPrompt, ok=false}) {

const {user} = useContext(Context);
let history = useHistory();

console.log(user, 'user here')
  function cancelHandler () {
    setDeleteAccountPrompt(false)
  }

//   async function okHandler() {
//     const response = await fetch('http://localhost:4000/delete_account', {
//       method:'POST',
//       headers:{
//         "Content-Type":"application/json",
//         "Accept":"application/json",
//         "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify({user})
//   })
//  const data = await response.json()
//   // console.log(data, 'data here')
//   //   if(response.status === 200) {
//   //     history.push('/login')
//   //   }
//   }

  return (
      ok? (
      <button
        className='settings__button'
        key={'Ok'}
      //  onClick={okHandler}
      >
        Ok
      </button>
      )
      :
      ( 
      <button
        className='settings__button'
        key={'Cancel'}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      )
  )
}

export default Button