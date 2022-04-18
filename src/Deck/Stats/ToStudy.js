export default function ToStudy({paused}) {
  return (
    <div
              className='divStyling align-center' 
              style={{opacity: paused? '0': '1'}}
              >
                To Study:   

                <input 
                    type='number' 
                    className='inputStyling' 
                    min='10'
                    max='30'
                    disabled
                >   

                </input>

          </div>     

  )
}