function start() {
  console.log('gapi loaded');
};

function loadClient() {
  gapi.load('client', start);
}

$('.input').keypress(function (e) {
  if (e.which == 13) {
    return false;
  }
});

// to know more about CSP read below article
// https://www.html5rocks.com/en/tutorials/security/content-security-policy/
