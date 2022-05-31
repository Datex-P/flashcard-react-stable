import { useContext, forwardRef} from 'react'
import { Context } from "../../Context";

const InputSelectField = forwardRef ((props, okRef) =>{

  const {dataBase} = useContext(Context);
  let {inputField, setInputField, nameTooShortOrLong, setNameTooShortOrLong} = props

  function onChangeHandler(event) {
    let { target } = event;
  
    if (target) {
      setInputField(event.target.value);
    }

    setTimeout(() => {
      if (event.target.value.length > 3 && event.target.value.length < 11) {
        if (okRef !== null && okRef.current) {
          okRef.current.disabled = false;
          okRef.current.classList.add("landing__Btn-col");
          setNameTooShortOrLong(false);
        }
        // } else if (okRef.current){ needed for typescript,did not work
      } else {
        setNameTooShortOrLong(true);
        if(okRef.current){
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