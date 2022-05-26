
import React, {  useContext, useState, useRef} from "react";
import { Context } from "../Context"; 

function Scrollbar({scrollbarVisible}) {

  const [scrollPosition, setScrollPosition] = useState(0)
  const scroller = useRef<HTMLInputElement>(null);

  function handleActive(i:number) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }

    
  function scrollHandler(e:any) {
    let position = e.target.scrollTop;
    setScrollPosition(position);
  }

  const {
    setActive,
    changeDeckNameOpen, 
    dataBase,setDataBase, 
  } = useContext(Context);

  return (
    <>
    {scrollbarVisible &&
      dataBase.DeckNames && 
      dataBase?.DeckNames.length > 1 &&
    <div
    ref={scroller}
    className="landing__scrollbar"
    onScroll={(event) => {
      if (!changeDeckNameOpen) {
        let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
        const scroll = (event.target as HTMLElement).scrollTop
        let index = Math.floor(scroll / step);
        handleActive(index);
        // console.log(index + "actual handle active index");
        scrollHandler(event);
      }
    }}
    >
    <div className='scrollbar-inner'></div>
  </div>
}
  </>
  )
}

export default Scrollbar
