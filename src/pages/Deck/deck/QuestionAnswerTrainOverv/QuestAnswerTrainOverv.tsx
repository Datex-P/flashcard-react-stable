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

export default function QuestAnswerTrainOverv({
        setScrollbarVisible,
        pauseIsActive, setPauseIsActive,
        data,
        index, //the index of the deck that is currently open
        name,
        paused,
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
  },[editModeActive])

  async function generateRandom() {
    let newRandomQuestion : number|null = null;
    //type null cannot be used as index type
    //https://stackoverflow.com/questions/46043087/type-null-cannot-be-used-as-an-index-type
    
    if (dataBase.DeckNames[index].pauseMode) {
      //pause mode is activated when the switch is pressed and cards are paused
      if (data.filter((item) => item.paused === true).length > 0) {
        data = data.filter((item) => item.paused === true);
       // console.log(data, 'data in generate random here')
      }
    }
    if (data?.length === 0) { //triggers in case all cards inside deck are paused
      alert('add questions to deck');
    } else {
      if (dataBase?.queue[0] && dataBase?.queue[0]?.timeLeft === 0) {
        //need to have algorithm to filter s in queue related onlz for this deck
        //also not tot forget add decremental time algorith for all crads no matter waht deck
        newRandomQuestion = dataBase.queue.shift().index;
      } else {
        newRandomQuestion = Math.floor(Math.random() * data.length);
         console.log(newRandomQuestion, "randomQuestion");
        let newDataBase = { ...dataBase };
      
         if(dataBase.DeckNames[index].data.filter(x=> x?.openHistory?.length ===0).length ===0) { //checks whether there are cards that were not opened in specific time frame
           alert('no more cards to study')
           setDeckFinished(true)
           setShow(false)
         }
        //   setShowRepeatBtn(false)    //=>unsure why stackcallsize exceeded
        //   debugger
        //   setTimeout(()=>{
        //     debugger
        //     setDeckFinished(false)
        //     setShowRepeatBtn(true)
        //     // setShow(false)
        //   },[8000])
        //   //set deck completed to true ==> thisDeckCompleted
        //   //might have to check for paused cards
        // }

       // dataBase.DeckNames[index].data.filter(x=>)

        if (!newDataBase.DeckNames[index].data[newRandomQuestion]?.openHistory) {
          //if card was not opend before  a new array is made
          newDataBase.DeckNames[index].data[newRandomQuestion].openHistory = [];
        }
        newDataBase.DeckNames[index].data[newRandomQuestion].openHistory.push(new Date());
        setDataBase(newDataBase);
        console.log('open history call gets invoked')
       // let deckName= 
         await fetch(`${apiURL}/open_history`, {
          method:"POST",
          headers: {
             "Access-Control-Allow-Origin": "*",     
            "Content-Type":"application/json",
          },
            body: JSON.stringify({
             email:email,
             deckName:dataBase.DeckNames[index].name,
             newRandomQuestion:newRandomQuestion
            })
          });

      }
      if(newRandomQuestion === randomQuestion && dataBase?.DeckNames[index].data.length !== 1){
        generateRandom()
      } else {
        setRandomQuestion(newRandomQuestion);
        setCard(data[newRandomQuestion===null?-1:newRandomQuestion]);
        setShow(true);
      }    
    }
  }

  useEffect(()=>{
    console.log(dataBase, 'database here')
  },[dataBase])

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
      setTimer(timeLeft);
      setShowProgressDiagram(false);
    } else {
      // clearInterval(timer);
     // setShowProgressDiagram(true); deactivated because always shown on front page
    }
    // return function () {clearInterval(timeLeft)}
    // eslint-disable-next-line
  }, [show]);

  async function deleteCurrentCard() {
    try{
      let deckName = nameOfTopDeck
       await fetch(`${apiURL}/delete_current_card`, {
        method:"POST",
        headers: {
           "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
           email:email,
           deckName:deckName,
           index:index,
           randomQuestion:randomQuestion
          })
        });
    } catch (error) {
      console.log(error, 'error here')
    }
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
