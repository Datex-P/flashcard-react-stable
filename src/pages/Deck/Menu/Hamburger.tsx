import React, { useContext, useEffect, useRef } from "react";
import { Context } from '../../../context/Context';

function Hamburger({ 
  menuOpen, //when true menu is clicked and stats settings logout appear
  setMenuOpen
}) {

  const { editButtonClicked, hideCreateDeckBtn, showProgressDiagram, setShowProgressDiagram} = useContext(Context);
    const menuRef = useRef<HTMLDivElement | null>(null)


  function triggerDiagramAndState() {
     if(editButtonClicked) { //see DeckOrCardName not input field visible atm
      if(!hideCreateDeckBtn) {
        setMenuOpen(!menuOpen);
        setShowProgressDiagram(!showProgressDiagram);
      }
    }
  }

  useEffect(()=>{
    function menuCloses(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        console.log('clicked outside')
        setMenuOpen(false) 
      }
    }
    
    if(menuOpen){
      setTimeout(()=>{document.addEventListener('click', menuCloses)},500)    
    }
    return ()=>{document.removeEventListener('click', menuCloses)}
  },[menuOpen, setMenuOpen])


  return (
    <div
      className='menu__menu align-center flex-column'
      ref={menuRef}
    >
      <div className='font-18px'>
          Menu
      </div>
      <div 
        className='zIndex-5 top-59px posAbsolute width28px height20px align-center flex-column'
       //cursor is default when edit input field is activated
        style={{cursor: editButtonClicked && !hideCreateDeckBtn ? 'pointer': 'default'}} 
        onClick={triggerDiagramAndState}
      >
        <div className={`menu__menuIcon ${menuOpen ? 'menu__transPlus top-8px' : ''}`}>
        </div>
        {!menuOpen && 
        <div className='menu__menuIcon top-8px'>
        </div>
        }
        <div className={`menu__menuIcon ${menuOpen ? 'menu__transMinus top-8px' : 'top-16px'}`}>
        </div>
      </div>
    </div>
  );
}

export default Hamburger;
