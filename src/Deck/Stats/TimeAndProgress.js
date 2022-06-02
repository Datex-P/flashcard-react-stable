import React, { useContext, useEffect, useState } from "react";
import "../../styles.scss";
import { Context } from "../../Context";

// interface itemProps {
//   openHistory: string[];
// }

//interface TimeObj { 6: number[]; 12: number[]; 18: number[]; 24: number[]; }

const TimeAndProgress = () => {
  let studyGoal = 80;

  const {dataBase} = useContext(Context);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [widthAdjusted, setWidthAdjusted] = useState(0);
  const [timeObj, setTimeObj] = useState({});

  
  useEffect(() => {
    let currentProgress = 0
    // parseInt(
    //   (dataBase?.deckCompleted * 100) / 
    //   Object.keys(dataBase?.DeckNames).length 
    //   || 0);
    setCurrentProgress(currentProgress);

    let firstVal = [];
    let secVal = [];
    let thirdVal = [];
    let fourthVal = [];

    function timeHorizon (deckItem, starthour, endhour) {
      return deckItem?.data?.filter(
        (item) =>
          item.openHistory &&
          item.openHistory.filter(
            (item) =>
              new Date(item).getHours() < endhour && new Date(item).getHours() > starthour
          ).length
      ).filter(x=>x).length
    }

    function valueReducer (x) {
      return x.reduce((acc, cur)=>acc+cur, 0)
    }

    if (dataBase?.DeckNames) {
      for (let deckItem of dataBase?.DeckNames) {
        firstVal.push(timeHorizon(deckItem, 6,12))
        secVal.push(timeHorizon(deckItem, 12,18))
        thirdVal.push(timeHorizon(deckItem, 18,14))
        fourthVal.push(timeHorizon(deckItem, 0,6))
      }
  }
    firstVal = valueReducer(firstVal)
    secVal = valueReducer(secVal)
    thirdVal = valueReducer(thirdVal)
    fourthVal = valueReducer(fourthVal)

    setTimeObj({
      6: firstVal,
      12: secVal,
      18: thirdVal,
      24: fourthVal,
    });

    let widthAdjusted = Math.round(currentProgress) + 120;
    setWidthAdjusted(widthAdjusted);
  }, [dataBase]);

  useEffect(()=>{
    console.log(timeObj, 'time obj here')
  },[timeObj])

  function rowContainer (key, previousWidthVar, widthVar, x) {
  
  return (
    <Row
      key={key}
      previousWidthVar={previousWidthVar}
      widthVar={widthVar}
      time={<div className='stats__timesAndProgress_times'>{x}</div>}
    />
    )
  }

  function renderLines() {
    let arr = [];
    //change type of arr
    let previousWidthVar = 0;
    for (let i = 6; i <= 24; i += 6) {
     if (timeObj !== null ) {
      if (i in timeObj) {
        let widthVar = ((timeObj[i] || 0) / studyGoal) * 100;
        previousWidthVar += widthVar;
        console.log(previousWidthVar, 'previous width var here')
 
        if (i === 18) {
          arr.push(
            rowContainer (1, previousWidthVar, widthVar, '18 - 24')
          );
        } else if (i === 24) {
          arr.push(
            rowContainer (2, previousWidthVar, widthVar, '24 - 06')
          );
        } else if (i <= 12) {
          if (i < 12) {
            arr.push(
            rowContainer (3, previousWidthVar, widthVar, '6 - 12')
            );
          } else {
            arr.push(
            rowContainer (4, previousWidthVar, widthVar, '12 - 18')
            );
          }
        }
      }
     }
    }
  return arr;
  }

  return (
    <div className='stats__breakdownContainer justify-around flex-column'>
      <div className='d-flex'>
        <div className='height27px font-13px justify-center-align-center stats__studyGoal'>
          Monthly Goal
        </div>
        <div className='stats__progressBar ml-21px-imp'>
          <div 
            className='stats__currentProgress mt-3px'
            style={{width: `${currentProgress}%`}}
          ></div>
        </div>
        <div 
          className='posAbsolute font-13px top-2px'
          style={{left: `${widthAdjusted}px`}}
        >
          {currentProgress.toFixed(0)}%
        </div>
      </div>
      {renderLines()}
    </div>
  );
}

function Row({ time, previousWidthVar, widthVar }) {
  return (
    <div className='d-flex'>
      <div className='stats__time justify-center'>{time}</div>
      <div className='stats__progressBar'>
        <div className='stats__row height10px align-center'
          style={{
            marginLeft: `${previousWidthVar}%`,
            width: `${widthVar}%`
          }}
        ></div>
      </div>
    </div>
  );
}

export default TimeAndProgress
