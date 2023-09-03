/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to prevent XSS attack
const escape = function (str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    //create a new jQuery object that represents a 'tweet' html structure
    //Get the article class
    const $tweet = $("<article>").addClass("tweet")
    const tweetContent = `
  <header>
    <img src="${tweet.user.avatars}">
    <h4>\u00A0\u00A0${tweet.user.name}</h4>
    <p>${tweet.user.handle}</p>
  </header>
  <p>${escape(tweet.content.text)}</p>
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
  const $form = $('#tweet-form');//Retreive the form
  const $tweetTxt = $('#tweet-text');
  console.log($form, $tweetTxt);
  // Listen for form submissions
  $form.on('submit', (event) => {
    event.preventDefault(); // Stop the form from loading a new page
    const $formData = $form.serialize();
    if (!$tweetTxt.val()) {
      $('#error')
      .slideDown('slow')
      setTimeout(() => {
        $('#error').slideUp('slow');
      }, 2500)
    } else if ($tweetTxt.val().length > 140) {
      $('#error-msg')
        .slideDown('slow')
      setTimeout(() => {
        $('#error-msg').slideUp('slow');
      }, 2500)
    } else {
      $.ajax({ // Submit form data using Ajax
        type: "POST",
        url: '/tweets',
        data: $formData,
        success: () => {
          console.log("Tweet data loaded:", $formData);
          //Run Ajax to retrieve tweet data
          fetch('/tweets')
            .then(loadTweets => loadTweets.json())
            .then((data) => {
              console.log(data);
              //call renderTweets to display the tweets
              renderTweets(data);
              $tweetTxt.val('');//sets the value empty for text input field
              $('.counter').text('140');
            });
        },
        error: (error) => { console.error(error); } //Display errors if there are any
      });
    };
  });
});