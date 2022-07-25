import React from 'react'
import PieDiagram from './PieDiagramMain';

function ShowProgressDiagram() {

  return (
    <div className='posAbsolute left-330px top--35px'>   
      <div className='landing__showDiagram posRelative'>
        <div className='fontBold'> 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'>
           {
             200         
          } 
          </div>
        </div>
        <div>
           <PieDiagram /> 
        </div>     
    </div>
  )
}

export default ShowProgressDiagram
