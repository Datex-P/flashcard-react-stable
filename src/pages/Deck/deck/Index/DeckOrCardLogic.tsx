/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react'
import { Context } from '../../../../context/Context';

export const DeckOrCardLogic = ({
    editButtonClicked,
    name,
    setDeckNameLengthRight,
    setThreeDotsMenuOpen,
    setNameTooLongOrShort
}) => {

  const {
    dataBase, setDataBase, 
    setThreeDotsOpen, 
    setNameOfTopDeck,
    setStopRedCrossListener
  } = useContext(Context);

  function handleChangeName(e) {
   
    if (e.target.value.length > 3 && e.target.value.length < 12) {
      setDeckNameLengthRight(true)
      setThreeDotsMenuOpen(true)
      setNameTooLongOrShort(false)
      setThreeDotsOpen(true)
    } else {
      setNameTooLongOrShort(true)
      setDeckNameLengthRight(false)
    }

    let newDataBase = {...dataBase}
    let index = newDataBase.DeckNames.findIndex(x=> x.name === name)
    newDataBase.DeckNames[index].name = e.target.value
    setDataBase(newDataBase)
    setNameOfTopDeck(e.target.value);
  }

  useEffect(() => {
    if(!editButtonClicked) {
      setStopRedCrossListener(true)
    }
  }, [editButtonClicked])

return {handleChangeName}

}