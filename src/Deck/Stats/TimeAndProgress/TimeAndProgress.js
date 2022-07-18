import React, { useContext, useEffect, useState } from "react";
import RenderLines from './RenderLines'
import { Context } from "../../../Context";

const TimeAndProgress = () => {
  
  const {dataBase} = useContext(Context);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [widthAdjusted, setWidthAdjusted] = useState(0);
  const [timeObj, setTimeObj] = useState({});
  // let studyGoal = 80;

  useEffect(() => {
    let currentProgress = 0
    // parseInt(
    //   (dataBase?.deckCompleted * 100) / 
    //   Object.keys(dataBase?.DeckNames).length 
    //   || 0);
    setCurrentProgress(currentProgress);

    let morningVal = []
    let middayVal = []
    let eveningVal = []
    let nightVal = []
  
    function timeHorizon (deckItem, starthour, endhour) {
      return deckItem?.data?.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter(
            (item) =>
              new Date(item).getHours() < endhour && 
              new Date(item).getHours() > starthour
          ).length
      ).filter(x=>x).length
    }
 
    if (dataBase?.DeckNames) {
      for (let deckItem of dataBase?.DeckNames) {
        morningVal.push(timeHorizon(deckItem, 6,12))
        middayVal.push(timeHorizon(deckItem, 12,18))
        eveningVal.push(timeHorizon(deckItem, 18,14))
        nightVal.push(timeHorizon(deckItem, 0,6))
       // debugger
      }
    }
    
    function valueReducer (x) {
      return x.reduce((acc, cur)=>acc+cur, 0)
    }

    morningVal = valueReducer(morningVal)
    middayVal = valueReducer(middayVal)
    eveningVal = valueReducer(eveningVal)
    nightVal = valueReducer(nightVal)

    setTimeObj({
      6: morningVal,
      12: middayVal,
      18: eveningVal,
      24: nightVal,
    });

    let widthAdjusted = Math.round(currentProgress) + 120;
  
    setWidthAdjusted(widthAdjusted);
  }, [dataBase]);


  return (
    <div className='stats__breakdownContainer justify-around flex-column'>
      <div className='d-flex'>
        <div className='height27px font-13px justify-center-align-center stats__studyGoal'>
          Monthly Goal
        </div>
        <div className='stats__progressBar ml-21px-imp'>
          <div 
            className='stats__currentProgress mt-3px'
            style={{width:`${currentProgress}%`}}
          ></div>
        </div>
        <div 
          className='posAbsolute font-13px top-2px'
          style={{ left: `${widthAdjusted}px` }}
        >
          {currentProgress.toFixed(0)
          }%
        </div>
      </div>
       <RenderLines timeObj={timeObj}
       /> 
    </div>
  );
}


export default TimeAndProgress
