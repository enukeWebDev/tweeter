/*
This file is solely responsible for counting the characters when writing a Tweet.
The counter (number) will turn to 'red ink with negative sign' when the typed
character is more than 140 characters.
*/

$(document).ready(function() {
  //add message here
  let $tweetMessage = $('#tweet-text');
  let $counter = $('.counter');

  $tweetMessage.on('keyup', (event) => {
    let $tweetLength = event.target.value.length;
    $counter.val(140 - $tweetLength);

    if ($tweetLength > 140) {
      $counter.css('color', '#FF0000');

    } else {
      $counter.css('color', '#545149');
    }
  });
});