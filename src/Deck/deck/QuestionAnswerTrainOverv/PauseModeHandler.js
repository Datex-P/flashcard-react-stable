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
    newDataBase.DeckNames[index].data.filter((item) => item.paused)[
      randomQuestion
    ].paused = false;
    setDataBase(newDataBase);
    generateRandom();
  }

  return (
    <>
      <div className='deck__pauseModeHandler posAbsolute'>
        <img src={pauseimg} alt={"pause"} />
        <span className='ml-7px'>mode</span>
      </div>
      <div className='justify-center'>
        <div className='justify-around width300px'>
          <div
            className='unpauseAndKeepPausedButton deck__showAnswerButton align-center'
            onClick={unpauseHandler}
          >
            Unpause card
          </div>
          <div
            className='unpauseAndKeepPausedButton deck__showAnswerButton align-center'
            onClick={generateRandom}
          >
            Keep paused
          </div>
        </div>
      </div>
    </>
  );
}
