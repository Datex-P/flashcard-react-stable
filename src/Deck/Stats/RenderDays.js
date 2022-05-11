import React,  {useState, useEffect, useContext, useRef} from "react";
import { Context } from "../../Context";

function RenderDays() {

  const [year] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const {dataBase} = useContext(Context);
  const [showTodaysProg, setShowTodaysProg] = useState(false);
  const innerStat = useRef(null)
  const [right,setRight]=useState(0)
  const [outer,setOuter]=useState(0)

  useEffect(() => {
    // let date = [];
    // let thisYear = new Date(`January 1, ${+year}`);

    // while (
    //   thisYear.getMonth() !== 0 ||
    //   thisYear.getDate() !== 1 ||
    //   thisYear.getFullYear() === +year
    // ) {
    //   date.push({ day: thisYear.toDateString(), cardsStudied: 0 });
    //   thisYear.setDate(thisYear.getDate() + 1);
    // }
    // //setDays(date);
    // let today = new Date('May 26, 2021').toDateString();
    // if (dataBase?.DeckNames) {
    //   for (let deck in dataBase.DeckNames) {
    //     //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')

    //     //cardsStudiedataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length

    //     //cardsStudied = dataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length
    //     let todaysAmount = dataBase.DeckNames[deck].data.filter((item) =>
    //       item?.openHistory?.some(
    //         (item) => new Date(item).toDateString() === today
    //       )
    //     ).length;
    //     let index = date.findIndex((day) => day.day === today);
    //     console.log(index);
    //     date[index].cardsStudied += todaysAmount;
    //     setDays(date);
    //   }
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year,dataBase?.DeckNames]);

  function clickHandler(e, day) {
    let inner= e.target.getBoundingClientRect();
           
                if((outer.right - inner.right) < 126){
                  setRight(outer.right - inner.right - 126)    
                }   
            if (day.cardsStudied) {
              setShowTodaysProg(true);
            }
  }


  return (
    <div 
      className="d-flex stats__year-box"
      onClick={(e)=>{    
       let outer = e.currentTarget.getBoundingClientRect()
        setOuter(outer)
       }}
     >
      {days.map((day, index) => (
        <div
          key={index}
          className={`day ${day?.cardsStudied ? 'pointer' : ''}`}
          style={{backgroundColor: day?.cardsStudied ? 'red' : '' }}
          onClick={(e, day)=>clickHandler(e, day)}
        >
          {showTodaysProg && day.cardsStudied && 
            <div
              className='stats__study-info posAbsolute top-20px'
              style={{left: right+'px'}}
              ref={innerStat}
            >
              {day.day}
              <div className='top-30px posAbsolute'>
                Time:
              </div>
              <div className='top-56px posAbsolute'>               
                Review:`${day.cardsStudied !== 1 ? "s" : ""}: $
                {day.cardsStudied} card${day.cardsStudied !== 1 ? 's' : ''}`
              </div>
            </div>
          }
        </div>
      ))}
    </div>
 
  )
    

}

export default RenderDays
