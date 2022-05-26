import React,  {useState, useEffect, useContext, useRef} from "react";
import { Context } from "../../Context";

function RenderDays({year}) {

  const [days, setDays] = useState([]);
  const {dataBase} = useContext(Context);
  const innerStat = useRef(null)
  const [right,setRight]=useState(0)
  const [outer,setOuter]=useState(0)
  const [studiedOnThisDay, setStudiedOnThisDay] = useState(false)

  useEffect(()=>{
    console.log(days, 'days here')
  },[days])

  useEffect(() => {
    let date = [];
    let thisYear = new Date(`January 1, ${+year}`);

    while (
      thisYear.getMonth() !== 0 ||
      thisYear.getDate() !== 1 ||
      thisYear.getFullYear() === +year
    ) {
      date.push({ day: thisYear.toDateString(), cardsStudied: 0 });
      thisYear.setDate(thisYear.getDate() + 1);
    }
    setDays(date);
    let today = new Date().toDateString();
    if (dataBase?.DeckNames) {
      for (let deck in dataBase.DeckNames) {
        //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')

        // cardsStudied?.dataBase?.DeckNames[deck]?.data?.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length

         //let cardsStudied = dataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length
        let todaysAmount = dataBase.DeckNames[deck].data.filter((item) =>
          item?.openHistory?.some(
            (item) => new Date(item).toDateString() === today
          )
        ).length;
        console.log(todaysAmount, 'cards studied today')
        let index = date.findIndex((day) => day.day === today);
        console.log(index);
        // debugger
        //  date[index].cardsStudied += todaysAmount;
        setDays(date);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year,dataBase?.DeckNames]);


  /*method checks whether the index that was triggered via the clickhandler
  is a day where cards where studied*/

  function clickHandler(e, index) {
    let inner= e.target.getBoundingClientRect();
    let day = index;
    let findday = days.findIndex((el, index)=>day ===index && el.cardsStudied)
    setStudiedOnThisDay([...findday])
           
    if((outer.right - inner.right) < 126){
        setRight(outer.right - inner.right - 126)    
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
          className={`day ${day?.cardsStudied ? 'pointer backgroundRed' : ''}`}
          onClick={(e)=>clickHandler(e, index)}
        >
          {studiedOnThisDay ===index &&
   
            <div className='stats__study-info posAbsolute top-20px'
              style={{left: right+'px'}}
              ref={innerStat}
            >
              {day.day}
              <div className='top-30px posAbsolute'>
                Time:
              </div>
              <div className='top-56px posAbsolute'>                          
              </div>
            </div>
          }
        </div>
      ))}
    </div>
 
  )
    

}

export default RenderDays
