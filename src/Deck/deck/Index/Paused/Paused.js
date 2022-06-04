import { useContext} from 'react';
import ThisDeckPaused from '../ThisDeckPaused'
import DeckEmpty from './DeckEmpty'
import DeckNotEmpty from './DeckNotEmpty'
import { Context } from "../../../../Context";


function Paused({
  data, 
  index, 
  paused, 
  name, 
  setShow, 
  style
}) {

  const {showThreeDots, setShowThreeDots} = useContext(Context);

  return (
    <div className='paused justify-between flex-column'>
      {data.length === 0 ? 
          <DeckEmpty setShow={setShow}/>
        : 
          <DeckNotEmpty index={index} paused={paused} style={style}/>
      }
      {paused &&  
        <ThisDeckPaused 
          showThreeDots={showThreeDots} 
          setShowThreeDots={setShowThreeDots} 
          index={index}/>
      }
      {name && data.length !== 0 &&
        <div
          className='deck__container align-center'
          style={{ opacity: paused ? '0' : '1' }}
        >
          {'Decksize:'.padEnd(10, '')} {data.length}
        </div>
      }
  </div>
  )
}

export default Paused






