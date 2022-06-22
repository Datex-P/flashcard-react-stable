import React, {useEffect, useRef, useState, useContext} from 'react'
import Chart from "chart.js";
import {Context} from '../../Context'
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

export default function ChartComp() {

const chartRef = useRef(null);
const [chartData, setChartData] = useState({
  datasets: [],
});
  const { dataBase} = useContext(Context);
  // let ctx = useRef(null)

//  var config = {
//   type: 'doughnut',
//   data: {
//     labels: [
//       // "Red",
//     ],
//     datasets: [{
//       data: [
//         //  300, 50, 100
//       ],
//       backgroundColor: [
//         //  "#FF6384",
//       ],
//       borderColor: [
//         //  'rgba(184, 156, 110, 0.95)',  
//       ],
//        borderWidth: 0,
//       hoverBackgroundColor: [
//       //  "#FF6384",
//       ]
//     }]
//   },
//   // options: {
//   //   elements: {
//   //   center:{
//   //    display: true,
//   //    text:'',
//   // //   text: 'text here',
//   //     // text: `${!dataBase.openedToday ? 'No cards studied today'
//   //     //       //<div style='font-size:12px'>No data</div> 
//   //     //       :
//   //     //       `Data from ${new Date().toLocaleString('de-DE', {
//   //     //         day: 'numeric',
//   //     //         month: 'numeric',
//   //     //         year: 'numeric',
//   //     //       })}`}`,           
//   //     color: 'black',
//   //     fontStyle: 'Arial', // Default is Arial
//   //     sidePadding: 2, // Default is 20 (as a percentage)
//   //     minFontSize: 16, // Default is 20 (in px), set to false and text will not wrap.
//   //     lineHeight: 19, 
//   //   }
//   // },
//   //   legend: {
//   //     position: 'bottom',
//   //     labels: {
//   //       fontColor: 'black'
//   //     }
//   //   },
//   //   cutoutPercentage: 81,
//   //   maintainAspectRatio: false,
//   //   layout: {
//   //     padding: {
//   //       top: 10
//   //     },
//   //     border: 'none'
//   //   }
//   // }
// };

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
  legend: {
    position: 'bottom',
    labels: {
      fontColor: 'black'
    }
  },
  cutoutPercentage: 81,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10
    },
    border: 'none'
  }
}


let labelsData = [
1,2,3,4
]
let backgroundColorData = [
'green', 'blue','black'
]
let borderColorData = [
'yellow', 'white','green'
]
let dataData = [
2,4,4,5,
]
let hoverBackgroundColorData = [
'green', 'blue','black'
]


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

    /*<----*/
    // todayCardsStudiedCounter++
  //   console.log(item, 'item here')
  //   config.data.labels.push(deckItem.name)
  // }
  if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString())) {

  //  cardsStudiedCounter += deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length
  //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')
//  config.data.labels.push(deckItem.name)
    
    //config.data.datasets[0].data.push(10)
    dataData.push(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length)
    //config.data.datasets[0].backgroundColor.push('yellow')
    backgroundColorData.push(deckItem.color)
    borderColorData.push(deckItem.color)
    hoverBackgroundColorData.push(deckItem.color)
  }
}

useEffect(()=>{
  setChartData({
      labels:[],
      datasets: [
        {
    data: [],
    backgroundColor: [],
    borderColor: [],
     borderWidth: 0,
    hoverBackgroundColor: [
    //  "#FF6384",
    ]
  }
]
})
},[])

useEffect(()=>{
  console.log(chartData, 'chart data here')
},[chartData])


//setChartData({...chartData,backgroundColor:['blue'] })


  // useEffect(() => {
  //   if(ctx.current){
  //     new Chart(ctx.current, config);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //     let date = new Date().toDateString()

  //     for (let deck in dataBase.DeckNames) {

  //       let deckItem = dataBase.DeckNames[deck]

  //       /*when card of deck was opened today, the label is pushed to the diagram 
  //       in stats -->*/

  //       deckItem.data.filter((item) => {
  //         if(new Date(item?.openHistory?.[0]).toDateString() === new Date().toDateString()) {
  //           if(!config.data.labels.includes(deckItem.name)) {
  //             config.data.labels.push(deckItem.name)
  //           }
  //         }})

  //         /*<----*/
  //         // todayCardsStudiedCounter++
  //       //   console.log(item, 'item here')
  //       //   config.data.labels.push(deckItem.name)
  //       // }
  //       if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString())) {


  //       //  cardsStudiedCounter += deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length
  //       //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')
  //     //  config.data.labels.push(deckItem.name)
          
  //         //config.data.datasets[0].data.push(10)
  //         config.data.datasets[0].data.push(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length)
  //         //config.data.datasets[0].backgroundColor.push('yellow')
  //         config.data.datasets[0].backgroundColor.push(deckItem.color)
  //         config.data.datasets[0].borderColor.push(deckItem.color)
  //         config.data.datasets[0].hoverBackgroundColor.push(deckItem.color)
  //       }
  //     }

      
  //   }
  // }, [ctx])


  return (
  
    <Doughnut
  datasetIdKey='id'
  data={chartData}
  options={options}
/>
   )
}

