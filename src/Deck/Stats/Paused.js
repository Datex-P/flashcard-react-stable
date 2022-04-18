import playimg from '../../icons/play.svg'
let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];


export default function Paused ({handlePause, index}){
  
  return(
  <div 
  className='deckPausedContainer'
  style={{background: colors[index % 5]}}
>
  <div>
      
  </div>

  <div className='align-center'
  > 
        Press:
    
    <button 
        className='btn-play'
        onClick={()=>{
                    handlePause()
                
        }}
    >

        <img 
            src={playimg}
            alt='play' 
            style={{margin: '6px', cursor: 'pointer'}}                         
      />

    </button>
    
  </div>
  <div 
  >
        to unpause the Deck. Paused decks don't count to the study goal.
  </div>
</div>
  )
}