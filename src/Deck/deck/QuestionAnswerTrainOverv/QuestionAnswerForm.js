import {FormControl} from "react-bootstrap";

function QuestionAnswerForm({card, editBtnClicked, changeHandler, inputRef=false}) {
  return (
    <div className="mt-4">
        <p className="deck__questionAnswer">Answer</p>
        <FormControl
            as="textarea"
            aria-label="With textarea"
            value={card.answer}
            disabled={!editBtnClicked}
            name="answer"
            onChange={changeHandler}
            className="formControlIn"
            ref={inputRef}
        />
                </div>
  )
}

export default QuestionAnswerForm