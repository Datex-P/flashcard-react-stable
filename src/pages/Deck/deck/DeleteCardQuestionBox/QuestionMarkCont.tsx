import React from "react";
import questionMark from '../../../../icons/questionMark.svg';

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
