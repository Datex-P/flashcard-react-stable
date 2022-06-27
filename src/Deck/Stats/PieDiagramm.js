import React, {useEffect,useState, useContext} from 'react'
import {Context} from '../../Context'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function ChartComp() {

const [chartData, setChartData] = useState({
  datasets: [],
});

const { dataBase} = useContext(Context);

const options =  {
  elements: {
  center:{
   display: true,
   text:'',
//   text: 'text here',
    // text: `${!dataBase.openedToday ? 'No cards studied today'
    //       //<div style='font-size:12px'>No data</div> 
    //       :
    //       `Data from ${new Date().toLocaleString('de-DE', {
    //         day: 'numeric',
    //         month: 'numeric',
    //         year: 'numeric',
    //       })}`}`,           
    color: 'black',
    fontStyle: 'Arial', // Default is Arial
    sidePadding: 2, // Default is 20 (as a percentage)
    minFontSize: 16, // Default is 20 (in px), set to false and text will not wrap.
    lineHeight: 19, 
  }
},
plugins:{
  legend: {
    position: 'bottom',
    labels: {
      fontColor: 'black'
    }
  }
}
,
  cutout: 43,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10
    },
    border: 'none'
  }
}

let labelsData = []
let backgroundColorData = []
let borderColorData = []
let dataData = [3,4,5,5,10]
let hoverBackgroundColorData = []

for (let deck in dataBase.DeckNames) {

  let deckItem = dataBase.DeckNames[deck]
  /*when card of deck was opened today, the label is pushed to the diagram 
  in stats -->*/
  deckItem.data.filter((item) => {
    if(new Date(item?.openHistory?.[0]).toDateString() === new Date().toDateString()) {
      if(!labelsData.includes(deckItem.name)) {
        labelsData.push(deckItem.name)
      }
    }})
    let date = new Date()
    // todayCardsStudiedCounter++
  if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString())) {
  //  cardsStudiedCounter += deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length
  //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')
    labelsData.push(deckItem.name)
    dataData.push(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length)
    backgroundColorData.push(deckItem.color)
    borderColorData.push(deckItem.color)
    hoverBackgroundColorData.push(deckItem.color)
  }
}

useEffect(()=>{
  setChartData({
       labels:labelsData,
      // legend:{
      //   labels:{
      //     generateLabels: function(){
      //       return ''
      //     }
      //   }
      // },
      datasets: [
        {
        data: dataData,
        backgroundColor: backgroundColorData,
        borderColor: borderColorData,
        borderWidth: 0,
        hoverBackgroundColor: hoverBackgroundColorData
      }
      ]
  })
},[])

useEffect(()=>{
  console.log(chartData, 'chart data here')
},[chartData])

return (
  <Doughnut
      datasetIdKey='id'
      data={chartData}
      options={options}
  />
   )
}

