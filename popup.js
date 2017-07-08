let gapi_state = 0;
let youtube_search_results = []
const NUM_SEARCH_RESULTS = 10;

function SearchResultRow(title, description, thumbnail_url, videoId) {
  this.title = title;
  this.description = description;
  this.thumbnail_url = thumbnail_url;
  this.videoId = videoId;
}

function start() {
  gapi_state = 1;
  gapi.client.init({
    'apiKey': 'AIzaSyD98bluzT_oxioGc1iLm_2_O242U2f7cvU',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(function (response) {
    gapi_state = 2;
    console.log('gapi initialized');
  }, function (error) {
    gapi_state = 3;
    console.log(error);
  });
};

function loadClient() {
  if (gapi_state == 0){
    gapi.load('client', start);
  } else {
    console.log('gapi initialization already started');
  }
}

function executeRequest(search_query) {
  gapi.client.request({
    path: '/youtube/v3/search',
    params: {
      'maxResults': NUM_SEARCH_RESULTS,
       'part': 'snippet',
       'q': search_query,
       'type': ''
    }
  }).then(function (response) {
    youtube_search_results = response.result.items;
    showResults();
  }, function (reason) {
    console.error(reason);
  });
}

function search(search_query) {
  if (gapi_state == 0){
    loadClient();
    console.log('please wait gapi is getting initialized');
  } else if (gapi_state == 1){
    console.log('please wait gapi is initializing');
  } else if (gapi_state == 2){
    youtube_search_results.length = 0;
    executeRequest(search_query);
  } else if (gapi_state == 3){
    console.log('previous initialization failed');
  }
}

function showResults() {
  console.log(youtube_search_results);
}

$('#search_term').keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
    search(e.target.value);
    return false;
  }
});

// to know more about CSP read below article
// https://www.html5rocks.com/en/tutorials/security/content-security-policy/
