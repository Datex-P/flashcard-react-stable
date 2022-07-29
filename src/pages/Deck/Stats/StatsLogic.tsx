import {useContext} from "react";
import { Context } from '../../../context/Context';
import './stats.css'



export const StatsLogic = ({history, setShowDeleteFrame}) => {

  const { 
    dataBase, setDataBase, 
    setShowProgressDiagram, 
    setThreeDotsOpen } = useContext(Context);
  

    function setShowFunc() {
      history.push('/main');
      setShowProgressDiagram(true);
    }


  function deleteWindowHandler() {
    setShowDeleteFrame(false); 
    setThreeDotsOpen(false)
  }

  function trashEventHandler() {
      let DeckNames = [...dataBase.DeckNames]
      DeckNames.forEach(deckItem=>
        deckItem.data.forEach(item => item?.openHistory&&delete item?.openHistory)
      )
      setDataBase({...dataBase,DeckNames})
  }
  
  return {
    deleteWindowHandler,
    setShowFunc,
    trashEventHandler
  }
}