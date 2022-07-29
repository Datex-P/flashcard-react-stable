import {useContext} from 'react'
import { Context } from '../../../../context/Context';


export const OpenLogic = ({ 
  paused, 
  generateRandom,
  setScrollbarVisible}) => {
    
  const {
    dataBase, setDataBase, 
    editButtonClicked, 
    setHideCreateDeckBtn,
    setThreeDotsOpen,
    setShowProgressDiagram //progressDiagram is shown in the back of main 
  } = useContext(Context);

  function openDeckHandler () {
    if (editButtonClicked && !paused) {
      generateRandom();
      setThreeDotsOpen(false)
      let newDataBase = { ...dataBase };
      newDataBase.openedToday = true; //important for stats
      setShowProgressDiagram(false); //progress diagram gets why not at this place??
      setDataBase(newDataBase);
      setScrollbarVisible(false) //as long as deck is open, scrollbar is not visible
      setHideCreateDeckBtn(true) //create Deck Btn gets hidden
    }
  }

  return {openDeckHandler}
}