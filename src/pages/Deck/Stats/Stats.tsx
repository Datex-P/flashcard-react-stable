import React, {useState, useEffect,useContext} from "react";
import { withRouter } from 'react-router-dom';
import { Context } from '../../../context/Context';
import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow';
import ThreeDotsBtn from '../deck/ThreeDotsBtn/ThreeDotsBtn';
import PieDiagram from './PieDiagram';
import CalAndButtons from './CalAndButtons';
import TimeAndProgress from './TimeAndProgress/TimeAndProgress';
import HourlyBreakdown from './HourlyBreakdown';
import DeleteCardQuestionBox from '../deck/DeleteCardQuestionBox/DeleteCardQuestionBox';
import './stats.css'
import {StatsLogic} from './StatsLogic'

function Stats({ history }:any) {
 
  const { 
    dataBase,
    setShowProgressDiagram, 
    setThreeDotsOpen } = useContext(Context);
  const [showDeleteFrame, setShowDeleteFrame] = useState(false);
  // const [checked, setChecked] = useState(false);
  // const [show, setShow] = useState(false);
 
 

  useEffect(() => {
    setShowProgressDiagram(false);
    // eslint-disable-next-line
  }, []);

  const { deleteWindowHandler,
    setShowFunc,
    trashEventHandler} = StatsLogic ({history,setShowDeleteFrame})



  return (
    <div className='stats__BasicOrangeWindow__cont'>
      <BasicOrangeWindow
        questionViewActive
        stats
        show
        index = {0}
        setScrollbarVisible={()=>{}}
        setShow={setShowFunc}
        title={<div className='stats__header'>Stats</div>}
        menu={
          <ThreeDotsBtn
            text={'stats'}
            className='stats__resetButtonStyling posAbsolute'
            editButtonClicked
            setThreeDotsOpen={setThreeDotsOpen}
         //   threeDotsOpen={threeDotsOpen}
            resetEvent={() => {
           //   setShow(!show);
              setShowDeleteFrame(true);
           console.log('hello reset')
              //  reset=false
            }}
            style={{
              position: 'absolute',
              top: '0px',
              border: '1px solid black',
              left: '292px',
              zIndex: '99'
            }}
            //classValue='stats__threeDotsOpen'
            reset
          />
        }
      >
        <div>
          <div className='stats__study-breakdown mt-15px-imp mb-15px-imp'>
            Today's study breakdown
          </div>
          <div className='stats__dateDiagram posAbsolute'>
             {!dataBase?.openedToday
              ? 'No cards studied today'
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div className='align-center marginAuto flex-column width95pc stats__DeleteCardQuestionBox__cont'>
            <PieDiagram />
            
            {showDeleteFrame && 
              <DeleteCardQuestionBox
              resetQuestionText
              showMessageAgain
              card='card'
              // checked={checked}
              //  setChecked={setChecked}
              showDeleteWindow={()=>{}}
              deleteWindow={deleteWindowHandler}
              trashEvent={trashEventHandler} 
              pauseOrDelete={()=>{}} 
              randomQuestion={()=>{}} 
              index={()=>{}}             
              //  onHide={() => {}}
              />
            }
          </div>
          <CalAndButtons />
          <HourlyBreakdown />
        </div>
        <TimeAndProgress />
      </BasicOrangeWindow>
    </div>
  );
}

export default withRouter(Stats);


