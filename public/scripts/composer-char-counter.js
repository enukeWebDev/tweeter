console.log('Tweeter is getting ready...');

$(document).ready(function() {
  console.log('You can start Tweet-ing...');

  $('#tweet-text').keyup(function() {
    console.log('Clicked!!!');
  });
});