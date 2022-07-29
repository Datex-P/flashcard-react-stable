export const RepetitionLogic = ({ 
  editModeActive, 
  editRepActive,
  index,
  userTimePreferences, 
  setInputText,
  setInputNumber,
  setUserTimePreferences,
}) => {

  function handleInputNumbers(e) {

    if (e.target.value.length < 3) {
        setInputNumber(e.target.value)
        let newUserTimePreferences = [...userTimePreferences]
        newUserTimePreferences[index].amount = e.target.value
        setUserTimePreferences(newUserTimePreferences)
    }
  }

  function checker(e) {
    let { value } = e.target;
    let newValue = value.replace(/[^0-9]/g, '')
    if (newValue.length < 4) {
        setInputNumber(newValue)
    }
  }

  function handleInputText(e) {
    setInputText(e.target.value)
    let newUserTimePreferences = [...userTimePreferences]
    newUserTimePreferences[index].name = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }
  return {
    checker, handleInputText,handleInputNumbers
  }
}