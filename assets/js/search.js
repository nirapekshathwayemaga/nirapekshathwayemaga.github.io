// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
var API_KEY='AIzaSyAN2p96WqS6t_94-dLih8KmyoqeykjL0k0'
var CHANNEL_ID='UCJ9f0cswE2rRuFDplR1ZKsw'
var maxResults = 48;
var itemCount = 0;

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    // var responseString = JSON.stringify(response, '', 2);
    // document.getElementById('response').innerHTML = responseString;

    $("#response").empty();

    var nextPageToken = document.createElement('input');
    nextPageToken.setAttribute("id", "pageToken");
    nextPageToken.setAttribute("type", "hidden");
    nextPageToken.setAttribute("value", response.result.nextPageToken);
    $("#response").append(nextPageToken);

    for (var item of response.result.items) 
    {
        itemCount++;
        $("#response").append("<br/>");
        var template = `
            <article>
                <span class="image">
                    <img src="${item.snippet.thumbnails.high.url}" alt="" />
                </span>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
                    <h2 class="shadow20">${item.snippet.title}</h2>
                    <div class="content">
                        <p>${item.snippet.description}:${item.snippet.publishedAt}</p>
                    </div>
                </a>
            </article>
        `;
        $("#response").append(template);
    }
    $("#status").text(itemCount +" of "+response.result.pageInfo.totalResults);

    if(response.result.pageInfo.totalResults - itemCount > 0){
        $("#loadmore").show();
    }
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', function(){		
		gapi.client.setApiKey(API_KEY);
	});
}

function nextResults() {
    search();
}
function search() {
    // Use the JavaScript client library to create a search.list() API call.
	gapi.client.load('youtube', 'v3', function(){
		gapi.client.setApiKey(API_KEY);		
	});
	
   gapi.client.youtube.search.list({
        // "part": "snippet,contentDetails,statistics",
        "part": "snippet",
        "channelId": CHANNEL_ID,
        "channelType": "any",
        "eventType": "none",
        "maxResults": maxResults,
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
        "pageToken": $("#pageToken").val(),
        "q": $("#query").val()
    }).then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        showResponse(response);
      },
      function(err) { 
        console.error("Execute error", err);
        $("#response").append($("<div>Something went wrong. Please try reloading the page.</div>"));
     });
        
  }

$( document ).ready(function() {
    $("#loadmore").hide();
	$("#search").click(function(){
        $("#status").val($("<div>Loading...</div>"));
        $("#pageToken").val('');
        itemCount = 0;
		search();
        return false;
	});
    $("#SinhalaKeyboardDiv").hide();
    $("#SinhalaKeyboardToggleButton").click(function(){
        $("#SinhalaKeyboardDiv").toggle();
        $("#query").focus();
    });
});