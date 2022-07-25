import React from "react";
const questionMark: string =  require('../../../icons/questionMark.svg');

function QuestionMarkCont() {
 
  return (  
   <div>
      <img
        src={questionMark}
        className='deck__question-mark deck__questionMark1'
        alt='questionMark'
      />
      <img
        src={questionMark}
        className='deck__question-mark deck__questionMark2'
        alt='questionMark'
      />
    </div>
  );
}

export default QuestionMarkCont;
