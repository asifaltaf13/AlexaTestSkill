module.change_code = 1;
'use strict';

// dependencies
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );




// THIS FUNCTION RUNS WHEN THE SKILL IS INVOKED
app.launch( function( request, response ) {
	response.say( 'Ready to take notes' );	// initial response from alexa
	response.reprompt( 'I am waiting for instructions' )	// this message is heard if alexa did not hear anything from user
	response.shouldEndSession(false);
} );

app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};


// TO FIND OUT WHEN THE SESSION ENDS
app.sessionEnded(function(request, response) 
{
	response.say("Minute Taker is closing");
	console.log("session ended");
});



// NOTE TAKING INTENT
app.intent('noteTake',
  {
    "slots":{"note":"AMAZON.Actor"}
	,"utterances":[ 
		"meeting decision {note}",
		"take a decision {note}",
		"write down a decision {note}",
		"note that {note}"
		]
  },
  function(request,response) 
  {
    var note = request.slot('note');
	if (typeof(note) != "undefined")
	{
		response.say("Your note: " + note + " was created.");
		//var urlString = 'https://minutetaker.pythonanywhere.com/Minute_Taker/default/call/run/remote_insert/'+note+'/'+note
		//opn(urlString);
		
		var request = require('request');
		
		var note = "CodeFromConstantine";
		var urlString = 'https://minutetaker.pythonanywhere.com/Minute_Taker/default/call/run/remote_insert/'+note+'/'+note;
		request.get(urlString, function (error, response, body) {
		if (!error && response.statusCode == 200) 
		{
			//var csv = body;
			// Continue with your processing here.
			//console.log(body);
		}
		});
		//res.render('pages/index')
		
	}
	else
	{
		response.say("Pardon me. I could not hear a note.");
	}
  }
);


// MANUAL ENDING OF THE SESSION INTENT
app.intent('endSession',
  {
    "slots":{"note":"AMAZON.Actor"}
	,"utterances":[ 
		"thank you",
		"bye",
		"bye bye",
		"stop minute taker"
		]
  },
  function(request,response) 
  {
    response.say("Sure");
	response.shouldEndSession(true);
  }
);


module.exports = app;