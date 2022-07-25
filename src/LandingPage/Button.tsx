import React, {useContext, forwardRef} from "react";
import {Context} from '../Context'; 

interface Props{
    addDeckHandler:()=>void;
    closeHandler:()=>void;
    setInputField:(e:string)=>void;
   // setArrowDown, 
    setHideCreateDeckBtn:(e:boolean)=>void;
    setNameTooShortOrLong:(e:boolean)=>void;
    setScrollbarVisible:(e:boolean)=>void;
  ok?:boolean
}
// https://www.carlrippon.com/react-forwardref-typescript/
const Button = forwardRef<HTMLButtonElement, Props>((
 props,
 okRef
)=> {
console.log(props, 'props in button')
const {dataBase, setDataBase, setArrowDown} = useContext(Context);

let {addDeckHandler, 
    closeHandler, 
    setInputField, 
   // setArrowDown, 
    setHideCreateDeckBtn,
    setNameTooShortOrLong, setScrollbarVisible} = props


   function addNewDeckName() {
    let newDataBase = { ...dataBase };

   // const data =  await response.json()
    // let index = newDataBase.DeckNames.push({
    //   name: inputField,
    //   data: [],
    //   cardsToday: 0,
    //   color: colors[Object.keys(dataBase?.DeckNames).length % colors?.length],
    //   paused: false,
    //   thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
    //   skipPausedCards: 0,
    //   pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
    //   editModeActive: false, //when editModeActive is true, pause switch can t be clicked
    // });

    if (
      dataBase?.DeckNames?.length === 1 ||
      dataBase?.DeckNames?.length === 0
    ) {
      setScrollbarVisible(false); //scrollbar on the side is not visible when zero or only one deck on the stack
    } else {
      setScrollbarVisible(true);
    }
   // setActive(index - 1);
    setInputField("");
    setDataBase(newDataBase);
   // close(); not sure if needed
  }

  function cancelHandler () {
    closeHandler();
    setInputField('');
    setHideCreateDeckBtn(false)
    setNameTooShortOrLong(false)
  
    if (dataBase?.DeckNames?.length === 0) {     
        setArrowDown(true);
        // setDecksAreVisible(false); 
    }
 //   debugger
  }

  // async function okHandler(){
  //   try{
  //     let req = await fetch('http://localhost:4000/generate_deck', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         deckname: inputField,
  //         username: user
  //       })
  //     }
  //   ) 
  //   let res = await req.json()
  //   if(res.status==='deck-created'){
  //     setHideCreateDeckBtn(false)
  //     setNameTooShortOrLong(false)
  //     addNewDeckName()
  //     closeHandler()
  //   }
  //   } catch(error) {
  //     console.log(error, 'error here')
  //   } 
  // }

  return (
      props.ok? (
      <button
        className='landing__okCancelButton'
        key={'Ok'}
        onClick={addDeckHandler}
        ref={okRef}
      >
        Ok
      </button>
      )
      :
      ( 
      <button
        className='landing__okCancelButton'
        key={'Cancel'}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      )
  )
})

export default Button