import React, { useContext}  from 'react';
import play from "../../../icons/play.svg";
import { Context } from "../../../Context";

export default function ThisDeckPaused ({index, setShowThreeDots, showThreeDots}) {

  const { apiURL, dataBase, setDataBase, email, nameOfTopDeck } = useContext(Context);
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

 async function handlePause() { 
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = false;
    setDataBase(newDataBase);
    setShowThreeDots(!showThreeDots) //three dots get hidden commented out for now

    let deckName = nameOfTopDeck

    await fetch(`${apiURL}/pause_deck`, {
      method:"POST",
      headers: {
        "Access-Control-Allow-Origin": "*",     
        "Content-Type":"application/json",
      },
        body: JSON.stringify({
        email:email,
        deckName:deckName
        })
      });
  }
  
  return (
      <div
        className='deck__deckEmptyCont justify-evenly-align-center flex-column'
        style={{ background: colors[index % 5] }}
      >
        <div>
        This deck is paused.
        </div>
        <div className='align-center mt-5px'>
          Press:
          <button
            className='deck__btn-play justify-center-align-center posRelative zIndex-5'
            onClick={handlePause}
          > 
            <img 
              src={play} 
              alt='play' 
              className='paused__img-play'
            />
          </button>
        </div>
        <div className='deck__countToStudyGoal posRelative'>
          It doesn't count to the study goal.
        </div>
      </div>
  )
}