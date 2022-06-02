import React, {useState, useEffect,useContext} from "react";
import { withRouter } from 'react-router-dom';
import { Context } from "../../Context";
import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow';
import ThreeDotsBtn from "../deck/ThreeDotsBtn/ThreeDotsBtn";
import PieDiagramm from "./PieDiagramm";
import ButtonLeftAndRight from "./ButtonLeftAndRight";
import TimeAndProgress from './TimeAndProgress';
import HourlyBreakdown from "./HourlyBreakdown";
import DeleteCardQuestionBox from "../deck/DeleteCardQuestionBox/DeleteCardQuestionBox";
import './stats.css'

function Stats({ history }:any) {
  const { dataBase, setShowProgressDiagram, setDataBase, threeDotsOpen, setThreeDotsOpen } = useContext(Context);
  const [showDeleteFrame, setShowDeleteFrame] = useState(false);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
 
  function setShowFunc() {
    history.push("/main");
    setShowProgressDiagram(true);
  }

  useEffect(() => {
    setShowProgressDiagram(false);
    // eslint-disable-next-line
  }, []);

  function trashEventHandler() {
      let DeckNames = [...dataBase.DeckNames]
      DeckNames.forEach(deckItem=>
        deckItem.data.forEach(item => item?.openHistory&&delete item?.openHistory)
      )
      setDataBase({...dataBase,DeckNames})
  }

  return (
    <div className='stats__BasicOrangeWindow__cont'>
      <BasicOrangeWindow
        questionViewActive
        stats
        show={true}
        setShow={setShowFunc}
        title={<div className='stats__header'>Stats</div>}
        menu={
          <ThreeDotsBtn
            text={"stats"}
            className="stats__resetButtonStyling"
            editButtonClicked
            setThreeDotsOpen={setThreeDotsOpen}
            threeDotsOpen={threeDotsOpen}
            resetEvent={() => {
           //   setShow(!show);
              setShowDeleteFrame(true);
           console.log('hello reset')
              //  reset=false
            }}
            style= {{
              position: 'absolute',
              top: '0px',
              border: '1px solid black',
              left: '292px',
              zIndex: '99'
            }}
            reset
          />
        }
      >
        <div>
          <div className='stats__study-breakdown mt-15px-imp mb-15px-imp'>
            Today's study breakdown
          </div>
          <div className='stats__dateDiagram'>
             {!dataBase?.openedToday
              ? 'No cards studied today'
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div className='align-center marginAuto flex-column width95pc stats__DeleteCardQuestionBox__cont'>
            {showDeleteFrame && (
              <DeleteCardQuestionBox
                resetQuestionText
                showMessageAgain
                card="card"
                checked={checked}
                setChecked={setChecked}
                showDeleteWindow={showDeleteFrame}
                deleteWindow={() => {
                  setShowDeleteFrame(false); 
                  setThreeDotsOpen(false)
                }}
                trashEvent={trashEventHandler}
                onHide={() => {}}
              />
            )}
             <PieDiagramm />
          </div>
          <div className="stats__calendar">Calendar</div>
          <ButtonLeftAndRight />
          <HourlyBreakdown />
        </div>
        <div className='width200px'></div>
        <TimeAndProgress />
      </BasicOrangeWindow>
    </div>
  );
}

export default withRouter(Stats);


