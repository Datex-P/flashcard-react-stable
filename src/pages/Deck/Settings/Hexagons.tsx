import React, { useState, useContext} from 'react';
import { Context } from '../../../context/Context'
import {HexagonLogic} from './HexagonLogic'

export default function Hexagons({ idx, 
        editHex, setEditHex, 
        setWeeklyGoal,
        weeklyTargetHandler }) {

  const { dataBase} = useContext(Context)
  const [showDay, setShowDay] = useState(false)

  const {clickHandler, srcHandler, indexHandler} = HexagonLogic({
    idx, 
    setEditHex, 
    setWeeklyGoal,
    weeklyTargetHandler})
 
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