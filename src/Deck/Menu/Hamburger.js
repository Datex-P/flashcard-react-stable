import React, { useContext } from "react";
import { Context } from "../../Context";

function Hamburger({ 
  menuOpen, //when true menu is clicked and stats settings logout appear
  setMenuOpen 
}) {

  const { editButtonClicked, showProgressDiagram, setShowProgressDiagram} = useContext(Context);

  function triggerDiagramAndState() {
    // if(editButtonClicked) {
      setMenuOpen(!menuOpen);
      setShowProgressDiagram(!showProgressDiagram);
      console.log('got triggered in diagram')
    //}
  }

  return (
    <div
      className='menu__menu mt-15px align-center flex-column p-3'
      style={{cursor: editButtonClicked ? 'pointer': 'default'}} //cursor is default when edit input field is activated
    >
      <div className='font-18px'>Menu</div>
      <div 
        className='zIndex-5 menu__icon-cont posAbsolute width100px align-center flex-column'
        onClick={triggerDiagramAndState}
      >
        <div className={`menu__menuIcon ${menuOpen ? 'menu__transPlus top-8px' : ''}`}
        ></div>
        {!menuOpen && 
        <div className={"menu__menuIcon top-8px"}></div>
        }
        <div className={`menu__menuIcon ${menuOpen ? 'menu__transMinus top-8px' : 'top-16px'}`}
        ></div>
      </div>
    </div>
  );
}

export default Hamburger;
