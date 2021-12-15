$(document).ready(function() {
  let tweetMessage = $('#tweet-text');
  let counter = $('.counter');

  tweetMessage.on('keyup', (event) => {
    let tweetLength = event.target.value.length;
    counter.val(140 - tweetLength);

    if (tweetLength > 140) {
      counter.css('color', '#FF0000');

    } else {
      counter.css('color', '#545149');
    }
  });
});