import React, {useState,useContext,useRef,useEffect} from 'react'
import { Card} from 'react-bootstrap'
import {Context} from '../../Context'
import ThreeDotsBtn from './ThreeDotsBtn'
import AddQuestionsToDeck from './AddQuestionsToDeck'
import QuestAnswerTrainOverv from './QuestAnswerTrainOverv'
import DeckOrCardName from  './DeckOrCardName'
import DeleteCardQuestionBox from  './DeleteCardQuestionBox';
import Paused from './Paused'
import AddQuestions from './AddQuestions'




export default function Deck({ deck, checked, setChecked,
                               active, setActive, title, bg, 
                              pauseIsActive, setPauseIsActive, trigger, 
                              changeDeckName,
                              setChangeDeckNameOpen,
                              editButtonClicked,
                              setEditButtonClicked,
                              createDeckButtonIsVisible,
                              setCreateDeckButtonIsVisible,
                              ...style }) {
     
    
  let { data, paused, name }  = deck
  
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  
  const [showDeleteWindow, setShowDeleteWindow] = useState(true); //if true and triggered the delete window with yes and no button is shown
  const [trash, setTrash] = useState(false);
  const { dataBase, setDataBase} = useContext(Context)
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    let cIndex = dataBase.DeckNames.findIndex(item=>item.name === name)
    setIndex(cIndex)
    //console.log(cIndex)
    // eslint-disable-next-line 
  },[trigger])

  useEffect(()=>{
    setChangeDeckNameOpen(!editButtonClicked) //when input field of deck name is open it is set to false
  },[editButtonClicked])
  
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
  
  let input  = useRef(null)

  function handlePause () {
    console.log(index)
    let newDataBase = {...dataBase}
  
    newDataBase.DeckNames[index].paused = !paused;
    console.log(newDataBase.DeckNames)
    setDataBase(newDataBase)    
    // setShow(false) why does  three button window not close with this?
  }

  
  useEffect(()=>{
    setNameOfTopDeck(name)
    console.log(name)
  },[name])

  function deleteDeck(){
    let newDataBase = {...dataBase}
    newDataBase.DeckNames.splice(index,1);
    setDataBase(newDataBase)
    setActive(1)
  }

  function handleInput(e) {
    if (e.target.value.length>25) {
                        
      alert('Deckname can not be longer than 25 characters')
    } else {
      // if (!dataBase.DeckNames[index].paused) {                      
        setNameOfTopDeck(e.target.value)}
        // }
    }

 
  function handleActive(i){
    setActive(i)
    let newDataBase = {...dataBase}
    newDataBase.active = i
    setDataBase(newDataBase)
  }

  
  return (

    <Card 
        style={style} 
        className='newDeckContainer flexColumn position-absolute '
    >
      <Card.Body className='justify-center-align-center flex-column'
      >

        <Card.Title 
            className='justify-between-align-center position-relative'
            style={{width:'126px', left: '-5px', top: '-12px'}}
        >
        {
         editButtonClicked?

            <DeckOrCardName 
                bg={bg}
                index={index}
                paused={paused}
                data={data}
                name= {name}
                active={active}
                setActive={setActive}
                className='deckOrCardNameStyling'
            />
               :        
            <input 
                  ref = {input} 
                  className= 'addToDeckInput'
                  style={{top: data.length === 0? '-69px': 'default'}}
                  value = {nameOfTopDeck}
                  onChange={(e)=>{handleInput(e)}}
            />

         }
          <ThreeDotsBtn
              name={name}
              text={'deck'}
              data={data}
              showFromParent={threeDotsMenuOpen}
              editButtonClicked={editButtonClicked}
              setEditButtonClicked={setEditButtonClicked}
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              paused={paused}
              bg={style.background} 
              nameOfTopDeck={nameOfTopDeck}
              setNameOfTopDeck={setNameOfTopDeck}
              edit={!paused} 
              pause 
              trash={!paused}
              input={input}
              threeDotsContainer= {{position: 'fixed', right: '50px', top: '18px'}}
              className='threeDotsBtnIndex'
              style= {{border: paused? 'none': '1px solid black',
                      backgroundColor: paused? 'black': 'white'
                      }}
       
              editEvent={() => {
                setThreeDotsMenuOpen(false)
                setEditButtonClicked(!editButtonClicked)
              }}

              trashEvent={
                dataBase.checkboxClicked
                    ?
                    () => {
                      deleteDeck()
                      handleActive(index-1)
                    }
                    :
                    () => {
                      setTrash(true)
                      setShowDeleteWindow(true)
                    }
              }
            />
            {
              trash && showDeleteWindow && !paused &&

                <DeleteCardQuestionBox
                  card='deck'
                  threeDotsMenuOpen={threeDotsMenuOpen}
                  index={index}
                  setIndex={setIndex}
                  deleteWindow={() => setShowDeleteWindow(false)}
                  trashEvent={()=>{

                  deleteDeck()
                  handleActive(index-1)}
                  }
                  showDeleteWindow={showDeleteWindow}
                />
            }

        </Card.Title>

        <div className='mb-3  flex-column justify-between'   //container for the decksize and cards thing
            style= {{height: '256px', position: 'relative', top: '-17px'}}
        >

           {
            data.length === 0?
              
            <AddQuestions/>
              :
              <Paused paused={paused}/>
          } 
          {
            paused &&
          <Paused index={index} handlePause={handlePause}/>
          }
          {
            name && data.length !== 0 &&          
            <div 
                className='divStyling align-center'  
                style={{opacity: paused? '0': '1'}}
            >

                {'Decksize:'.padEnd(10, '⠀')}   {data.length}        
            </div>
          }
      
        </div>

        <QuestAnswerTrainOverv 
            editButtonClicked={editButtonClicked}
            name={name} 
            index={index} 
            data={data} 
            paused={paused} 
            createDeckButtonIsVisible={createDeckButtonIsVisible}
            setCreateDeckButtonIsVisble={setCreateDeckButtonIsVisible}

        />
        
        {
         Number(active) === 1 &&
         // active || active ??
          
            <AddQuestionsToDeck 
                editButtonClicked={editButtonClicked}
                background={style.background} 
                name= {name} 
                index= {index} 
            />        
        }

      </Card.Body>
    </Card>
  )
}

