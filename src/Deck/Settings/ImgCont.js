import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'
import '../../styles.css'

function ImgCont({save=false, edit=false, hex=false,
  saveOrEdit, //Icon changes to either  save or edit
  setSaveOrEdit,
  saveTimeNumberChanges,
  editIsPossible,
  setEditIsPossible,
  editHex,
  setEditHex,
  saveOrEditGoal,
  setSaveOrEditGoal
}) {

  function notHexagonal() {
    setEditIsPossible(!editIsPossible)
    setSaveOrEdit(!saveOrEdit)
    saveTimeNumberChanges()
  }

  function hexagonal () {
    setSaveOrEditGoal(!saveOrEditGoal)
    setEditHex(!editHex)
  }

  return(
      <img
      src={saveOrEdit ? save : edit}
      alt={saveOrEdit ? 'save' : 'edit'}
      className= 'nonDraggableIcon'
      style={{ outline: 'none' }}
      onClick={hex? hexagonal: notHexagonal}
      /> 
  )
}

export default ImgCont