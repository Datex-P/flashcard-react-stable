import React, {useContext} from 'react'
// import playimg from "../../icons/play.svg";
import { Context } from "../../Context";
//import Playimg from "../../icons/PlayButton";

// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
//const playimg = require("../../icons/play-button.svg") as string;

interface UnpauseProps {
  index:number
}

// BudgetOverview: React.FC<BudgetProps> = ({budgets}: BudgetProps) => {

const Unpause: React.FC<UnpauseProps> = ({index}) => {


  const { dataBase, setDataBase } = useContext(Context);

  // type MouseHandler = (event?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => void

  const handlePause = (index) =>{ 
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);
   
  }

  let colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];

  return (
    <div
    className="deck__deckEmptyAndPausedContainer justify-evenly-align-center flex-column"
    style={{ background: colors[index % 5] }}
    >
    <div>This deck is paused.</div>

    <div className='align-center'>
      Press:
      <button
        className="deck__btn-play justify-center-align-center"
        onClick={handlePause}
      >
        {/* <img
         // src={playimg}
          alt="play"
          className='paused__img-play'
        /> */}
        {/* <Playimg/> */}
      </button>
    </div>
    <div className="deck__countToStudyGoal posRelative">
      It doesn't count to the study goal.
    </div>
  </div>
  )
}

export default Unpause
