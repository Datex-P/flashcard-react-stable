export const RenderLogic = ({
  calBoxWidth,
  days,
  setStudiedOnThisDay, 
  setRight}) => {
  function clickHandler(e, index) {
    let inner = e.target.getBoundingClientRect();
    let day = index;
    let findday = days.findIndex((el, index)=>day ===index && el.cardsStudied)
    console.log(findday, 'findday here')
    setStudiedOnThisDay(findday) //find day inside {day: 'Sat Jan 01 2022', cardsStudied: 0} that matches clicked index
  //  if (calBoxWidth !== null) {
      let element = calBoxWidth.current
    const calendarDimension = element.getBoundingClientRect().right
    //calendarDimension => most right position of calendarBox  
    if((calendarDimension- inner.right) < 126) {
      setRight(calendarDimension - inner.right - 126)    
    }   
//  }
  }
  
  return {
    clickHandler
  }
}