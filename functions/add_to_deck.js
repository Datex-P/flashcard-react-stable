require('dotenv').config();
const Deck = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {email, deckName, data} = JSON.parse(event.body);

 await Deck.updateOne(
  {email: email,
  deckName: deckName}, 
    {$push: {data: [{question: data[0].question, 
             answer: data[0].answer
    }  
  ]}
}      
)

if (email) {

    return {
        statusCode: 200,
       // body:JSON.stringify({'correct':'correct'})
    }
  } else {   
    return {
        statusCode: 500,
        body:JSON.stringify('Server Error')
    }
  }  
};
