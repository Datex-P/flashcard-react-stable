import React from "react";

function RenderLines({timeObj}) {
 
  let arr:JSX.Element[] = [];
  let studyGoal = 80;
  let previousWidthVar = 0;
  let index = 0



  for (let i = 6; i <= 24; i += 6) {
   if (timeObj !== null ) {
    if (i in timeObj) {
      let widthVar = ((timeObj[i] || 0) / studyGoal) * 100;
      previousWidthVar += widthVar;
      let timeSlots = ['6 - 12', '12 - 18', '18 - 24', '24 - 06']

      arr.push( 
        rowContainer (index+1, previousWidthVar, widthVar, timeSlots[index])
      );
      index++
     } 
    }
   }
  return arr;
}

function rowContainer (key: number, previousWidthVar: number, 
  widthVar: number, x: string): JSX.Element
{
  
  return (
    <Row
      key={key}
      previousWidthVar={previousWidthVar}
      widthVar={widthVar}
      time={<div className='stats__timesAndProgress_times'>{x}</div>}
    />
    )
}

  function Row({ time, previousWidthVar, widthVar }) {

    return (
      <div className='d-flex'>
        <div className='stats__time justify-center-align-center'>{time}</div>
        <div className='stats__progressBar align-center'>
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

export default RenderLines