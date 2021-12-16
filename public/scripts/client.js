/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  const $tweetContainer = $('#tweet-container');

  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $tweetContainer.prepend($newTweet);
  }

}

const createTweetElement = function(tweet) {
  let $tweet = `<article class="one-tweet">
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
</article> `;

  return $tweet;
}

//renderTweets(data);
