import React, { useContext}  from 'react';
import { Context } from '../../../../../context/Context';
import play from '../../../../../icons/play.svg';
import {ThisDeckLogic} from './ThisDeckLogic'

export default function ThisDeckPaused ({index}) {

  const { colors} = useContext(Context);

const {handlePause} = ThisDeckLogic({index})


  return (
      <div
        className='deck__deckEmptyCont justify-evenly-align-center flex-column'
        style={{background: colors[index % 5]}}
      >
        <div>
        This deck is paused.
        </div>
        <div className='align-center mt-5px'>
          Press:
          <button
            className='deck__btn-play justify-center-align-center posRelative zIndex-5'
            onClick={handlePause}
          > 
            <img 
              src={play} 
              alt='play' 
              className='paused__img-play'
            />
          </button>
        </div>
        <div className='deck__countToStudyGoal posRelative'>
          It doesn't count to the study goal.
        </div>
      </div>
  )
}