/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function () {
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
for (const tweet of tweets) {
  // calls createTweetElement for each tweet
  const $tweet = createTweetElement(tweet);
  // takes return value and prepend it to the tweets container, display latest tweet at the top
  $('.tweet-container').prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
//create a new jQuery object that represents a 'tweet' html structure.
//Get the article class
const $tweet = $("<article>").addClass("tweet") // let $tweet = /* Your code for creating the tweet element */ <article class="tweet">
const tweetContent = `
  <header>
    <img src="${tweet.user.avatars}">
    <h4>\u00A0\u00A0${tweet.user.name}</h4>
    <p>${tweet.user.handle}</p>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <p>${tweet.created_at}</p>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
`;
$tweet.append(tweetContent);
return $tweet;
};
renderTweets(data);
console.log("Rendered data:", data);
});