import React, {useEffect, useState, useContext} from 'react'
import {Context} from '../Context'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function ChartComp() {

  interface Chart {
    // labels: (string[] | undefined)[],
    // legend: { labels: { generateLabels: () => string; };
    legend?:{
    labels: {
      generateLabels: () => string;
  }
},
    datasets: {
      data: (number| undefined)[];
      backgroundColor: (string | undefined)[];
      borderColor: (string | undefined)[];
      borderWidth: number;
  }[]
  }


  const { dataBase} = useContext(Context);
  const [chartData, setChartData] = useState<Chart>({
  datasets: []})

  let dataData: number [] = []
  let backgroundColorData=["#FF6384","#5aaa95"]
  let borderColorData = ["#FF6384","#5aaa95"]
  // https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript

//  var config = {
//   type: 'doughnut',
//   data: {
//     legend:{
//       labels:{
//         generateLabels: function(){
//           return ''
//         }
//       }
//     }
//     ,
//     datasets: [{
//       data: [
//         // 300, 50, 100
//       ],
//       backgroundColor: [
//         //  "#FF6384",
//         //  "#36A2EB",
//          "#5aaa95", "#FF6384"
//         // "#FFCE56"
//       ],
//       borderColor: [
//         "#5aaa95", "#FF6384"
//       ],
//       borderWidth: 0,
//       // hoverBackgroundColor: [
//       //   "#FF6384",
 
//       // ]
//     }]
//   },
//   options: {
//     elements: {
//     // center:{
//     //       text:null,
//     //   // text: `Daily Goal \n ${(dataBase.deckCompleted * 100) /
//     //   //   Object.keys(dataBase.DeckNames).length} %`,

//     //   // text: `Daily Goal \n ${(dataBase.deckCompleted * 100) /
//     //   //   Object.keys(dataBase.DeckNames).length} %`,

//     //   fontStyle: "Times", // Default is Arial
//     //   // sidePadding: 2, // Default is 20 (as a percentage)
//     //   minFontSize: 11, // Default is 20 (in px), set to false and text will not wrap.

//     //   // lineHeight: 19,
//     //   // Default is 25 (in px), used for when text wraps
     
//     // },
//   },
//     tooltips: false, //removes the tooltips from the diagram that are present in the diagram in stats
//     hover: {mode: null}, //when hovered over the diagram sections, nothing flashes or highlights
  
 
    
//     cutoutPercentage: 81,
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         top: 10
//       },
//       border: 'none'
//     }
//   }
// };

const options:any = {
  elements: {
  // center:{
  //       text:null,
  //   // text: `Daily Goal \n ${(dataBase.deckCompleted * 100) /
  //   //   Object.keys(dataBase.DeckNames).length} %`,

  //   // text: `Daily Goal \n ${(dataBase.deckCompleted * 100) /
  //   //   Object.keys(dataBase.DeckNames).length} %`,

  //   fontStyle: "Times", // Default is Arial
  //   // sidePadding: 2, // Default is 20 (as a percentage)
  //   minFontSize: 11, // Default is 20 (in px), set to false and text will not wrap.

  //   // lineHeight: 19,
  //   // Default is 25 (in px), used for when text wraps
   
  // },
},
plugins:{
  tooltip: {enabled:false}, //https://www.chartjs.org/docs/latest/configuration/tooltip.html
},
  hover: {mode: null}, //when hovered over the diagram sections, nothing flashes or highlights
  cutout: 27, //https://stackoverflow.com/questions/21014123/how-to-vary-the-thickness-of-doughnut-chart-using-chartjs
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10
    },
    border: 'none'
  }
}
  if (Object.keys(dataBase.DeckNames).length > 0) {
    dataData.push(
      (Object.keys(dataBase?.DeckNames).length || 0) - (dataBase?.deckCompleted || 0),
      dataBase.deckCompleted
    )
    }
  
      if(dataBase.userPreferences.backgroundColor === 'default') {
      
       } else if (dataBase.userPreferences.backgroundColor === 'dark') {
   
           backgroundColorData.push("#5aaaff")
           backgroundColorData.push("#FF6384")
         } else {
           backgroundColorData.push("#86a873")
           backgroundColorData.push("#FF6384")
   
         }

  useEffect(()=>{
    setChartData({
      legend:{
        labels:{
          generateLabels: function(){
            return ''
          }
        }
      }
      ,
      datasets: [{
        data: dataData,
        backgroundColor: backgroundColorData,
        borderColor: borderColorData,
        borderWidth: 0,
        // hoverBackgroundColor: [
        //   "#FF6384",
   
        // ]
      }]
    })
  },[])

  return (
  <div className='width200px height100px posRelative left--45px'>
    <Doughnut
      datasetIdKey='id'
      data={chartData}
      options={options}
  />
    </div>
  )
}