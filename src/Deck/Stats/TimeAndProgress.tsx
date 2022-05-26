import React, { useContext, useEffect, useState } from "react";
import "../../styles.scss";
import { Context } from "../../Context";


interface itemProps {
  openHistory: string[];
}

interface TimeObj { 6: number[]; 12: number[]; 18: number[]; 24: number[]; }

const TimeAndProgress: React.FC = () => {
  let studyGoal = 80;

  const {dataBase} = useContext(Context);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [widthAdjusted, setWidthAdjusted] = useState(0);
  const [timeObj, setTimeObj] = useState<TimeObj>({} as TimeObj);

  
  useEffect(() => {
    let currentProgress = 0
    // parseInt(
    //   (dataBase?.deckCompleted * 100) / 
    //   Object.keys(dataBase?.DeckNames).length 
    //   || 0);
    setCurrentProgress(currentProgress);

    let firstVal: number[] = [];
    if (dataBase?.DeckNames) {
    for (let deckItem of dataBase?.DeckNames) {
      firstVal.push(
        deckItem?.data?.filter(
          (item) =>
            item.openHistory &&
            item.openHistory.filter(
              (item) =>
                new Date(item).getHours() < 12 && new Date(item).getHours() > 6
            ).length
        )
      );
      var secVal = deckItem.data.filter(
        (item:itemProps) =>
          item.openHistory &&
          item.openHistory.filter(
            (item:string) =>
              new Date(item).getHours() < 18 && new Date(item).getHours() > 12
          ).length
      );
      var thirdVal = deckItem.data.filter(
        (item: itemProps) =>
          item.openHistory &&
          item.openHistory.filter(
            (item:string) =>
              new Date(item).getHours() < 24 && new Date(item).getHours() > 18
          ).length
      );
      var fourthVal = deckItem.data.filter(
        (item: itemProps) =>
          item.openHistory &&
          item.openHistory.filter((item:string) => new Date(item).getHours() < 6)
            .length
      );
    }
  }

    setTimeObj({
      6: firstVal,
      12: secVal,
      18: thirdVal,
      24: fourthVal,
    });

    let widthAdjusted = Math.round(currentProgress) + 120;
    setWidthAdjusted(widthAdjusted);
  }, [dataBase]);

  function renderLines() {
    let arr:any = [];
    //change type of arr
    let previousWidthVar = 0;
    for (let i = 6; i <= 24; i += 6) {
     if (timeObj !== null ) {
      if (i in timeObj) {
        let widthVar = ((timeObj[i] || 0) / studyGoal) * 100;
        previousWidthVar += widthVar;

        if (i === 18) {
          arr.push(
            <Row
              key='1'
              previousWidthVar={previousWidthVar}
              widthVar={widthVar}
              time={<div className='stats__timesAndProgress_times'>{"18 - 24"}</div>}
            />
          );
        } else if (i === 24) {
          arr.push(
            <Row
              key='2'
              previousWidthVar={previousWidthVar}
              widthVar={widthVar}
              time={<div className='stats__timesAndProgress_times'>{"24 - 06"}</div>}
            />
          );
        } else if (i <= 12) {
          if (i < 12) {
            arr.push(
              <Row
                key='3'
                previousWidthVar={previousWidthVar}
                widthVar={widthVar}
                time={
                  <div className='stats__timesAndProgress_times'>
                    {"0" + i} - {i + 6}
                  </div>
                }
              />
            );
          } else {
            arr.push(
              <Row
                key='4'
                previousWidthVar={previousWidthVar}
                widthVar={widthVar}
                time={
                  <div className='stats__timesAndProgress_times'>
                    {"12"} - {"18"}
                  </div>
                }
              />
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
        <div className='stats__row height10px'
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
