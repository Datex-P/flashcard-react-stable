import FacebookLogin from "@greatsumini/react-facebook-login";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../../Context";

function Facebook() {
  
  let history = useHistory();
  const { apiURL, setEmail, setDataBase } = useContext(Context);
  let FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID

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
      console.log(createUser, 'create user')
      //console.log(deck, 'deck here')
      if (response.status === 200) {
      //  debugger
        setEmail(email); //current logged in user is primary key in database
        setDataBase({
          DeckNames: deck?.map((el,index, arr)=> ({name:el.deckName,
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
             days: user?.userPreferences.days || 0, //days that user wants to study
             backgroundColor: user?.backgroundColor || 'default',
             weeksInRow: user?.userPreferences?.weeksInRow || 0, //weeks in a row where user reached study goal
             toReview: user?.userPreferences?.toReview || 0
           },
           hourlyBreakdown: user?.hourlyBreakdown || '1 month',
           studyTime: user?.studyTime || 0,
           calendarReset: false,
           weeklyTarget: user?.weeklyTarget || 0,
           daysOfStudyThisWeek: user?.daysOfStudyThisWeek || 0, //days the user actually studied this week, as soon as he interacts with deck it counts as studied
           studied: [new Date()],       
         })
        history.push('/main');
      }
    } catch (err) {
      console.log(err, 'err here');
    }
  }

  return (
    <div className='facebookBtn'>
      <FacebookLogin
        appId={`${FACEBOOK_ID}`}
        style={{
          backgroundColor: "#4267b2",
          color: "#fff",
          fontSize: "13px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
          position: "relative",
          zIndex: "4",
          cursor: "pointer",
        }}
        onSuccess={(response) => {
          console.log('hello from on success', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          facebookUser(response);
          console.log('Get Profile Success!', response);
        //  history.push('/main')
        }}
      />
    </div>
  );
}

export default Facebook;
