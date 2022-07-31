
import {useContext} from "react";
import { Context } from '../../context/Context'; 

export const ScrollLogic = ({
  setScrollPosition
}) => {

  const {
    dataBase,setDataBase, 
    editButtonClicked,
    setActive,
    setShowThreeDots //three dots that are shown next to input field
  } = useContext(Context);


  function handleActive(i:number) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }
  
  function scrollHandler(event: { target: HTMLElement; }) {
    if (editButtonClicked) { //input field in deckorcardname.js is not active)
      let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
      const scroll = (event.target as HTMLElement).scrollTop
      let index = Math.floor(scroll / step);
      
      handleActive(index);
      let position = event.target.scrollTop;
      setScrollPosition(position);
      if(dataBase.DeckNames[index].paused!== true) { //deck that is scrolled is not in pause mode
        setShowThreeDots(true)
      } else {
        setShowThreeDots(false) //three dots are hidden because scrolled deck is paused
      }
   }
  }
  
  return {
    scrollHandler, handleActive
  }
}