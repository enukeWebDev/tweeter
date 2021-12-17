/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevent XSS with Escaping - function provide in Compass
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
- Function that will generate the DOM structure for a tweet - given a tweet object.
*/
$(document).ready(function() {

  /*
  Takes in a tweet object and is responsible for returning a tweet
  <article> element containing the entire HTML structure of the tweet
  */
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

  $('#error-alert').hide();

  $('#tweet-text').on('change keyup paste', function() {
    let tweetData = $('#tweet-text').val().length
    if (tweetData > 0 || tweetData < 140) {
      console.log('tweetData', tweetData);
      $('#error-alert').slideUp();
    }
  });

  const $formSubmitProcess = $('.tweet-form');
  $formSubmitProcess.on('submit', function(event) {
    event.preventDefault();


    let data = $(this).serialize();
    let queryString = $(this).serializeArray()[0].value;
    //console.log(queryString);


    let $error = $('#error-alert');
    let $errorMessage = $('#error-alert p');

    if (queryString.length > 140) {
      $errorMessage.text('Warning!!! Your tweet is too long - please try again!');

      $error.slideDown();
      // console.log('Warning!!! Your tweet is too long - please try again!')

    } else if (!queryString || !queryString.replace(/\s/g, '').length) {
      $errorMessage.text('Warning!!! You cannot tweet and empty message - please try again!');
      $error.slideDown();

    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: data,
        success: function(resp, status, xhr) {
          $('.counter').text(140);
          $('#tweet-text').val('');
          loadTweets();
        },
        error: function(xhr, status, errorThrown) { },
        complete: function() { }
      });
    }
  });
});
