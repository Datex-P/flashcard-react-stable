import playimg from "../../icons/play.svg";
import { useContext } from "react";
import { Context } from "../Context";

export default function Paused({ handlePause, index }) {
  const {
    colors //colors array for the decks
} = useContext(Context);

  return (
    <div
      className='deckPausedContainer'
      style={{ background: colors[index % 5] }}
    >
      <div></div>
      <div className='align-center'>
        Press:
        <button className='deck__btn-play' onClick={handlePause()}>
          <img 
            src={playimg} 
            alt='play' 
            className='m-6px cursorPointer' 
          />
        </button>
      </div>
      <div>
        to unpause the Deck. Paused decks don't count to the study goal.
      </div>
    </div>
  );
}
