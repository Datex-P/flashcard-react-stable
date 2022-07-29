import { useContext } from 'react';
import { Context } from '../../../../context/Context';

export const PauseLogic = ({
  generateRandom,
  index,
  randomQuestion
  }) => {
  
    const {dataBase, setDataBase } = useContext(Context);
  
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

  return {keepPausedHandler, unpauseHandler}
}