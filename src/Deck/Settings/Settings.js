/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Context } from '../../Context'
import '../../styles.css'
import './settings.css'
import Hexagon from  './Hexagons'
import RepetitionIntervalFields from './RepetitionIntervalFields'
import ColorScheme from './ColorScheme'

import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow'
import edit from '../../icons/edit.svg'
import save from '../../icons/save.svg'
//import ImgCont from './ImgCont'



function Settings({ history }) {
  const [editIsPossible, setEditIsPossible] = useState(false)
  const [saveOrEdit, setSaveOrEdit] = useState(false)
  const [saveOrEditGoal, setSaveOrEditGoal] = useState(false)
  const [editHex, setEditHex] = useState(true)
  
  const { dataBase, setDataBase,setShowProgressDiagram } = useContext(Context)
  const [userTimePreferences, setUserTimePreferences] = useState({})

  useEffect(() => {
    setUserTimePreferences(dataBase?.userTimePreferences || {})
  }, [dataBase?.userTimePreferences])

    useEffect(()=>{
      setShowProgressDiagram(false)
    },[])

  function setShow() {
    history.push('/')
    setShowProgressDiagram(true)
  }


  function saveTimeNumberChanges() {
    let newDataBase = { ...dataBase }
    newDataBase.userTimePreferences = userTimePreferences
    setDataBase(newDataBase)
  }


function ImgContainer({hex=false}) {

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

  return (

    dataBase &&

    <BasicOrangeWindow
      show={true}
      setShow={setShow}
      title={
        <div
          style={{fontWeight: 'bold', fontSize: '22px'}}
          //className={'pos'}
        >
          Settings
       </div>
      } 
    >
      <div className='settings__repetiton-interval'>
          Change Repetition Interval
      </div>
      <div className='justify-center'
      >
          <div className='border border-dark justify-center-align-center settings_repetition-container'
          >
              <div 
                  className='justify-around' 
                  style={{width: '280px'}}
              >
                  {
                    dataBase &&
                      
                      dataBase.userTimePreferences.map((col, k) =>

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
                  }
              </div>
              
          </div>
          <div 
              className='settings__save-or-edit-container'
              title='Click and change name buttons and repetition intervals for all decks.'
          >
           <ImgContainer
           /> 
                <img
                  src={saveOrEdit ? save : edit}
                  alt={saveOrEdit ? 'save' : 'edit'}
                  className= 'nonDraggableIcon'
                  style={{ outline: 'none' }}
                  onClick={() => {
                          setEditIsPossible(!editIsPossible)
                          setSaveOrEdit(!saveOrEdit)
                          saveTimeNumberChanges()
                        }}
                />  
          </div>
      </div>
      <div>
          <div className='settings__goal-settings fontBold'>
              <div className='settings__paddings'>Goal Settings</div>
              <div className='settings__weekly-target settings__paddings'>Current Weekly Target</div>
          </div>
          <div className='justify-between-align-center border border-dark  settings__container-hexagon'
          > 
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
            <ImgContainer/>
          </div>
          <div className='settings__weekly-target justify-center'>
            Target met: {dataBase.userPreferences.weeksInRow} weeks in a row
          </div>
      </div>
      <ColorScheme/>
    </BasicOrangeWindow>
  )
}

export default withRouter(Settings)













