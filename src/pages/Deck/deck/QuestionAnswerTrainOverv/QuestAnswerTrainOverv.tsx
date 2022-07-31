import React, { useState, useContext, useEffect} from "react";
import { Context } from '../../../../context/Context';
import { Button} from "react-bootstrap";
import CardModified from './CardModified'
import ThreeDotsBtn from '../ThreeDotsBtn/ThreeDotsBtn';
import BasicOrangeWindow from '../BasicOrangeWindow/BasicOrangeWindow';
import DeleteCardQuestionBox from '../DeleteCardQuestionBox/DeleteCardQuestionBox';
import SaveAndDiscard from './SaveAndDiscard';
import RepeatButtons from './RepeatButtons';
import PauseModeHandler from './PauseModeHandler'
import OpenDeckBtn from './OpenDeckBtn';
import QuestionAnswerForm from './QuestionAnswerForm'
import '../deck.css'
import Alert from 'react-bootstrap/Alert'
import editimg from '../../../../icons/edit.svg';
import {QuestionAnswerLogic} from './QuestionAnswerLogic'

export default function QuestAnswerTrainOverv({
        setScrollbarVisible,
        pauseIsActive, setPauseIsActive,
        data,
        index, //the index of the deck that is currently open
        name,
        paused
    }) {

  useEffect(()=>{
  console.log(data, 'data in questanswer here')
  }, [data])



  const [card, setCard] = useState<{answer?:string, question?:string}>({ answer: "", question: "" });
  const [cardModified, setCardModified] = useState(false);
  const [deckFinished, setDeckFinished] = useState(false)
  const [editModeActive, setEditModeActive] = useState<any>(false);
  
  const [pauseOrDeleteText, setPauseOrDeleteText] = useState(true);
  const [randomQuestion, setRandomQuestion] = useState<any>(null);
  const [show, setShow] = useState<any>(false);
  
  const [showDeleteWindow, setShowDeleteWindow] = useState(true);
  const [showAnswerBtn, setShowAnswerBtn] = useState(true); //button in questionAnswerTrainOverView with that name
  const [showRepeatBtn, setShowRepeatBtn] = useState(false); //repeatbtn that is shown in questionanswertrain file
  
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | any>(null);
  const [trash, setTrash] = useState(false);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);

  const {
    apiURL,
    email,
    dataBase, setDataBase, 
    nameOfTopDeck,
    setShowProgressDiagram,
    setShowThreeDots
    } = useContext(Context);

    const { 
      changeHandler,
      discardHandler, 
      deleteCurrentCard,
      editHandler,
      generateRandom,
      refreshHandler,
      pauseEventHandler,
      showAnswerHandler, 
      saveHandler,
      trashHandler} = QuestionAnswerLogic({
      apiURL,
      card, setCard,
      data,
      dataBase, setDataBase, 
      email,
      index,
      nameOfTopDeck,
      pauseIsActive,
      randomQuestion,
      setEditModeActive,
      setShowDeleteWindow,    
      setShowAnswerBtn,
      setShowThreeDots,
      setPauseIsActive,
      setPauseOrDeleteText,
      setTrash,
      setShow,
      setRandomQuestion,
      setShowRepeatBtn
    })
      

  useEffect(()=>{
    console.log(showDeleteWindow, 'show delete window')
    console.log(trash, 'trash')
  },[showDeleteWindow, trash])



  useEffect(() => {
    let i = setTimeout(() => {
      setCardModified(false);
    }, 500);
    return ()=>{
      clearInterval(i)
    }
  }, [cardModified]);

  useEffect(()=>{
    console.log('edit btn was clicked')
  },[editModeActive])



  useEffect(()=>{
    console.log(dataBase, 'database here')
  },[dataBase])



  // function addToQueue(time) {
  //   let newDataBase = { ...dataBase }

  //   newDataBase.queue.push({
  //     ...data[randomQuestion],
  //     index: randomQuestion,
  //     timeLeft: time * 1000,
  //     item: name
  //   })

  //   setDataBase(newDataBase)
  // }

  // setTimeout(()=>{
  //   setShow(false)
  //   console.log('set show set to fale')
  // },800)

  useEffect(() => {
    let timeLeft: ReturnType<typeof setInterval>
    // https://stackoverflow.com/questions/51376589/typescript-what-type-is-f-e-setinterval
    
    if (show) { 
      // timeLeft = setInterval(() => {
        // dataBase.queue.forEach((item, index) => {
        //   if (dataBase.queue[index].timeLeft >= 1000) {
        //     dataBase.queue[index].timeLeft -= 1000
        //   } else {
        //     dataBase.queue[index].timeLeft = 0
        //   }
        //     // })
      // }, 1000);
      // })
      //everything  here will be returned when components unmounts
     // setTimer(timeLeft);
      setShowProgressDiagram(false);
    } else {
      // clearInterval(timer);
     // setShowProgressDiagram(true); deactivated because always shown on front page
    }
    // return function () {clearInterval(timeLeft)}
    // eslint-disable-next-line
  }, [show]);



  return (
    <>
      <OpenDeckBtn 
          data={data}
          generateRandom={generateRandom}
          paused={paused}
          setScrollbarVisible={setScrollbarVisible}
      />      
      {
        data?.length > 0 &&
       !paused &&  //not able to open Deck when in paused Mode
      (
        <BasicOrangeWindow
          deckFinished={deckFinished}
          index={index}
          questionViewActive
          questionAnswerWindow
          show={show}
          setShow={setShow}
          generateRandom={generateRandom}
          setScrollbarVisible={setScrollbarVisible}
          setEditModeActive={setEditModeActive}
          title={`Deck: ${name}`}
          showFromParent={threeDotsMenuOpen}
          menu={
            !dataBase?.DeckNames[index]?.pauseMode &&
              <ThreeDotsBtn
                text={'card'}
                editModeActive={editModeActive}
                setEditModeActive={setEditModeActive}
                className='deck__threeDotsInQuestAnsw posAbsolute'
                threeDotsContainer={{position: 'default'}}
                paused={paused}
                setShowFromParent={setThreeDotsMenuOpen}
                index={index}
                edit
                questionAnswerWindow
                pause
                style={{
                    position: 'absolute',
                    top: '0px',
                    border: '1px solid black',
                    left: '310px',
                    zIndex: '99'
                }}
                trash
                classValue='deck__threeDotsOpen'
                type='card'
                editEvent={editHandler}
                pauseEvent={pauseEventHandler}
                trashEvent={trashHandler}
              />
          }
        >
        <div >
          {editModeActive && 
            <div className='mt-10px ml-20px align-center posRelative'>
               <img alt="edit" src={editimg} /> 
              <span className='ml-3px'>mode</span>
            </div>
          }
          {data[randomQuestion] && (
            <>
              <QuestionAnswerForm 
                card={card}
                editModeActive={editModeActive}
                changeHandler={changeHandler}
              />
              {showAnswerBtn && 
               !dataBase?.DeckNames[index]?.pauseMode && 

               <Button
                  variant="secondary"
                  className='p-1 deck__showAnswer mt-20px my-5 justify-center-align-center cursorPointer'
                  onClick={showAnswerHandler}
                >
                  Show answer
                </Button> 
              }
              {
               dataBase?.DeckNames[index]?.pauseMode &&

              <PauseModeHandler
                generateRandom={generateRandom}
                index={index}
                randomQuestion={randomQuestion}
              />
              } 
               {showRepeatBtn && 
               !dataBase.DeckNames[index].pauseMode &&
               !deckFinished &&
                <RepeatButtons 
                  setShowAnswerBtn={setShowAnswerBtn}
                  setShowRepeatBtn={setShowRepeatBtn}
                  generateRandom={generateRandom}
                />
              } 
              { deckFinished &&
                <div className='bs-5 height50px mt-20px justify-center-align-center'>
                <Alert variant="success">
                  You finished the deck!
                </Alert>
                </div>
              }
              {cardModified && 
                <CardModified/>
              }
              {!showAnswerBtn && 
                <QuestionAnswerForm 
                  answer
                  card={card}
                  editModeActive={editModeActive}
                  changeHandler={changeHandler}
                />
              }
              {editModeActive && 
                  <SaveAndDiscard
                    discardEvent={discardHandler}
                    generateRandom={generateRandom}
                    refresh={refreshHandler}
                    saveEvent={saveHandler}
                    setCardModified={setCardModified}
                    setShowThreeDots={setShowThreeDots}
                  />
              }
              {trash && 
               showDeleteWindow && 
                <DeleteCardQuestionBox
                  card='card'
                  pauseOrDelete={`${pauseOrDeleteText ? 'Pause':'Delete'}`}
                  randomQuestion={randomQuestion}
                  // show={show}
                  index={index}
                  // editModeActive={editModeActive}
                  setEditModeActive={setEditModeActive}
                  trashEvent={deleteCurrentCard}
                  showDeleteWindow={showDeleteWindow}
                  deleteWindow={() => {setShowDeleteWindow(false); setShowThreeDots(true)}}
                  pauseCardinQuestionAnswer
                  // setPauseOrDeleteText={setPauseOrDeleteText}
                />
              }
            </>
          )}
          </div>
        </BasicOrangeWindow>
      )}
    </>
  );
}
