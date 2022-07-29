import React from 'react';
import pauseimg from '../../../../icons/pause.svg';
// https://stackoverflow.com/questions/64656055/react-refers-to-a-umd-global-but-the-current-file-is-a-module
import {PauseLogic} from './PauseLogic'

export default function PauseModeHandler({
  generateRandom,
  index,
  randomQuestion,
}) {

  const {unpauseHandler, keepPausedHandler} = PauseLogic({ generateRandom,
    index,
    randomQuestion,})


  return (
    <>
      <div className='deck__pauseModeHandler posAbsolute'>
        <img 
          src={pauseimg} 
          alt={'pause'}
        />
        <span className='ml-7px'>
          mode
        </span>
      </div>
      <div className='justify-center'>
        <div className='justify-around width300px'>
          <div
            className='justify-center deck__unpause-keepPaused deck__showAnswerButton align-center'
            onClick={unpauseHandler}
          >
            Unpause card
          </div>
          <div
            className='justify-center deck__unpause-keepPaused deck__showAnswerButton align-center'
            onClick={keepPausedHandler}
          >
            Keep paused
          </div>
        </div>
      </div>
    </>
  );
}