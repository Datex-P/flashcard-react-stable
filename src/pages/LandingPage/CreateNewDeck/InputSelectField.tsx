import React, { useContext, forwardRef} from 'react'
import { Context } from '../../../context/Context';

interface Props {
  inputField: string;
  setInputField: (e:number)=>void;
  nameTooShortOrLong: boolean;
  setNameTooShortOrLong: (e:boolean)=>void;
}

const InputSelectField = forwardRef<HTMLInputElement, Props>((props, okRef) =>{
  // https://www.carlrippon.com/react-forwardref-typescript/

  const {dataBase} = useContext(Context);
  let {inputField, setInputField, nameTooShortOrLong, setNameTooShortOrLong} = props

  function onChangeHandler(event) {
    let { target } = event;
  
    if (target) {
      setInputField(event.target.value);
    }

    setTimeout(() => {
      if (event.target.value.length > 3 && event.target.value.length < 11) {
        if (okRef && "current" in okRef && okRef.current) {
          // https://stackoverflow.com/questions/65876809/property-current-does-not-exist-on-type-instance-htmldivelement-null
          okRef.current.disabled = false;
          okRef.current.classList.add("landing__Btn-col");
          setNameTooShortOrLong(false);
        }
        // } else if (okRef.current){ needed for typescript,did not work
      } else {
        setNameTooShortOrLong(true);
        if(okRef && "current" in okRef && okRef.current){
          okRef.current.disabled = true;
          okRef.current.classList.remove("landing__Btn-col");
        }
      }
    }, 800);
  }
  
  return (
    <>
    <input
      id='landing__inputField'
      value={inputField}
      onChange={(event) => {
        onChangeHandler(event);
      }}
      ref={okRef}
  />
  <div className='createNewDeck__too-short-or-long posAbsolute'>
    {`${
      dataBase?.DeckNames?.map((a) => a.name).includes(inputField)
        ? 'name exists'
        : nameTooShortOrLong && inputField.length < 4
        ? 'too short'
        : nameTooShortOrLong && inputField.length > 11
        ? 'too long'
        : ''
    }`}
  </div>
  <select className='landing__select__options'>
    <option>option 1</option>
    <option>option 2</option>
    <option>option 3</option>
    <option>option 4</option>
    <option>option 5</option>
  </select>
  </>
  )
})

export default InputSelectField