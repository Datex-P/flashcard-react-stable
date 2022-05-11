import plusimg from "../../../../icons/plus.svg";

export default function DeckEmpty({ setShow }) {
  return (
    <div className='deckEmptyAndPausedContainer deck__deckEmpty justify-evenly-align-center flex-column'>
      <div className='deck__deckempty justify-around flex-column'>
        <div>Deck is empty.</div>
        <div>
          Press:
          <span
            className='ml-10px cursorPointer'
            onClick={() => setShow(true)}
          >
            <img src={plusimg} alt='plus' />
          </span>
        </div>
      </div>
      <div className='deck__paused__addCardsToDeck posAbsolute'>to add cards to the deck.</div>
    </div>
  );
}
