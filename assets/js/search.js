// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

var API_KEY='AIzaSyDWaqynidz0hLIW5iC2RPbT9_Ym5GWeA7k'
var CHANNEL_ID='UCJ9f0cswE2rRuFDplR1ZKsw'

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML = responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', function(){		
		gapi.client.setApiKey(API_KEY);
	});
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
	gapi.client.load('youtube', 'v3', function(){
		gapi.client.setApiKey(API_KEY);		
	});
	
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        "channelId": CHANNEL_ID,
        "channelType": "any",
        "eventType": "none",
        "maxResults": 25,
        "order": "relevance",
        "safeSearch": "none",
        "videoCaption": "any",
        "videoDefinition": "any",
        "videoDimension": "any",
        "videoDuration": "any",
        "videoEmbeddable": "any",
        "videoLicense": "any",
        "videoSyndicated": "any",
        "videoType": "any",
        "q": $("#query").val()
    }).then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        showResponse(response);
      },
      function(err) { console.error("Execute error", err); });
        
  }

$(function(){
	$("#search").on("click", function(){
		search();
		$("body").append($("<div>heyhey hey</div>"));
	}
	);
})