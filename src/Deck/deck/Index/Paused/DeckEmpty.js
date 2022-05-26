import plusimg from "../../../../icons/plus.svg";
import {Context} from '../../../../Context';
import {useContext} from 'react'

export default function DeckEmpty({ setShow }) {
  
  const {setHideCreateDeckBtn} = useContext(Context)

  function clickHandler() {
    setShow(true)
    setHideCreateDeckBtn(true)
  }


  return (
    <div className='deckEmptyAndPausedContainer deck__deckEmpty justify-evenly-align-center flex-column'>
      <div className='deck__deckempty justify-around flex-column'>
        <div>Deck is empty.</div>
        <div>
          Press:
          <span
            className='posRelative top-5px ml-10px cursorPointer'
            onClick={clickHandler}
          >
            <img src={plusimg} alt='plus' />
          </span>
        </div>
      </div>
      <div className='deck__paused__addCardsToDeck posAbsolute'>
        to add cards to the deck.
      </div>
    </div>
  );
}
