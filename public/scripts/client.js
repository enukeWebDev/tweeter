/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Fake data taken from initial-tweets.json
/*
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
 
$(document).ready(function() {
  renderTweets(data);
});
 
*/
$(document).ready(function() {

  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="one-tweet">
  <div class="tweet-header">
    <div class="tweet-er">
      <img class="tweet-er-pic" src="${tweet.user.avatars}" />
      <p class="name">${tweet.user.name}</p>
    </div>
    <p class="at-name">${tweet.user.handle}</p>
    </div>
  <p class="tweets">${tweet.content.text}</p>
  <footer>
    <div>
      <p class="timeago">${timeago.format(tweet.created_at)}</p>
    </div>
    <div class="actions">
      <i class="fas fa-retweet"></i>
      <i class="far fa-comment"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
</article> `);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $tweetContainer = $('#tweet-container');

    for (const tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $tweetContainer.prepend($newTweet);
    }
  };

  /*
  This function is responsible for:
  - fetching tweets from the http://localhost:8080/tweets page
  - will use jQuery to make request to /tweets and receive the 
  array of tweets as JSON
  */
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((error) => console.log(error));
  };
  loadTweets();



  /*
  To handle the form submission ourselves and send POST request asynchronously:
  - Add an event listener 
  - Prevent the default behaviour of the submit event (prevent reloading the page)
  
  Form Data:
  - The jQuery .serialize() function turns a set of form data into a quesry string
  - Serializes data will be sent to the server in the data field of the AJAX POST request
  - .serializeArray will create an array of objects - ready to be encoded as a JSON string
  
  Form Validation:
  - The user should be given an error that their tweet contetnt is too
  long or that it is not present(empty/null)
  - The form should not be cleared
  - The form should not submit
  */

  const $formSubmitProcess = $('.tweet-form');
  $formSubmitProcess.on('submit', function(event) {
    event.preventDefault();

    let data = $(this).serialize();
    let queryString = $(this).serializeArray()[0];

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data,
      success: function(resp, status, xhr) {
        $('counter').text(140);
        $('#tweet-text').val('');
        loadTweets();
      },
      error: function(xhr, status, errorThrown) { },
      complete: function() { }
    });
  });
});
