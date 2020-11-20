

$(document).ready(function () {

  // declare initial array of superheros through an array (put in at least 5 superheros)
  var topics = []


  // function that displays info on all superherso by calling API and retrieving info
  function displayHeros() {
    $("#hero-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=pspmxFY6WisHmo9hRDqVG0ExuJLVuC82&q=" + topic + "&limit=10&offset=0&rating=PG&lang=en";

    //  Write your ajax call to get information from the giphy api
    // Make sure and set an alert for if you don't find a superhero
    

        // Save API response call (JSON) to a results variable

        // create a variable to collect your results
        // **********************************************************************************
        // create a for loop to loop through the results with variables to show the following
        // The hero's name (use jQuery to make an div with a class called hero-name)
        // The gif's rating (use jQuery to make a p tag)
        // The gif's URL 
        // And finally, the gif itself (use jQuery to make an img tag)
        // add attributes to pause and play the gifs
        // append the gif and rating
        // Prepend the variable to the hero-view class in the html
        // **********************************************************************************
        
  };
  // Function for making and displaying buttons
  function renderButtons() {
    $(".buttons-view").empty();

    for (var x = 0; x < topics.length; x++) {
      var makeButtons = $("<button>");
      makeButtons.addClass("topic btn btn-danger");
      makeButtons.attr("data-name", topics[x]);
      makeButtons.text(topics[x]);
      $(".buttons-view").append(makeButtons);
    }
  }

  // Function to remove buttons
  function removeButton() {
    $("#hero-view").empty();
    var topic = $(this).attr("data-name");
    var itemIndex = topics.indexOf(topic);
    if (itemIndex > -1) {
      topics.splice(itemIndex, 1);
      renderButtons();
    }
  }
// **********************************************************************************
// Create a function to set the differnt states of the gifs for animated or still
// **********************************************************************************
  function playGif() {
    // var state = $(this).attr("data-state");
    // if (state === "still") {
    //   $(this).attr("src", $(this).attr("data-animate"));
    //   $(this).attr("data-state", "animate");
    // } else {
    //   $(this).attr("src", $(this).attr("data-still"));
    //   $(this).attr("data-state", "still");
    // }
  }
  $("#add-hero").on("click", function (event) {
    event.preventDefault();

    var hero = $("#input-hero").val().trim();

    if (topics.toString().toLocaleLowerCase().indexOf(hero.toLocaleLowerCase()) != -1) {
      alert("Hero already exists!");
    } else {
      topics.push(hero);
      renderButtons();
    }
  });

  $(document).on("click", ".topic", displayHeros);

  $(document).on("click", ".animate-gif", playGif);

  $(document).on("dblclick", ".topic", removeButton);

  renderButtons();


});