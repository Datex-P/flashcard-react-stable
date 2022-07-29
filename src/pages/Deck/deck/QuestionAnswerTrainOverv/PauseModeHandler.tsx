import React, { useContext } from 'react';
import { Context } from '../../../../context/Context';
import pauseimg from '../../../../icons/pause.svg';
// https://stackoverflow.com/questions/64656055/react-refers-to-a-umd-global-but-the-current-file-is-a-module


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

      // https://bobbyhadz.com/blog/typescript-property-checked-not-exist-on-type-htmlelement#:~:text=The%20error%20%22Property%20'checked',This%20is%20the%20index.
      //Type assertions are used when we have information about the type of a value that TypeScript can't know about.
      let element =  document.querySelector('.deck__onOffSwitch-checkbox') as HTMLInputElement | null;
      if(element !== null) {
      element.checked = false 
      }
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
          alt={'pause'}
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