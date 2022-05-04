import plusimg from "../../../../icons/plus.svg";

export default function DeckEmpty({ setShow }) {
  return (
    <div className='deckEmptyAndPausedContainer deck__deckEmpty justify-evenly-align-center flex-column'>
      <div className='deck__deckempty justify-around flex-column'>
        <div>Deck is empty.</div>
        <div>
          Press:
          <span
            className='paused__container_img-plus'
            onClick={() => setShow(true)}
          >
            <img src={plusimg} alt='plus' />
          </span>
        </div>
      </div>
      <div className='paused__addCardsToDeck'>to add cards to the deck.</div>
    </div>
  );
}
