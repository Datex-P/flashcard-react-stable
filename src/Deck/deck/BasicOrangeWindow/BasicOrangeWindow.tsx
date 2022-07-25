/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from '../../../Context';
import InputCheckbox from './InputCheckbox';
const closeWindow: string = require('../../../icons/closeWindow.svg');

interface BasicOrangeProps{
  children?: JSX.Element |JSX.Element[];
  deckFinished?: boolean;
  index: number;
  generateRandom?: Function;
  menu?: false | JSX.Element;
  questionAnswerWindow?: boolean;
  questionViewActive?: boolean;
  setEdit?:(prop?:boolean) => void;
  setEditModeActive?:(prop?:boolean) => void;
  setScrollbarVisible: (prop?:boolean) => void;
  settings?: boolean;
  setShow: (prop?:boolean) => void;
  setShowAnswerBtn?:(prop?:boolean) => void;
  show?: boolean;
  showFromParent?: boolean;
  stats?: boolean;
  title?: string | JSX.Element | undefined;
}
export default function BasicOrangeWindow({
              children,
              index,
              deckFinished,
              generateRandom,
              setScrollbarVisible,
              show,setShow,
              questionAnswerWindow = false,
              menu,
              stats=false,
              settings=false,
              questionViewActive=false,
              setShowAnswerBtn = () => {},
              setEdit = () => {},
              setEditModeActive = () => {},
              title
}: BasicOrangeProps) {

  const {
        setArrowDown,
        dataBase, setDataBase, 
        setHideCreateDeckBtn,
        setShowProgressDiagram,
      } = useContext(Context);

  const basicOrangeRef = useRef(null)
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)

  let someCardsPaused = dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0
  
  function redCrossHandler () {
    setShow(false);
    setEdit(false);
    setHideCreateDeckBtn(false) //createDeckBtn is shown again
    //setShowRepeatBtn(false);
    setShowAnswerBtn(true);
    setEditModeActive(false);
    if (!stats){
      setScrollbarVisible(true);
    }
    setShowProgressDiagram(true) //diagram that is shown on main page
    if (index) {
      let newDataBase = {...dataBase}
      newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
      setDataBase(newDataBase)
    }
    if (dataBase?.DeckNames?.length === 0) {     
      setArrowDown(true); //
      // setDecksAreVisible(false); 
  }
  }

  useEffect(()=>{
    if (deckFinished) {
    console.log('red cross handler invoked')
    redCrossHandler()
    }
  },[deckFinished])

  function mouseEnterHandler () {
    let element = document.querySelector('.deck__onOffSwitch-label')
    if (someCardsPaused && !dataBase.DeckNames[index].editModeActive
        && element)
     {
      element.classList.add('pointer');
    }
  }

  function mouseLeaveHandler () {
    if (someCardsPaused) {
      let element = document.querySelector('.deck__onOffSwitch-label')
      if(element) {
        element.classList.remove('pointer');
      }
    }
  }
  
  function saveIconBlinks(event) {
    let element = document.querySelector('.mod')
    if (element && !element.contains(event.target)) {
      console.log('clicked outside')
      setBlinkingSaveIcon(true) 
      setTimeout(()=>{
        setBlinkingSaveIcon(false)
      }, 2000)  
    }
  }

  useEffect(()=>{
    // if (!stopRedCrossListener) {
    //   console.log('noitce from red cross here')
    //   if(show){
    //     setTimeout(()=>{document.addEventListener('click', saveIconBlinks)},500)
    //     setTimeout(()=>{document.addEventListener('scroll', saveIconBlinks)},500)
    //   }
    //   //best way to remove handler for settings?
    //   return ()=>{
    //     document.removeEventListener('click', saveIconBlinks);
    //     document.removeEventListener('scroll', saveIconBlinks);
    //     setBlinkingSaveIcon(false);console.log('got unmounted')}
    // }
  },[show])

  useEffect(()=>{
    console.log( 'blinking icon triggered')
  },[blinkingSaveIcon])

  return (
    <Modal
      key={index}
      show={show}
      ref={basicOrangeRef}
      onHide={()=>setShow(false)}  
      contentClassName={`${settings? 'posRelative':''} mod`}
      backdrop="static"
      style={{
        left: '-160px !important',
        right: '45px !important',
        backgroundColor: questionViewActive?'rgba(0, 0, 0, 0.6)':'',
        position: questionViewActive? 'relative':'static',
        width:questionViewActive? '98%':'',
        height:questionViewActive? '651px':'',
        borderRadius:questionViewActive? '10px':''
      }}
    >
      <div className={`${settings? '': 'posRelative'} deck__modal_cont top-20px`}>
        <Modal.Header className='border-bottom-0'>
          <Modal.Title
            style={{
              fontSize: '16px',
              marginLeft: '20px',
              height: '24px',
              width: '90%',
              display: 'flex',
              marginTop: settings? '20px': '0px',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          >
            {title}
            <div 
              className='redCross'
              onClick={redCrossHandler}
            >
            <img 
              className={`redCross nonDraggableIcon width16px height16px 
              ${blinkingSaveIcon ? 'deck__blinkingIcon':''}`}
              src={closeWindow} 
              alt='redCross'
            /> 
          </div>
          </Modal.Title>
          <div
            className="deck__onOffSwitch"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            title={`${someCardsPaused? 'Click to show all paused cards':''}`}
          >
            {questionAnswerWindow &&
              <InputCheckbox
                index={index}
                generateRandom={generateRandom}
                setShowAnswerBtn={setShowAnswerBtn}                
              />
            }
          </div>
          {menu}
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </div>
    </Modal>
  );
}
