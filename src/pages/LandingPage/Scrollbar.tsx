
import React, {useContext, useState, useRef} from "react";
import { Context } from '../../context/Context'; 

function Scrollbar({scrollbarVisible}) {

  const [scrollPosition, setScrollPosition] = useState(0)
  const scroller = useRef<HTMLInputElement>(null);
  const {
    dataBase,setDataBase, 
    editButtonClicked,
    setActive,
  } = useContext(Context);


  function handleActive(i:number) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }
  
  function scrollHandler(event:any) {
    if (editButtonClicked) { //input field in deckorcardname.js is not active)
      let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
      const scroll = (event.target as HTMLElement).scrollTop
      let index = Math.floor(scroll / step);
      
      handleActive(index);
      let position = event.target.scrollTop;
      setScrollPosition(position);
   }
  }


  return (
    <>
    {
     scrollbarVisible &&
     dataBase?.DeckNames?.length > 1 &&

    <div
      ref={scroller}
      className='landing__scrollbar'
      onScroll={scrollHandler}
    >
      <div className='scrollbar-inner'></div>
    </div>
  }
  </>
  )
}

export default Scrollbar
