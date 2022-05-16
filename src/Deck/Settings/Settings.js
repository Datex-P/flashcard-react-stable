/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Context } from '../../Context'
import '../../styles.scss'
import './settings.css'
import Hexagon from './Hexagons'
import RepetitionIntervalFields from './RepetitionIntervalFields'
import ColorScheme from './ColorScheme'
import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow'
import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'


function Settings({ history }) {
  const [editIsPossible, setEditIsPossible] = useState(false)
  const [saveOrEdit, setSaveOrEdit] = useState(false)
  const [saveOrEditGoal, setSaveOrEditGoal] = useState(false)
  const [editHex, setEditHex] = useState(true)

  const { dataBase, setDataBase, setShowProgressDiagram } = useContext(Context)
  const [userTimePreferences, setUserTimePreferences] = useState({})

  useEffect(() => {
    setUserTimePreferences(dataBase?.userTimePreferences || {})
  }, [dataBase?.userTimePreferences])

  useEffect(() => {
    setShowProgressDiagram(false)
  }, [])

  function setShow() {
    history.push('/main')
    setShowProgressDiagram(true)
  }


  function saveTimeNumberChanges() {
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences = userTimePreferences
    setDataBase(newDataBase)
  }


  function ImgContainer({ hex = false }) {

    function notHexagonal() {
      setEditIsPossible(!editIsPossible)
      setSaveOrEdit(!saveOrEdit)
      saveTimeNumberChanges()
    }

    function hexagonal() {
      setSaveOrEditGoal(!saveOrEditGoal)
      setEditHex(!editHex)
    }

    return (
      <img
        src={saveOrEdit ? save : edit}
        alt={saveOrEdit ? 'save' : 'edit'}
        className='nonDraggableIcon settings__outline-none'
        onClick={hex ? hexagonal : notHexagonal}
      />
    )
  }

  // function imgHandler(){
  //       setEditIsPossible(!editIsPossible)
  //       setSaveOrEdit(!saveOrEdit)
  //       saveTimeNumberChanges()
  // }
  return (

    dataBase &&

    <BasicOrangeWindow
      settings
      show={true}
      setShow={setShow}
      title={
        <div className='fontBold font-22px'>
          Settings
        </div>
      }
    >
      <div className='settings__repetition-interval'>
        Change Repetition Interval
      </div>
      <div className='justify-center'>
        <Container>
          {
            dataBase?.userTimePreferences &&

            dataBase?.userTimePreferences.map((col, k) =>

              <RepetitionIntervalFields
                key={k}
                index={k}
                data={col}
                saveOrEdit={saveOrEdit}
                editIsPossible={editIsPossible}
                userTimePreferences={userTimePreferences}
                setUserTimePreferences={setUserTimePreferences}
              />
            )
          }</Container>
        <div
          className='settings__save-or-edit-container'
          title='Click and change name buttons and repetition intervals for all decks.'
        >
          <ImgContainer
          />
          {/* <img
                  src={saveOrEdit ? save : edit}
                  alt={saveOrEdit ? 'save' : 'edit'}
                  className= 'nonDraggableIcon settings__outline-none'
                  onClick={imgHandler}
                />   */}
        </div>
      </div>
      <div>
        <div className='settings__goal-settings fontBold mt-30px'>
          <div className='settings__paddings'>Goal Settings</div>
          <div className='settings__weekly-target settings__paddings'>Current Weekly Target</div>
        </div>
        <div className='justify-between-align-center border border-dark  settings__container-hexagon'>
          {
            Array(7).fill('').map((_, idx) =>
              <Hexagon
                key={idx}
                idx={idx}
                editHex={editHex}
                setEditHex={setEditHex}
                saveOrEditGoal={saveOrEditGoal}
              />
            )
          }
        </div>
        <div className='settings__saveoredit'>
          <ImgContainer />
        </div>
        <div className='settings__weekly-target justify-center'>
          {/* Target met: {dataBase.userPreferences.weeksInRow} weeks in a row */}
          Target met : 0 weeks in a row.
        </div>
      </div>
      <ColorScheme />
    </BasicOrangeWindow>
  )
}

function Container({ children }) {
  return (
    <div className='border border-dark justify-center-align-center settings_repetition-container'>
      <div className='justify-around settings_width280px' >
        {children}
      </div>
    </div>
  )
}

export default withRouter(Settings)













