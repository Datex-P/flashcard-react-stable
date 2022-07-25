import React from "react";
import {FormControl} from "react-bootstrap";

function QuestionAnswerForm({
  answer=false,
  card, 
  editModeActive, 
  changeHandler 
 }) {
  
  return (
    <div className='mt-40px mb-30px'>
        <p className='deck__questionAnswer fontBold'>
          {
          answer?'Answer':'Question'
          }
        </p>
        <FormControl
            as="textarea"
            aria-label="With textarea"
            value={card.answer}
            disabled={!editModeActive}
            name="answer"
            onChange={changeHandler}
            className='deck__formControl posRelative'
        />
     </div>
  )
}

export default QuestionAnswerForm