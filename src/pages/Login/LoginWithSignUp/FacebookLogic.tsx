import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../../../context/Context';

export const FacebookLogic = () => {

  let history = useHistory();
  const { apiURL, setEmail, setDataBase } = useContext(Context);


  async function facebookUser(value) {
    try {
      let { email, name } = value;
      let response = await fetch(`${apiURL}/facebook_login`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email
        }),
      });

      const {createUser, deck}= await response.json()
      let user = createUser
 
      if (response.status === 200) { 
        setEmail(email); //current logged in user is primary key in database
        setDataBase({
          DeckNames: deck?.map((el)=> ({name:el.deckName,
             backgroundColor:el.backgroundColor,
             data:el.data})) || []
             ,
           active:2,
           queue: [],
           checkboxClicked: false,
           showDeleteFrame: true,
           openedToday: true,
           deckCompleted: user?.deckCompleted || 0, //decks where user reached study goal
           timeValues: {
             left: 2,
             middle: 5,
             right: 10
           },
           breakdownIntervals: [
             {month: 1},
             {month: 3},
             {month: 12}
           ],
           userTimePreferences: [
             {
               name: user?.userTimePreferences?.[0].name || 'again',
               amount: user?.userTimePreferences?.[0].amount || 2,
               unit: user?.userTimePreferences?.[0].unit || 'min'
             },
             {
               name: user?.userTimePreferences?.[1].name || 'good',
               amount: user?.userTimePreferences?.[1].amount || 5,
               unit: user?.userTimePreferences?.[1].unit || 'min'
             },
             {
               name: user?.userTimePreferences?.[2].name || 'easy',
               amount: user?.userTimePreferences?.[2].amount || 10,
               unit: user?.userTimePreferences?.[2].unit || 'min'
             }
           ],
           userPreferences: {
             days: user?.userPreferences?.days || 0, //days that user wants to study
             backgroundColor: user?.backgroundColor || 'default',
             weeksInRow: user?.userPreferences?.weeksInRow || 0, //weeks in a row where user reached study goal
             toReview: user?.userPreferences?.toReview || 0
           },
           hourlyBreakdown: user?.hourlyBreakdown || '1 month',
           studyTime: user?.studyTime || 0,
           calendarReset: false,
           weeklyTarget: user?.weeklyTarget || 1,
           daysOfStudyThisWeek: user?.daysOfStudyThisWeek || 0, //days the user actually studied this week, as soon as he interacts with deck it counts as studied
           studied: [new Date()]      
         })
        history.push('/main');
      }
    } catch (err) {
      console.log(err, 'err here');
    }
  }
  return {
    facebookUser
  }
}