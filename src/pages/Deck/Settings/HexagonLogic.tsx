import  {  useContext} from 'react';
import { Context } from '../../../context/Context'
import hexagonWhite from '../../../icons/hexagon.svg'
import hexagonGreen from '../../../icons/hexagonGreen.svg'

export const HexagonLogic = ({  
  idx, 
  setEditHex, 
  setWeeklyGoal,
  weeklyTargetHandler}) => {
  
  const { dataBase, setDataBase} = useContext(Context)

  function indexHandler() {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences.days = idx
    setWeeklyGoal(idx)
    setDataBase(newDataBase)
   // setShowDay(true) =>unsure if needed
  }

  function srcHandler () {
    return idx <= dataBase?.userPreferences?.days ? 
    hexagonGreen : hexagonWhite
  }

  function clickHandler () {
    weeklyTargetHandler() 
    setEditHex(true)
  }
  
  return {
    clickHandler, srcHandler, indexHandler
  }
}