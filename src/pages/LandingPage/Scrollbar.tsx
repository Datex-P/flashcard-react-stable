
import React, {useContext, useState, useRef} from "react";
import { Context } from '../../context/Context'; 
import {ScrollLogic} from './ScrollLogic'

function Scrollbar({scrollbarVisible}){

  const [scrollPosition, setScrollPosition] = useState(0)
  const scroller = useRef<HTMLInputElement>(null);
  const {dataBase} = useContext(Context);

  const {scrollHandler, 
   // handleActive
  } = ScrollLogic({setScrollPosition})


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
