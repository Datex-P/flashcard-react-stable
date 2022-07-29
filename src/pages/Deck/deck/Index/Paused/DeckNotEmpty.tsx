import React, { useContext, useState } from "react";
import { Context } from '../../../../../context/Context';

export default function DeckNotEmpty({ data, index, paused, style}) {

  const { dataBase, setDataBase } = useContext(Context);
  const [valueTooBig, setValueTooBig] = useState(false) //turns true when input is too high

  /* 
  Deck Length is calculated like => decksize 20 paused 3 = decklength 17
  in case input is too big, show warning
  otherwise adjust input field accordingly in else condition
  */

  function handleToStudy(e) {
    if (e.target.value >
      (dataBase.DeckNames[index].data.length -
        dataBase.DeckNames[index].data.filter((x) => x.paused === true)
          .length || 0)
    ) {
      setValueTooBig(true)
      setTimeout(() => { setValueTooBig(false) }, 2000)
    } else {
      let newDataBase = { ...dataBase };
      newDataBase.DeckNames[index].toStudyValue = e.target.value;
      setDataBase(newDataBase);
    }
  }


  return (
    <div>
      <div
        className='deck__container align-center'
        style={{ opacity: paused ? '0' : '1' }}
      >
        To Study:
        <input
          type='number'
          className='deck__container_input'
          style={{ background: paused ? style.background : 'none' }}
          value={dataBase.DeckNames[index].toStudyValue || 0}
          onChange={handleToStudy}
          min='1'
          max={
            dataBase?.DeckNames[index].data?.length -
            dataBase?.DeckNames[index].data?.filter((x) => x.paused === true)
              .length || 0
          }
        />
      </div>
      {valueTooBig &&
      <div className='deck__valueTooBig posAbsolute'>too high</div>
      }
      <div
        className='deck__container align-center'
        style={{ opacity: paused ? '0' : '1' }}
      >
        {'Decksize:'.padEnd(10, '')} {data.length}
      </div>
    </div>
  );
}
