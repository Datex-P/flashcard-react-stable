import flashcard from "../icons/flashcard-design-new.png";

function FlashcardLogo ({register=false}) {

  return (
    <div className='justify-center width100pc mt-75px mb-15pc'>
      <img
        src={flashcard}
        alt='flashcard'
        className={`width100px height100px 
                  ${register? 'login__flashcardBackground-top':''}`
        }
      />
  </div>
  )
}

export default FlashcardLogo