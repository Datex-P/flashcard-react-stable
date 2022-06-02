import React, { useContext } from "react";
import pauseimg from "../../../icons/pause.svg";
import { Context } from "../../../Context";

export default function PauseModeHandler({
  generateRandom,
  index,
  randomQuestion,
}) {
  const { dataBase, setDataBase } = useContext(Context);

  function unpauseHandler() {

    let newDataBase = { ...dataBase };
 
    if (newDataBase.DeckNames[index].data.filter((item) => item.paused).length >1) { 
      newDataBase.DeckNames[index].data.filter((item) => item.paused)[randomQuestion].paused = false;
      setDataBase(newDataBase);
   //   generateRandom();
    } else if(newDataBase.DeckNames[index].data.filter((item) => item.paused).length === 1){
      newDataBase.DeckNames[index].data.filter((item) => item.paused)[randomQuestion].paused = false;
      newDataBase.DeckNames[index].pauseMode = false
      setDataBase(newDataBase);
      document.querySelector('.deck__onOffSwitch-checkbox').checked = false 
  }
}

  function keepPausedHandler() {
    generateRandom()
  }


  return (
    <>
      <div className='deck__pauseModeHandler posAbsolute'>
        <img 
          src={pauseimg} 
          alt={"pause"}
        />
        <span className='ml-7px'>
          mode
        </span>
      </div>
      <div className='justify-center'>
        <div className='justify-around width300px'>
          <div
            className='justify-center deck__unpause-keepPaused deck__showAnswerButton align-center'
            onClick={unpauseHandler}
          >
            Unpause card
          </div>
          <div
            className='justify-center deck__unpause-keepPaused deck__showAnswerButton align-center'
            onClick={keepPausedHandler}
          >
            Keep paused
          </div>
        </div>
      </div>
    </>
  );
}