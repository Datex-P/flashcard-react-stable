import {FormControl} from "react-bootstrap";

function QuestionAnswerForm({answer=false,card, editBtnClicked, changeHandler, inputRef=false}) {
  return (
    <div className="mt-40px mb-30px">
        <p className="deck__questionAnswer fontBold">{answer?'Answer':'Question'}</p>
        <FormControl
            as="textarea"
            aria-label="With textarea"
            value={card.answer}
            disabled={!editBtnClicked}
            name="answer"
            onChange={changeHandler}
            className='deck__formControl posRelative'
          //  ref={inputRef}
        />
     </div>
  )
}

export default QuestionAnswerForm