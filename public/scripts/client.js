/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function () {
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and prepend it to the tweets container, display latest tweet at the top
      $('.tweet-container').prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
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
    <p>${timeago.format(tweet.created_at)}</p>
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
  // renderTweets(data);

  const $form = $('#tweet-form');//Retreive the form
  const $txt = $('#tweet-text');
  console.log($form, $txt);
  // Listen for form submissions
  $form.on('submit', (event) => {
    event.preventDefault(); // Stop the form from loading a new page
    const $formData = $form.serialize();
    // Submit form data using Ajax
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $formData,
      success: () => { // do sth with data
        console.log("Tweet data loaded:", $formData);
        //Run Ajax to retrieve tweet data
        fetch('/tweets')
          .then(loadTweets => loadTweets.json())
          .then((data) => {
            console.log(data);
            //call renderTweets to display the tweets
            renderTweets(data);
          });
      },
      error: (error) => { console.error(error); } //Display errors if there are any
    });
  });
});