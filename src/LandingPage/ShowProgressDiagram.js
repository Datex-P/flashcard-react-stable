import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressDiagram() {

   const {
     dataBase
   } = useContext(Context);


  return (
    <>   
      <div className='landing__showDiagram'>
        <div className='fontBold'> 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'>
           {
             200
          
          } 
          </div>
        </div>
        <div >
          <PieDiagramm />
        </div>     
    </>
  )
}

export default ShowProgressDiagram
