import {useEffect} from 'react';
import ThisDeckPaused from './ThisDeckPaused'
import DeckEmpty from './DeckEmpty'
import DeckNotEmpty from './DeckNotEmpty'

function Paused({
  data, 
  index, 
  paused, 
  setShow, 
  style
}) {


  return (
    <div className='paused justify-between flex-column'>

      {data.length === 0 ? 
          <DeckEmpty 
            setShow={setShow}
          />
        : 
          <DeckNotEmpty 
            data={data} 
            index={index} 
            paused={paused} 
            style={style} 
          />
      }
      {paused &&  
        <ThisDeckPaused index={index}/>
      }
  </div>
  )
}

export default Paused






