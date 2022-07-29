import React, { useContext } from 'react';
import { Context } from '../../../../context/Context';

export default function ShowMessage({showMessageAgain}) {
 
  const { dataBase, setDataBase } = useContext(Context);

  function handleCheckbox() {
    setDataBase({ ...dataBase, checkboxClicked: true });
  }

  return (
    <>
      {!showMessageAgain && (
        <div className='deck__deleteCardQuestionBox__showMessageAgain justify-center'>
          <div className='width40px'>
            <input
              className='width45px'
              type='checkbox'
              onChange={handleCheckbox}
            />
          </div>
          <div className='deck__deleteCardQuestionBox__dontShowMessageAgain'>
            Don't show message again
          </div>
        </div>
      )}
    </>
  );
}
