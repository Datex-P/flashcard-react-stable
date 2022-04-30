import { Modal } from "react-bootstrap";
import closeWindow from "../../../icons/closeWindow.svg";
import React, { useContext } from "react";
import InputCheckbox from "./InputCheckbox";
import { Context } from "../../../Context";

export default function BasicOrangeWindow({
              children,
              index,
              generateRandom,
              setScrollbarVisible,
              setHideCreateDeckBtn,
              show,setShow,
              mainBox,
              menu,
              setShowAnswerBtn = () => {},
              setEdit = () => {},
              setEditBtnClicked = () => {},
              title
}) {

  const {dataBase, setDataBase, setShowRepeatBtn} = useContext(Context);


  function redCrossHandler () {
    setShow(false);
    setEdit(false);
    setHideCreateDeckBtn(false) //createDeckBtn is shown again
    //setShowRepeatBtn(false);
    setShowAnswerBtn(true);
    setEditBtnClicked(false);
    setScrollbarVisible(true);
    if (index) {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
    setDataBase(newDataBase)
    }
  }

  function mouseEnterHandler () {
    if (dataBase.DeckNames[index].data.filter((x) => x.paused === true).length > 0 && !dataBase.DeckNames[index].editModeActive) {
      document
      .querySelector(".deck__onOffSwitch-label")
      .classList.add("pointer");
    }
  }

  function mouseLeaveHandler () {
    if (dataBase.DeckNames[index].data.filter((x) => x.paused === true).length > 0) {
      document.querySelector(".deck__onOffSwitch-label").classList.remove("pointer");
  }
  }

  return (
    <Modal
      key={index}
      show={show}
      onHide={() => setShow(false)}
      contentClassName={"mod"}
      backdrop="static"
      style={{
        left: "-160px !important",
        right: "45px !important",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className='innerModalContainer posRelative top-20px'>
        <Modal.Header className="border-bottom-0">
          <Modal.Title
            style={{
              fontSize: "16px",
              marginLeft: "12px",
              height: "24px",
              width: "240px"
            }}
          >
            {title}
          </Modal.Title>
          <div
            className="deck__onOffSwitch"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            {mainBox &&
              <InputCheckbox
                index={index}
                generateRandom={generateRandom}
                setShowAnswerBtn={setShowAnswerBtn}                
              />
            }
          </div>
          {menu}
          <button
            className="redCross basic_button_positioning posAbsolute justify-center-align-center"
            onClick={redCrossHandler}
          >
            <img 
              className="nonDraggableIcon" 
              style={{width:'16px', height:'16px'}}
              src={closeWindow} 
              alt="redCross" 
            /> 
          </button>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </div>
    </Modal>
  );
}
