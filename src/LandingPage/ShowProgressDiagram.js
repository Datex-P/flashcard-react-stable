import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressDiagram() {

   const {
     dataBase
   } = useContext(Context);


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
          <PieDiagramm />
        </div>     
    </div>
  )
}

export default ShowProgressDiagram
