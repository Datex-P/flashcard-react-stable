import { Button} from 'react-bootstrap'
import React, { useContext} from "react";
import { Context } from '../../../../context/Context';
 
function RepeatButtons({ 
  generateRandom,
  setShowAnswerBtn,setShowRepeatBtn
}
  ) {

const {dataBase} = useContext(Context);

function repeatHandler() {
  setShowRepeatBtn(false);
  generateRandom();
  setShowAnswerBtn(true)
}

function RepeatBtn({label, btn, onClick}) {
  
  return (
    <div className='flex-column align-center'>
       <div className='fontBold'>
          {label}
      </div>
      <Button 
        variant="secondary"
        onClick={onClick}
        className='deck__repeat-btn__button justify-center-align-center cursorPointer'
      >
          {btn}
      </Button>  
    </div>
  )
}
return (
  <div className="justify-center">
    <div className="justify-between px-3 deck__showRepeat">
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
