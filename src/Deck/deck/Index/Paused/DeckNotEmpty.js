import React, { useContext } from "react";
import { Context } from "../../../../Context";

export default function DeckNotEmpty({ index, paused, style }) {
  const { dataBase, setDataBase } = useContext(Context);

  function handleToStudy(e) {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].toStudyValue = e.target.value;
    setDataBase(newDataBase);
  }

  return (
    <div
      className='deck__container align-center'
      style={{ opacity: paused ? "0" : "1" }}
    >
      To Study:
      <input
        type='number'
        className='deck__container_input'
        style={{ background: paused ? style.background : "none" }}
        value={dataBase.DeckNames[index].toStudyValue || 0}
        onChange={handleToStudy}
        min='1'
        max={
          dataBase.DeckNames[index].data.length -
            dataBase.DeckNames[index].data.filter((x) => x.paused === true)
              .length || 0
        }
      />
    </div>
  );
}
