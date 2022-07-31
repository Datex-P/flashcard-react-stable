
export const QuestionAnswerLogic = ({
  apiURL,
  card, setCard,
  dataBase, setDataBase, 
  email,
  data,
  index,
  pauseIsActive,
  setPauseIsActive,
  randomQuestion,
  nameOfTopDeck,
  setEditModeActive,
  setShowDeleteWindow,    
  setShowAnswerBtn,
  setShowThreeDots,
  setShowRepeatBtn,
  setShow,
  setRandomQuestion,
  setPauseOrDeleteText,
  setTrash,
  }) => {
  
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

    function handlePause() {
      let newDataBase = {...dataBase}
      let savePausedState = !pauseIsActive
      setPauseIsActive(savePausedState)
      dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
      setDataBase(newDataBase)
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
            // alert('no more cards to study') deactivated for the moment
           //  setDeckFinished(true)
            // setShow(false)
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
  
  return {
    changeHandler,
    deleteCurrentCard,
    discardHandler, 
    editHandler,
    generateRandom,
    handlePause, 
    refreshHandler,
    pauseEventHandler,
    showAnswerHandler, 
    saveHandler,
    trashHandler
  }
}