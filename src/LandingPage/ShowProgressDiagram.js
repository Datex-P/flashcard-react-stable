import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressD() {

   const {
     dataBase
   } = useContext(Context);


  return (
    <>   
      <div 
        className='showProgressDiagram posRelative'
        style={{left:'200px', top:'45px'}}
      >
        <div className='fontBold'> 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'>
          {
            `${parseInt((dataBase.deckCompleted * 100) /
                Object.keys(dataBase.DeckNames).length)} %`
          }
          </div>
        </div>
        <div className='width80px'>
          <PieDiagramm />
        </div>     
    </>
  )
}

export default ShowProgressD
