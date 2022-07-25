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
import DeleteAccount from './DeleteAccount'
const edit = require('../../icons/edit.svg')
const save = require('../../icons/save.svg')

function Settings({ history }) {

  const [editModeActive, setEditModeActive] = useState(false)
  const [editRepActive, setEditRepActive] = useState(false)
  const [editHex, setEditHex] = useState(true)
  const [weeklyGoal, setWeeklyGoal] = useState(null)
  const { apiURL, dataBase, setDataBase, setShowProgressDiagram, user } = useContext(Context)
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

  function goalHandler() {
    setEditHex(!editHex)
  }

  async function weeklyTargetHandler() {
    console.log('weekly target handler fired in settings')
    let weeklyTarget:number = weeklyGoal || 0
    try{
     await fetch(`${apiURL}/update_weekly_target`, {
       method:'POST',
       headers: {
         "Content-Type":"application/json",
         "Accept":"application/json"
       },
         body: JSON.stringify({
           weeklyTarget:weeklyTarget+1,
           user:user
         })
       });
      //better to store color in localstorage
    //  setEditHex(true) not needed in settings
   } catch (err){
     console.log(err, 'err here')
   }
 }

  function repetitionHandler(){
    setEditModeActive(!editModeActive)
    setEditRepActive(!editRepActive)
    saveTimeNumberChanges()
  }


  return (

    dataBase &&

    <BasicOrangeWindow
      questionViewActive
      show
      settings
      index={0}
      setScrollbarVisible={()=>{}}
      setShow={setShow}
      title={<div className='fontBold font-22px'>Settings</div>}
    >
      <div className='settings__repetition-interval mt-30px'>
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
                  editRepActive={editRepActive}
                  editModeActive={editModeActive}
                  userTimePreferences={userTimePreferences}
                  setUserTimePreferences={setUserTimePreferences}
                />
              )
            }
          </Container>
        <div
          className='settings__save-or-edit-cont'
          title='Click and change name buttons and repetition intervals for all decks.'
        >
          <img
            src={editRepActive ? save : edit}
            alt={editRepActive ? 'save' : 'edit'}
            className='nonDraggableIcon outline-none'
            onClick={repetitionHandler}
          />   
        </div>
      </div>
      <div>
        <div className='settings__goal-settings fontBold mt-30px mb-10px'>
          <div className='settings__paddings'>
             Goal Settings
          </div>
          <div className='settings__weekly-target settings__paddings'>
             Current Weekly Target
          </div>
        </div>
        <div className='justify-between-align-center border border-dark settings__container-hexagon'>
          {
            Array(7).fill('').map((_, idx) =>
              <Hexagon
                key={idx}
                idx={idx}
                editHex={editHex}
                setEditHex={setEditHex}
                setWeeklyGoal={setWeeklyGoal}
                weeklyTargetHandler={weeklyTargetHandler}
              />
            )
          }
        </div>
        <div className='settings__saveoredit'>
          <img
            src={editHex ? edit : save}
            alt={editHex ? 'edit' : 'save'}
            className='nonDraggableIcon outline-none'
            onClick={()=>{
              goalHandler() 
              weeklyTargetHandler()
            }}
          /> 
        </div>
        <div className='settings__weekly-target justify-center mt-3px'>
          Target met: {dataBase?.userPreferences?.weeksInRow} weeks in a row.
        </div>
      </div>
      <ColorScheme />
      <DeleteAccount/>
    </BasicOrangeWindow>
  )
}

function Container({ children }) {
  return (
    <div className='justify-center-align-center settings_repetition-container'>
      <div className='justify-around width280px'>
        {children}
      </div>
    </div>
  )
}

export default withRouter(Settings)













