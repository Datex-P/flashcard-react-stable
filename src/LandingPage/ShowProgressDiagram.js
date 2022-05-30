import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressDiagram() {

   const {
     dataBase
   } = useContext(Context);


  return (
    <>   
      <div className='showProgressDiagram posRelative top-1px left-358px'>
        <div className='fontBold'> 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'>
           {
             200
          
          } 
          </div>
        </div>
        <div className='width80px posRelative top--74px right--335px'>
          <PieDiagramm />
        </div>     
    </>
  )
}

export default ShowProgressDiagram
