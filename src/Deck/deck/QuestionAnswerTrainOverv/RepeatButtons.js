import { Button} from 'react-bootstrap'
import React, { useContext} from "react";
import { Context } from "../../../Context";
 
function RepeatButtons({showAnswerBtn, 
  setShowAnswerBtn,setShowRepeatBtn, generateRandom}) {

const {dataBase} = useContext(Context);

function repeatHandler() {
  setShowRepeatBtn(false);
  generateRandom();
}

function RepeatBtn({label, btn, onClick,showAnswerBtn, 
  setShowAnswerBtn}) {
  
  return (

    <div className='text-center'>
       <div className='font-weight-bold'>
          {label}
      </div>
      <Button 
        variant="secondary"
        onClick={onClick}
        className='repeat-btn__button justify-center-align-center'
      >
          {btn}
      </Button>  
    </div>
  )
}
return (
  <div className="justify-center">
    <div className="justify-between px-3 showRepeatBtnInner">
      {dataBase.userTimePreferences.map((col, index) => (
        <RepeatBtn
          btn={col.name}
          key={index}
          label={"< " + col.amount + col.unit}
          onClick={repeatHandler}
          />
        ))}
                  </div>  
    </div>
)
}


export default RepeatButtons
