import React, {useState, useEffect,useContext} from "react";
import { withRouter } from 'react-router-dom';
import { Context } from "../../Context";

import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow';
import ThreeDotsBtn from "../deck/ThreeDotsBtn/ThreeDotsBtn";
//import PieDiagramm from "./PieDiagramm";
import ButtonLeftAndRight from "./ButtonLeftAndRight";
import TimeAndProgress from './TimeAndProgress';
import HourlyBreakdown from "./HourlyBreakdown";
import DeleteCardQuestionBox from "../deck/DeleteCardQuestionBox/DeleteCardQuestionBox";


function Stats({ history }:any) {
  const { dataBase, setShowProgressDiagram, setDataBase } = useContext(Context);
  const [showDeleteFrame, setShowDeleteFrame] = useState(false);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
 
  function setShowFunc() {
    history.push("/");
    setShowProgressDiagram(true);
  }

  useEffect(() => {
    setShowProgressDiagram(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='stats__BasicOrangeWindow__cont'>
      <BasicOrangeWindow
        show={true}
        setShow={setShowFunc}
        title={<div className='stats__header'>Stats</div>}
        menu={
          <ThreeDotsBtn
            text={"stats"}
            className="resetButtonStyling"
            editButtonClicked
            resetEvent={() => {
              setShow(!show);
              setShowDeleteFrame(true);
              //  reset=false
            }}
            reset
          />
        }
      >
        <div>
          <div className='stats__study-breakdown'>Today's study breakdown</div>
          <div className='dateDiagramPos'>
            {!dataBase?.openedToday
              ? 'No cards studied today'
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div className='align-center flex-column stats__DeleteCardQuestionBox__cont'>
            {showDeleteFrame && (
              <DeleteCardQuestionBox
                resetQuestionText
                showMessageAgain
                card="card"
                checked={checked}
                setChecked={setChecked}
                showDeleteWindow={showDeleteFrame}
                deleteWindow={() => setShowDeleteFrame(false)}
                trashEvent={() => {
                  let DeckNames = [...dataBase.DeckNames]
                  DeckNames.forEach(deckItem=>
                    deckItem.data.forEach(item => item?.openHistory&&delete item?.openHistory)
                  )
                  setDataBase({...dataBase,DeckNames})
                }}
                onHide={() => {}}
              />
            )}
            {/* <PieDiagramm /> */}
          </div>
          <div className="stats__calendar">Calendar</div>
          <div className="justify-center-align-center">
            <ButtonLeftAndRight />
          </div>
          <HourlyBreakdown />
        </div>
        <div style={{ width: "200px" }}></div>
        <TimeAndProgress />
      </BasicOrangeWindow>
    </div>
  );
}

//export default Stats
export default withRouter(Stats);


