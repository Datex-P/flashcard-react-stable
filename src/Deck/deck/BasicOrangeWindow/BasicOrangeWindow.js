import { Modal } from "react-bootstrap";
import closeWindow from "../../../icons/closeWindow.svg";
import React, { useContext, useEffect } from "react";
import InputCheckbox from "./InputCheckbox";
import { Context } from "../../../Context";

export default function BasicOrangeWindow({
              children,
              index,
              generateRandom,
              setScrollbarVisible,
              show,setShow,
              mainBox,
              menu,
              settings=false,
              stats=false,
              questionViewActive=false,
              setShowAnswerBtn = () => {},
              setEdit = () => {},
              setEditBtnClicked = () => {},
              title
}) {

  const {dataBase, setDataBase, setHideMenu,setHideCreateDeckBtn,
        setShowProgressDiagram} = useContext(Context);

  function redCrossHandler () {
    setShow(false);
    setEdit(false);
    setHideMenu(false) //menu gets shown again
    setHideCreateDeckBtn(false) //createDeckBtn is shown again
    //setShowRepeatBtn(false);
    setShowAnswerBtn(true);
    setEditBtnClicked(false);
    setScrollbarVisible(true);
    setShowProgressDiagram(true)
    if (index) {
      let newDataBase = {...dataBase}
      newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
      setDataBase(newDataBase)
    }
  }

  function mouseEnterHandler () {
    if (dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0 && !dataBase.DeckNames[index].editModeActive) {
      document
      .querySelector(".deck__onOffSwitch-label")
      .classList.add("pointer");
    }
  }

  function mouseLeaveHandler () {
    if (dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0) {
      document.querySelector(".deck__onOffSwitch-label").classList.remove("pointer");
    }
  }

  useEffect(() => {
    if (settings || stats){
      if (document.querySelector('.modal-dialog')) {
        let elem = document.getElementsByClassName('modal-dialog')
        elem[0].style.padding='28px'
        }
    }
  }, [settings, stats]);

  return (
    <Modal
      key={index}
      show={show}
      onHide={() => setShow(false)}
      contentClassName={settings? 'posRelative marginAuto zIndex-5 deck__settings-layout':"mod"}
      backdrop="static"
      style={{
        left: '-160px !important',
        right: '45px !important',
        backgroundColor: questionViewActive?'':'rgba(0, 0, 0, 0.6)'
      }}
    >
      <div className={`${settings?'':'posRelative'} deck__modal_cont top-20px`}>
        <Modal.Header className="border-bottom-0">
          <Modal.Title
            style={{
              fontSize: "16px",
              marginLeft: "12px",
              height: "24px",
              width: "240px",
              marginTop: settings? '20px':'0px'
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
          <div
            className={`${settings? 'deck__settings_button_positioning':'deck__basic_button_positioning'} redCross posAbsolute justify-center-align-center`}
            onClick={redCrossHandler}
          >
            <img 
              className="redCross nonDraggableIcon width16px height16px" 
              src={closeWindow} 
              alt="redCross" 
            /> 
          </div>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </div>
    </Modal>
  );
}
