import React from "react"
import resetimg  from '../../../../icons/reset.svg';
import flashcards from '../../../../icons/flashcards.svg';

function FlashcardTextOrReset({resetQuestionText, pauseOrDelete, card}) {
  
  return(
    <div className='height85pc width100pc justify-center-align-center'>
      <div>
          {
            resetQuestionText? 
              <img 
                  src={resetQuestionText? resetimg: flashcards} 
                  className='justify-center-align-center width26px deck__DeleteCardQuestionBox__img' 
                  alt='reset'                         
              />
              :
              <img 
                  src={flashcards} 
                  className='justify-center-align-center width26px deck__DeleteCardQuestionBox__img' 
                  alt='flashcards'                         
              />

          }
      </div>
    <div>  
      {
      resetQuestionText? 
      'Reset progress':`${pauseOrDelete} ${card}`
      }
    </div>
</div>
  )
}

export default FlashcardTextOrReset