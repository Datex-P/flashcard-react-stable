import flashcard from "../icons/flashcard-design-new.png";

function FlashcardLogo ({register=false}) {

  return (
    <div className='justify-center width100pc mt-75px mb-15pc'>
      <img
        src={flashcard}
        alt='flashcard'
        className={`${register? 'login__flashcardBackground-top width100px height100px':'width100px height100px'}`}
      />
  </div>
  )
}

export default FlashcardLogo