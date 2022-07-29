import { useContext, useEffect } from "react";
import { Context } from "../../../../context/Context";
import "../../../../styles.scss";


export const IndexLogic = ({
  deck,
  index,
  setArrowDown,
  setDecksAreVisible,
 }) => {
  const {  name} = deck;


  const {
    active, setActive,
    dataBase, setDataBase,
    setNameOfTopDeck
  } = useContext(Context);

  useEffect(()=>{
    setNameOfTopDeck(name)
  },[])

  useEffect(()=>{
    console.log(index, 'index in use effect')
  },[index])

  //const [index, setIndex] = useState(0);

  /*  useEffect(() => {
      let cIndex = dataBase.DeckNames.findIndex((item) => item.name === name);
      setIndex(cIndex);
      //console.log(cIndex)
      // eslint-disable-next-line
    }, [trigger]);*/


  function handlePause(index) {
    let newDataBase = { ...dataBase };
    console.log(index, 'index in handle pause index.js')
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);

  }



  useEffect(() => {
    setNameOfTopDeck(name);
    console.log(name);
  }, [name]);

  function deleteDeck() {
    let newDataBase = { ...dataBase };
    //newDataBase.DeckNames[index].deleted = true; //index where delete starts second para is delete count

    newDataBase.DeckNames.splice(index, 1)

    if (newDataBase.DeckNames.filter(item => !item.deleted).length === 0) {
      setDecksAreVisible(false);
      setArrowDown(true);
    } else {

      setDataBase(newDataBase);

      if (index === 0) {
        setActive(1);
      } else {
        setActive(active - 1);
      }
    }
  }

  return {deleteDeck, handlePause}
}