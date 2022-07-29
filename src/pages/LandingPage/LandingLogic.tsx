import { useContext } from "react";
import { Context } from '../../context/Context';
import './landingpage.css'

export const LandingLogic = ({
  setDecksAreVisible,
  setAddNewDeckWindow
}) => {

  const {
    active,
    setArrowDown, //'create first deck' arrow when no deck is present
    colors, //colors array for the decks
    editButtonClicked,
    setHideCreateDeckBtn,
    setShowProgressDiagram,
  } = useContext(Context);

  function colorHandler() {
    colors.map((i, k, ar) => {
      if (active === k) {
        return ar[ar.length % (k || 1)];
      } else {
        return i;
      }
    })
  }

  function createDeckHandler() {
    if (editButtonClicked) { //input field in deckorcardname.js is not active
          setAddNewDeckWindow(true); //open the pop up to add a new deck
          setDecksAreVisible(false); // all the decks in the back are not visible
          setShowProgressDiagram(false);
          setArrowDown(false); //create new deck and arrow down not visible
          setHideCreateDeckBtn(true) //the button create Deck gets hidden
  }
}

  function closeHandler() {
    setDecksAreVisible(true);
    setAddNewDeckWindow(false);
    setShowProgressDiagram(true); //diagram on main page is shown again
    setHideCreateDeckBtn(false) //button create deck is shown again
  }
  return { closeHandler, createDeckHandler, colorHandler}
}