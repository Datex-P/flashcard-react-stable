/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../../../../context/Context";
import { Card } from "react-bootstrap";
import "../../../../styles.scss";
import NameLongOrShort from './NameLongOrShort'
import ThreeDotsBtn from '../ThreeDotsBtn/ThreeDotsBtn';
import AddQuestionsToDeck from '../AddQuestionsToDeck/AddQuestionsToDeck';
import QuestAnswerTrainOverv from '../QuestionAnswerTrainOverv/QuestAnswerTrainOverv';
import DeckOrCardName from './DeckOrCardName';
import DeleteCardQuestionBox from '../DeleteCardQuestionBox/DeleteCardQuestionBox';
import Paused from './Paused/Paused'
import {IndexLogic} from './IndexLogic'

export default function Deck({
  deck,
  index,
  bg,
  setArrowDown,
  setDecksAreVisible,
  setScrollbarVisible,
  ...style
}) {

  const { data, name, paused } = deck;

  const [show, setShow] = useState(false);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  const [deckNameLengthRight, setDeckNameLengthRight] = useState(true) //deckname length is not too short and not too long
  
  const [showDeleteWindow, setShowDeleteWindow] = useState(true); //if true and triggered the delete window with yes and no button is shown
  const [trash, setTrash] = useState(false);
  const [pauseIsActive, setPauseIsActive] = useState(true);

  const {
    active, 
    dataBase, 
    editButtonClicked, setEditButtonClicked,
    nameTooLongOrShort, setNameTooLongOrShort,
    threeDotsOpen, setThreeDotsOpen,
    setNameOfTopDeck
  } = useContext(Context);

  useEffect(()=>{
    setNameOfTopDeck(name)
  },[])

  useEffect(()=>{
    console.log(index, 'index in use effect')
  },[index])

  const {deleteDeck, handlePause} = IndexLogic({
    deck,
    index,
    setArrowDown,
    setDecksAreVisible
    })

  //const [index, setIndex] = useState(0);

  /*  useEffect(() => {
      let cIndex = dataBase.DeckNames.findIndex((item) => item.name === name);
      setIndex(cIndex);
      //console.log(cIndex)
      // eslint-disable-next-line
    }, [trigger]);*/

  useEffect(() => {
    console.log(showDeleteWindow, 'show delete window')
  }, [showDeleteWindow])

  let input = useRef(null);


  const deckOrCardNameProps = {
    bg: bg,
    editButtonClicked: editButtonClicked,
    name: name,
    input: input,
    setThreeDotsMenuOpen: setThreeDotsMenuOpen,
    setDeckNameLengthRight: setDeckNameLengthRight,
    setNameTooLongOrShort: setNameTooLongOrShort,
    pause: true
  }

  const threeDotsProps = {
    name: name,
    text: "deck",
    data: data,
    showFromParent: threeDotsMenuOpen,
    setShowFromParent: setThreeDotsMenuOpen,
    index: index,
    icons: { paused, edit: !paused, trash: !paused },
    paused: paused,
    setThreeDotsOpen: setThreeDotsOpen,
    threeDotsOpen: threeDotsOpen,
    bg: style.background,
    edit: !paused,
    trash: !paused,
    input: input,
    pause: true,
    threeDotsContainer: {
      position: 'absolute',
      right: '20px',
      top: '18px',
    },
    editEvent: () => {
      setThreeDotsMenuOpen(false);
      setEditButtonClicked(!editButtonClicked);
    },
    pauseEvent: (index) => {
      handlePause(index)
    },
    trashEvent: () => {
      return dataBase.checkboxClicked
        ? () => {
          deleteDeck();
          // handleActive(active - 1);
        }
        : () => {
          setTrash(true);
          setShowDeleteWindow(true);

        }
    }
  }

  return (
    deck && (

      <Card
        style={style}
        className="deck__card_cont flexColumn position-absolute "
      >
        <Card.Body className="justify-center-align-center flex-column mt-48px">
          <NameLongOrShort nameTooLongOrShort={nameTooLongOrShort}/>
          <Card.Title className="deck__index-card-title justify-between-align-center">
            <DeckOrCardName
              data={deckOrCardNameProps}          
            />
            {
              deckNameLengthRight &&
              <ThreeDotsBtn
                name={name}
                text={"deck"}
                data={data}
                showFromParent={threeDotsMenuOpen}
                setShowFromParent={setThreeDotsMenuOpen}
                index={index}
                icons={{ paused, edit: !paused, trash: !paused }}
                paused={paused}
                bg={style.background}
                edit={!paused}
                // data={threeDotsProps}
                pause
                trash={!paused}
                input={input}
                threeDotsContainer={{
                  position: "absolute",
                  right: "20px",
                  top: "18px",
                }}
                className="deck__threeDotsBtnIndex"
                //  data={threeDotsProps}
                style={{
                  border: paused ? "none" : "1px solid black",
                  backgroundColor: paused ? "black" : "white",
                }}
                editEvent={() => {
                //  setThreeDotsMenuOpen(false);
                  setEditButtonClicked(!editButtonClicked);
                }}
                pauseEvent={() => {
                  handlePause(index)
                }}
                trashEvent={
                  dataBase.checkboxClicked
                    ? () => {
                      deleteDeck();
                      // handleActive(active - 1);
                    }
                    : () => {
                      setTrash(true);
                      setShowDeleteWindow(true);
                    }
                }
              />
            }
            {trash && showDeleteWindow && !paused && (
              <DeleteCardQuestionBox
                pauseOrDelete="Delete"
                randomQuestion={()=>{}}
                card="deck"
                index={index}
                deleteWindow={() => {
                  setShowDeleteWindow(false); 
                  setThreeDotsOpen(false) //not sure if needed here
                }}
                trashEvent={() => {
                  deleteDeck();
                  //handleActive(index - 1);
                }}
                showDeleteWindow={showDeleteWindow}
              />
            )}
          </Card.Title>
          <Paused
            data={data}
            index={index}
            setShow={setShow}
            paused={paused}
            style={style}
          />
          <QuestAnswerTrainOverv
            data={data}
            index={index}
            name={name}
            paused={paused}
            setScrollbarVisible={setScrollbarVisible}
            pauseIsActive={pauseIsActive}
            setPauseIsActive={setPauseIsActive}
          />
          {active === index && (
            <AddQuestionsToDeck
              index={index}
              setScrollbarVisible={setScrollbarVisible}
              name={name}
              show={show}
              setShow={setShow}
            />
          )}
        </Card.Body>
      </Card>
    )
  );
}



