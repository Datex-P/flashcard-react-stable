import  { useContext, useEffect } from 'react';
import { Context } from '../../../../context/Context'


export const InputLogic = ({
  index, 
  setShowAnswerBtn, 
  generateRandom 
})=>{

  const { dataBase, setDataBase } = useContext(Context)
  let newDataBase = {...dataBase}  

  


  function cardsPaused() {
    debugger
    //dataBase.DeckNames[item].data.filter(x => x.pause === true).length || 0

    return dataBase.DeckNames[index].data.filter(x => x.paused === true).length 
  }

  useEffect(()=>{
    debugger
    console.log(index, 'index here')
  },[index])

    // https://bobbyhadz.com/blog/typescript-property-checked-not-exist-on-type-htmlelement#:~:text=The%20error%20%22Property%20'checked',This%20is%20the%20index.
      //Type assertions are used when we have information about the type of a value that TypeScript can't know about.
 
  function handleChecked (e) {
    let element =  document.getElementById('mydeck__onOffSwitch') as HTMLInputElement | null
    if(dataBase.DeckNames[index].editModeActive && element) {
    element.checked = false
    }
  }

  function switchOnOrOff () {
    if(!dataBase?.DeckNames[index]?.editModeActive) {

      let element =  document.querySelector('.deck__onOffSwitch-checkbox') as HTMLInputElement | null
     
      if (dataBase.DeckNames[index].data.filter(x => x.paused === true).length === 0 && element) {
        element.disabled = true
      } else {    
          if (dataBase.DeckNames[index].pauseMode) {
            dataBase.DeckNames[index].pauseMode=false
            setDataBase(newDataBase)
            setShowAnswerBtn(true)    
          }else{
            dataBase.DeckNames[index].pauseMode=true
            setDataBase(newDataBase)
          //  setShowAnswerBtn(false)
            generateRandom()
      }  
    }}
  }


  return {cardsPaused, handleChecked, switchOnOrOff}
}