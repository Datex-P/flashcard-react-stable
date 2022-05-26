import {useEffect} from 'react'

export default function DeckOrCardName({ 
          bg, 
          editButtonClicked, 
          input, 
          name, 
          nameOfTopDeck, setNameOfTopDeck,
          setDeckNameLengthRight, 
          setThreeDotsMenuOpen,
          setNameTooLongOrShort,
          setThreeDotsOpen
        }) {

  function handleChangeName(e){

    if (e.target.value.length >3 && e.target.value.length <12) {    
     setDeckNameLengthRight(true)
     setThreeDotsMenuOpen(true)
     setNameTooLongOrShort(false) 
     setThreeDotsOpen(true)   
    } else {
      setNameTooLongOrShort(true)
      setDeckNameLengthRight(false)
    }
      setNameOfTopDeck(e.target.value);
  }

  useEffect(()=>{
    console.log('deck name length changed')
  },[setDeckNameLengthRight])
 

  return (
    <>
    {editButtonClicked?
      (
    <div 
        className='deck__deckOrCardName justify-center posRelative'
        style={{background: bg}}
    >
      {name}
         
    </div>
      ):(
        <input
            ref={input}
            className="deck__addToDeckInput"
            value={nameOfTopDeck}
            onChange={handleChangeName}
        />
      )
    }
    </>
  )
}
