import React, { useContext}  from 'react';
import play from "../../../icons/play.svg";
import { Context } from "../../../Context";


export default function ThisDeckPaused ({index}) {

  const { dataBase, setDataBase } = useContext(Context);
  let colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];

  console.log(index, 'index in deck paused here')
  console.log(dataBase, 'database here')

  function handlePause(index) { 
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);
  }
  
  return (
      <div
        className="deck__deckEmptyAndPausedContainer justify-evenly-align-center flex-column"
        style={{ background: colors[index % 5] }}
      >
        <div>
        This deck is paused.
        </div>
        <div className='align-center'>
          Press:
          <button
            className="deck__btn-play justify-center-align-center"
            onClick={handlePause}
          > 
            <img 
              src={play} 
              alt='play' 
              className='paused__img-play'
              // onClick={handlePause}
            />
            </button>
        </div>
        <div className="deck__countToStudyGoal posRelative">
          It doesn't count to the study goal.
        </div>
      </div>
  )
}