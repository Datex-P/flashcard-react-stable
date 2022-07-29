import { useContext}  from 'react';
import { Context } from '../../../../../context/Context';

export const ThisDeckLogic = ({index}) => {

  const { 
    apiURL, 
    dataBase, setDataBase, 
    email, 
    nameOfTopDeck,
    showThreeDots, setShowThreeDots
} = useContext(Context);

const handlePause = async()=> {

    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = false;
    setDataBase(newDataBase);
    setShowThreeDots(!showThreeDots) //three dots get hidden commented out for now

    let deckName = nameOfTopDeck

    await fetch(`${apiURL}/pause_deck`, {
      method:"POST",
      headers: {
        "Access-Control-Allow-Origin": "*",     
        "Content-Type":"application/json",
      },
        body: JSON.stringify({
        email:email,
        deckName:deckName
        })
      });
  }
  return {handlePause}
}


