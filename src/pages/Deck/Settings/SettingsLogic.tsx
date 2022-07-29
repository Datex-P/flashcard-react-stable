import  { useContext } from 'react';
import { Context } from '../../../context/Context'

export const SettingsLogic = ({
  editModeActive, setEditModeActive,
  editRepActive, setEditRepActive,
  editHex, setEditHex,
  history,
  userTimePreferences,
  weeklyGoal
}) => {

  const { apiURL, dataBase, setDataBase, setShowProgressDiagram, user } = useContext(Context)
    
  function setShow() {
    history.push('/main')
    setShowProgressDiagram(true)
  }

  function saveTimeNumberChanges() {
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences = userTimePreferences
    setDataBase(newDataBase)
  }

  function goalHandler() {
    setEditHex(!editHex)
  }

  async function weeklyTargetHandler() {
    let weeklyTarget:number = weeklyGoal || 0
    try{
     await fetch(`${apiURL}/update_weekly_target`, {
       method:'POST',
       headers: {
         "Content-Type":"application/json",
         "Accept":"application/json"
       },
         body: JSON.stringify({
           weeklyTarget:weeklyTarget+1,
           user:user
         })
       });
      //better to store color in localstorage
    //  setEditHex(true) not needed in settings
   } catch (err){
     console.log(err, 'err here')
   }
 }

  function repetitionHandler(){
    setEditModeActive(!editModeActive)
    setEditRepActive(!editRepActive)
    saveTimeNumberChanges()
  }
  return {
    goalHandler, 
    repetitionHandler, 
    setShow,
    weeklyTargetHandler
  }
}