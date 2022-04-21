
import React, {  useContext, useState, useRef} from "react";
import { Context } from "../Context"; 

function Scrollbar() {

  const [scrollPosition, setScrollPosition] = useState(0)
  const scroller = useRef();

  function handleActive(i) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }

    
  function scrollHandler(e) {
    let position = e.target.scrollTop;
    setScrollPosition(position);
  }

  const {
    setActive,
    changeDeckNameOpen, 
    dataBase,setDataBase, 
  } = useContext(Context);

  return (
    <div
    ref={scroller}
    className="scrollbar"
    onScroll={(event) => {
      if (!changeDeckNameOpen) {
        let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
        let index = Math.floor(event.target.scrollTop / step);
        handleActive(index);
        // console.log(index + "actual handle active index");
        scrollHandler(event);
      }
    }}
    >
    <div className='scrollbar-inner'></div>
  </div>
  )
}

export default Scrollbar
