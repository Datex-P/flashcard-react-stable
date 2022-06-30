import Button from '../Button'
import {forwardRef} from 'react'

const ButtonContainer = forwardRef((props, okRef) =>{

  async function addDeckHandler() {
    let email = user
    let deckName = inputField
    if (editButtonClicked) { //input field of deck is not active see InputSelectField.js
      try{
       
        const response =  await fetch(`${apiURL}/create_deck`, {
          method:"POST",
        headers: {
           "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          email:email,
          deckName: deckName
        })
      });
      await response

      if (response.status === 200) {
     
      }
  } catch(error) {
  console.log(error, 'error here')
  }
 }
}

  return (
    <div className='width57pc marginAuto posRelative justify-between'>
           <Button 
              ref={okRef}
              {...props}
            />
            <Button 
              ref={okRef}
              ok
              onClick={addDeckHandler}
              {...props}
             /> 
          </div>
  )
})

export default ButtonContainer