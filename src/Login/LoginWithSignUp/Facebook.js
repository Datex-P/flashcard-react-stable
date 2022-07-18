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
          DeckNames: deck && deck.map((el,index, arr)=> ({name:el.deckName,
             backgroundColor:el.backgroundColor,
             data:el.data}))
             ,
          active:2,
           queue: [],
           checkboxClicked: false,
           showDeleteFrame: true,
           openedToday: true,
           deckCompleted: user.deckCompleted, //decks where user reached study goal
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
               name: user.userTimePreferences[0].name,
               amount: user.userTimePreferences[0].amount,
               unit: user.userTimePreferences[0].unit
             },
             {
               name: user.userTimePreferences[1].name,
               amount: user.userTimePreferences[1].amount,
               unit: user.userTimePreferences[1].unit
             },
             {
               name: user.userTimePreferences[2].name,
               amount: user.userTimePreferences[2].amount,
               unit: user.userTimePreferences[2].unit
             }
           ],
           userPreferences: {
             days: user.userPreferences.days, //days that user wants to study
             backgroundColor: user.backgroundColor,
             weeksInRow: user.userPreferences.weeksInRow, //weeks in a row where user reached study goal
             toReview: user.userPreferences.toReview
           },
           hourlyBreakdown: user.hourlyBreakdown,
           studyTime: user.studyTime,
           calendarReset: false,
           weeklyTarget: user.weeklyTarget,
           daysOfStudyThisWeek: user.daysOfStudyThisWeek, //days the user actually studied this week, as soon as he interacts with deck it counts as studied
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
