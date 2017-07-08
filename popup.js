let gapi_state = 0;

function start() {
  gapi.client.init({
    'apiKey': 'AIzaSyD98bluzT_oxioGc1iLm_2_O242U2f7cvU',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(function (response) {
    gapi_state = 1;
    console.log('gapi initialized');
  }, function (error) {
    console.log(error);
  });
};

function loadClient() {
  gapi.load('client', start);
}

function executeRequest(search_query) {
  gapi.client.request({
    path: '/youtube/v3/search',
    params: {
      'maxResults': '25',
       'part': 'snippet',
       'q': search_query,
       'type': ''
    }
  }).then(function (response) {
    console.log(response);
  }, function (reason) {
    console.error(reason);
  });
}

function search(search_query) {
  executeRequest(search_query);
}

$('#search_term').keypress(function (e) {
  if (e.which == 13) {
    console.log(e.target.value);
    return false;
  }
});

// to know more about CSP read below article
// https://www.html5rocks.com/en/tutorials/security/content-security-policy/
