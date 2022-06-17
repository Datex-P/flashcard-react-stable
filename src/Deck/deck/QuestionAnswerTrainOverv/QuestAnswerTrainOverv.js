import React, { useState, useContext, useEffect} from "react";
import { Context } from "../../../Context";
import { Button} from "react-bootstrap";
import editimg from "../../../icons/edit.svg";
import CardModified from './CardModified'
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import BasicOrangeWindow from "../BasicOrangeWindow/BasicOrangeWindow";
import DeleteCardQuestionBox from "../DeleteCardQuestionBox/DeleteCardQuestionBox";
import SaveAndDiscard from "./SaveAndDiscard";
import RepeatButtons from "./RepeatButtons";
import PauseModeHandler from './PauseModeHandler'
import OpenDeckBtn from './OpenDeckBtn';
import QuestionAnswerForm from './QuestionAnswerForm'
import '../deck.css'

export default function QuestAnswerTrainOverv({
        setDecksAreVisible,
        setScrollbarVisible,
        pauseIsActive, setPauseIsActive,
        data,
        index,
        name,
        paused,
    }) {

  const [editModeActive, setEditModeActive] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [cardModified, setCardModified] = useState(false);
  const [pauseOrDeleteText, setPauseOrDeleteText] = useState(true);
  const [show, setShow] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(true);
  const [timer, setTimer] = useState(null);
  const [trash, setTrash] = useState(false);
  const [deckLengthNotZero, setDeckLengthNotZero] = useState(true);
  const [card, setCard] = useState({ answer: "", question: "" });
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  const [showAnswerBtn, setShowAnswerBtn] = useState(true); //button in questionAnswerTrainOverView with that name
  const [showRepeatBtn, setShowRepeatBtn] = useState(false); //repeatbtn that is shown in questionanswertrain file

  const {
    dataBase, setDataBase, 
    setShowProgressDiagram,
     setShowThreeDots,
    } = useContext(Context);


  useEffect(()=>{
    console.log(showDeleteWindow, 'show delete window')
    console.log(trash, 'trash')
  },[showDeleteWindow, trash])

  function handlePause() {
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)
    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    setDataBase(newDataBase)
  }

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
   // debugger
  },[editModeActive])

  function generateRandom() {
    let newRandomQuestion = null;
    if (dataBase.DeckNames[index].pauseMode) {
      //pause mode is activated when the switch is pressed and cards are paused
      if (data.filter((item) => item.paused === true).length > 0) {
        data = data.filter((item) => item.paused === true);
      }
    }
    if (data.length === 0) {
      alert('add questions to deck');
      setDeckLengthNotZero(false);
    } else {
      setDeckLengthNotZero(true);
      if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
        //need to have algorithm to filter s in queue related onlz for this deck
        //also not tot forget add decremental time algorith for all crads no matter waht deck
        newRandomQuestion = dataBase.queue.shift().index;
      } else {
        newRandomQuestion = Math.floor(Math.random() * data.length);
        // console.log(randomQuestion, "randomQuestion");
        let newDataBase = { ...dataBase };

        if (!newDataBase.DeckNames[index].data[newRandomQuestion]?.openHistory) {
          //if card was not opend before  a new array is made
          newDataBase.DeckNames[index].data[newRandomQuestion].openHistory = [];
        }
        newDataBase.DeckNames[index].data[newRandomQuestion].openHistory.push(
       new Date()
        );
        setDataBase(newDataBase);
      }
      if(newRandomQuestion === randomQuestion){
        generateRandom()
      } else {
        setRandomQuestion(newRandomQuestion);
        setCard(data[newRandomQuestion]);
        setShow(true);
      }    
    }
  }

  function saveHandler() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].data[randomQuestion] = card;
    setDataBase(newDataBase);
  }

  function showAnswerHandler() {
    setShowAnswerBtn(false);
    setShowRepeatBtn(true);
  }

  function discardHandler() {
    setCard(data[randomQuestion]);  
  }

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

  useEffect(() => {
    let timeLeft=null
    if (show) {
      timeLeft = setInterval(() => {
        // dataBase.queue.forEach((item, index) => {
        //   if (dataBase.queue[index].timeLeft >= 1000) {
        //     dataBase.queue[index].timeLeft -= 1000
        //   } else {
        //     dataBase.queue[index].timeLeft = 0
        //   }
        //     // })
      }, 1000);
      // })
      //everything  here will be returned when components unmounts
      setTimer(timeLeft);
      setShowProgressDiagram(false);
    } else {
      clearInterval(timer);
      setShowProgressDiagram(true);
    }
    return function () {clearInterval(timeLeft)}
    // eslint-disable-next-line
  }, [show]);

  function deleteCurrentCard() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].data.splice(randomQuestion, 1);
    setDataBase(newDataBase);
    generateRandom();
  }

  function editModeAct() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].editModeActive = false;
    setDataBase(newDataBase);
  }

  function refreshHandler() {
    setShowAnswerBtn(true);
    setEditModeActive(false);
    editModeAct();
  }

  function changeHandler(e) {
    let { name, value } = e.target;
    setCard({ ...card, [name]: value });
  }

  function editHandler () {
      setShowAnswerBtn(false);
      setEditModeActive(true);
      setShowThreeDots(false); //three dots are not displayed in edit Mode
      setShowRepeatBtn(false);
      let newDataBase = { ...dataBase };
      newDataBase.DeckNames[index].editModeActive = true;
      setDataBase(newDataBase);
  }

  function trashHandler () {  
    setTrash(true);
    setPauseOrDeleteText(false);
    setShowDeleteWindow(true);
    setShowAnswerBtn(true);
  }

  function pauseEventHandler () {
  // handlePause();
    setTrash(true);
    setShowDeleteWindow(true);
    console.log('pause event triggered')
  }

  return (
    <>
      <OpenDeckBtn 
          data={data}
          generateRandom={generateRandom}
          paused={paused}
          setDecksAreVisible={setDecksAreVisible}
          setScrollbarVisible={setScrollbarVisible}
      />      
      {deckLengthNotZero && !paused && (
        <BasicOrangeWindow
          questionViewActive
          questionAnswerWindow
          show={show}
          setShow={setShow}
          generateRandom={generateRandom}
          index={index}
          setScrollbarVisible={setScrollbarVisible}
          id='questionAnswerOverview'
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
            <div className='ml-20px align-center posRelative'>
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
                <RepeatButtons 
                  showAnswerBtn={showAnswerBtn}
                  setShowAnswerBtn={setShowAnswerBtn}
                  setShowRepeatBtn={setShowRepeatBtn}
                  generateRandom={generateRandom}
                />
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
                    generateRandom={generateRandom}
                    setCardModified={setCardModified}
                    cardModified={cardModified}
                    saveEvent={saveHandler}
                    discardEvent={discardHandler}
                    refresh={refreshHandler}
                    setShowThreeDots={setShowThreeDots}
                  />
              }
              {trash && 
               showDeleteWindow && 
                <DeleteCardQuestionBox
                  card='card'
                  pauseOrDelete={`${pauseOrDeleteText ? 'Pause':'Delete'}`}
                  randomQuestion={randomQuestion}
                  show={show}
                  index={index}
                  editModeActive={editModeActive}
                  setEditModeActive={setEditModeActive}
                  trashEvent={deleteCurrentCard}
                  showDeleteWindow={showDeleteWindow}
                  deleteWindow={() => {setShowDeleteWindow(false); setShowThreeDots(true)}}
                  pauseCardinQuestionAnswer
                  setPauseOrDeleteText={setPauseOrDeleteText}
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
