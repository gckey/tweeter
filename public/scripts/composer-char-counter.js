$(document).ready(function() {
  //target required textarea element, setup event handler
  $('#tweet-text').on('keyup', function() {
    const maxLength = 140;
    //Get user input text value
    const charCount = maxLength - $(this).val().length;
    numChars = $('.counter');
    numChars.text(charCount); // display char count
    if (charCount < 0) {
      numChars.css('color', '#BC0A0F');//Turn counter to red if character count exceed the 140 limit
    } else {
      numChars.css('color', '#545149');
    }
  });
});