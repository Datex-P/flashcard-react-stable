import React, { useState, useContext} from 'react';
import { Context } from '../../../context/Context'
import hexagonWhite from '../../../icons/hexagon.svg'
import hexagonGreen from '../../../icons/hexagonGreen.svg'


export default function Hexagons({ idx, 
        editHex, setEditHex, 
        setWeeklyGoal,
        weeklyTargetHandler }) {

  const { dataBase, setDataBase} = useContext(Context)
  const [showDay, setShowDay] = useState(false)

  function indexHandler() {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences.days = idx
    setWeeklyGoal(idx)
    setDataBase(newDataBase)
    setShowDay(true)
  }

  function srcHandler () {
    return idx <= dataBase?.userPreferences?.days ? 
    hexagonGreen : hexagonWhite
  }

  function clickHandler () {
    weeklyTargetHandler() 
    setEditHex(true)
  }

  return (
    
    <div className='settings__hexagons justify-center-align-center flex-column'>
      {
        editHex?
        <img
          style={{cursor: 'default'}}     
          draggable={false}
          src={srcHandler()}
          alt='hexagon'
          onClick={()=>setEditHex(true)}
        />
        :
        <img
          style={{cursor:'pointer'}}     
          draggable={false}
          src={srcHandler()}
          alt='hexagon'
          onClick={clickHandler}
          onMouseEnter={indexHandler}
          onMouseLeave={()=>setShowDay(false)}
        />
      }
      {((editHex &&          
       (showDay || idx === dataBase?.userPreferences?.days)) || 
                   idx === dataBase?.userPreferences?.days) &&

        <div className='settings__editHex'>
            <div className='settings__blackArrow'></div>           
            <span className='fontBold'>
                {idx <= dataBase?.userPreferences?.days ? 
                      `${idx + 1}` : `${idx - 1}`
                }
            </span> 
            {idx === 0? ' day': ' days'}
        </div>
      }
    </div>
  )
}