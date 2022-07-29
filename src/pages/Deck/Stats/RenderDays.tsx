import React,  {useState, useEffect, useContext, useRef} from "react";
import { Context } from '../../../context/Context';

function RenderDays({year}) {

  const {dataBase} = useContext(Context);
  const calBoxWidth = useRef<null>(null)
  //useRef(null); //size of the calendar box 
  const [days, setDays] = useState<{day?:string, cardsStudied?:number}[] | []>([]); //objs of current year  {day: 'Sat Jan 01 2022', cardsStudied: 0}, {day: 'Sat Jan 02 2022', cardsStudied: 0}
  const [right,setRight]=useState(0)
  const [studiedOnThisDay, setStudiedOnThisDay] = useState<boolean | number>(false)


  useEffect(() => {
    let date: {day?: string, cardsStudied?:number}[]  = [];
    // https://bobbyhadz.com/blog/typescript-source-has-elements-but-target-allows
    let thisYear = new Date(`January 1, ${+year}`);
    let todaysAmount = 0

    while (thisYear.getMonth() !== 0 ||
           thisYear.getDate() !== 1 ||
           thisYear.getFullYear() === +year
    ) {
      date.push({ day: thisYear.toDateString(), cardsStudied: 0 });
      thisYear.setDate(thisYear.getDate() + 1);
    }
    setDays(date);
    let today = new Date().toDateString(); //date of current day e.g. 04.07.22
    if (dataBase?.DeckNames) {
      for (let deck in dataBase.DeckNames) {
        //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')

        // cardsStudied?.dataBase?.DeckNames[deck]?.data?.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length
         //let cardsStudied = dataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length
         
         let newAmount = dataBase.DeckNames[deck].data.filter((item) =>
          item?.openHistory?.some(
            (item) => new Date(item).toDateString() === today)).length;
          if (newAmount> todaysAmount) {
            todaysAmount = newAmount //otherwise todaysAmount might end up 0 because of loop
          }
          let indexOfCurrentDay = date.findIndex((day) => day.day === today); // find index 0-364 of the current day inside newDays
          
 
          let newDays: any = [...date] //array of objs of current year  {day: 'Sat Jan 01 2022', cardsStudied: 0}, {day: 'Sat Jan 02 2022', cardsStudied: 0}

            if (todaysAmount >0 && newDays?.[indexOfCurrentDay]?.cardsStudied !== undefined) {     
            newDays[indexOfCurrentDay].cardsStudied += todaysAmount;           
            setDays(newDays);
            }
      }
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year,dataBase?.DeckNames]);


  /*method checks whether the index that was triggered via the clickhandler
  is a day where cards where studied*/

  function clickHandler(e, index) {
    let inner = e.target.getBoundingClientRect();
    let day = index;
    let findday = days.findIndex((el, index)=>day ===index && el.cardsStudied)
    console.log(findday, 'findday here')
    setStudiedOnThisDay(findday) //find day inside {day: 'Sat Jan 01 2022', cardsStudied: 0} that matches clicked index
  //  if (calBoxWidth !== null) {
      let element:any = calBoxWidth.current
    const calendarDimension = element.getBoundingClientRect().right
    //calendarDimension => most right position of calendarBox  
    if((calendarDimension- inner.right) < 126) {
      setRight(calendarDimension - inner.right - 126)    
    }   
//  }
  }

  return (
    <div 
      className='d-flex stats__year-box'
      ref={calBoxWidth}
     >
      {days.map((day, index) => (
        <div
          key={index}
          className={`stats__day ${day?.cardsStudied ? 'pointer stats__backgroundRed' : ''}`}
          onClick={(e)=>clickHandler(e, index)}
        >
          {
            studiedOnThisDay === index &&   
            <div 
              className='stats__study-info posAbsolute top-20px'
              style={{left: right+'px'}}
            >
              {day.day}
              <div className='top-30px posAbsolute'>
                Time:
              </div>
              <div className='top-56px posAbsolute'>
                Cards: {day.cardsStudied}                          
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export default RenderDays
