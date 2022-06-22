import React, {useEffect, useState, useContext} from 'react'
import {Context} from '../Context'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function ChartComp() {

  const { dataBase} = useContext(Context);
  const [chartData, setChartData] = useState({
    datasets: []
  })

  let dataData = []
  let backgroundColorData=[]
  let borderColorData = []

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

const options = {
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
  //tooltips: false, //removes the tooltips from the diagram that are present in the diagram in stats
  hover: {mode: null}, //when hovered over the diagram sections, nothing flashes or highlights
  tooltips:{enabled:false},

  
  cutoutPercentage: 81,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10
    },
    border: 'none'
  }
}
    dataData.push(
      Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
      dataBase.deckCompleted
    );

  
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
    <div style={{width: '200px', height:'100px', 
    position: 'relative',
    left: '40px'
    }}>
    <Doughnut
      datasetIdKey='id'
      data={chartData}
      options={options}
  />
    </div>
  )
}