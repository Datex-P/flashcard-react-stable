import React from 'react';
import Unpause from '../../../Stats/Unpause'
import ThisDeckPaused from '../ThisDeckPaused'
import DeckEmpty from './DeckEmpty'
import DeckNotEmpty from './DeckNotEmpty'


function Paused({data, index, paused, name, setShow, style}) {

  return (
    <div className="paused justify-between flex-column">
      {data.length === 0 ? 
          <DeckEmpty setShow={setShow}/>
        : 
          <DeckNotEmpty index={index} paused={paused} style={style}/>
      }
      {paused &&
   
        <ThisDeckPaused index={index}/>
      }
      {name && data.length !== 0 &&
        <div
          className="deck__container align-center"
          style={{ opacity: paused ? "0" : "1" }}
        >
          {"Decksize:".padEnd(10, "⠀")} {data.length}
        </div>
      }
  </div>
  )
}

export default Paused






