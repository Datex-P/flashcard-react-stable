import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressDiagram() {

   const {
     dataBase
   } = useContext(Context);


  return (
    <>   
      <div className='showProgressDiagram posRelative top-50px left-180px'>
        <div className='fontBold'> 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'>
           {
             200
          
          } 
          </div>
        </div>
        <div className='width80px'>
          {/* <PieDiagramm /> */}
        </div>     
    </>
  )
}

export default ShowProgressDiagram
