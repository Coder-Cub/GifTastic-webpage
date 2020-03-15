

$(document).ready(function () {

  // declare initial array of superheros
  var superHeros = ['Wonderwoman', 'Spiderman', 'Green Lantern', 'Batman', 'Captain America', 'Lotho', 'Superman', 'The Flash']


  // all functions

  
  // function that displays info on all superherso by calling API and retrieving info
  function displayHeros() {
    $("#hero-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=pspmxFY6WisHmo9hRDqVG0ExuJLVuC82&q=" + superHeros + "&limit=10&offset=0&rating=PG&lang=en";
    
    // ajax call to get information
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
      if (response.pagination.total_count == 0) {
        alert("Sorry, we are all out of GIFs for this superhero today!");
        var itemIndex = superHeros.indexOf(topic);
        if (itemIndex > -1) {
          topic.splice(itemIndex, 1);
          renderButtons();
        }
      }

      // Save API response call (JSON) to a results variable
      var results = response.data;
      for (var i = 0; i < results.length; i++){
        var newHeroDiv = $("<div class='hero-name'>");
        var gifRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
        var gifTitle = $("<p>").text("Title: " + results[i].title.toUpperCase());
        var gifURL = results[i].images.fixed_height_still.url;
        var gif = $("<img>");
        gif.attr("src", gifURL);
        gif.attr("data-still", results[i].images.fixed_height_still.url);
        gif.attr("data-animate", results[i].images.fixed_height.url);
        gif.attr("data-state", 'still');
        gif.addClass ('animate-gif');
        // Append info
        newHeroDiv.append(gifRating);
        newHeroDiv.append(gifTitle);
        newHeroDiv.append(gif);
        // Put saved info in new div
        $("#hero-view").prepend(newHeroDiv);
      }
    });
  };
  // Function for making and displaying buttons
  function renderButtons() {
    $(".buttons-view").empty();

    for (var x = 0; x < superHeros.length; x++) {
      var makeButtons = $("<button>");
      makeButtons.addClass("topic btn btn-info");
      makeButtons.attr("data-name", superHeros[x]);
      makeButtons.text(superHeros[x]);
      $(".buttons-view").append(makeButtons);
    }
  }

// Function to remove buttons
  function removeButton () {
    $("#hero-view").empty();
    var topic = $(this).attr("data-name");
    var itemIndex = superHeros.indexOf(topic);
    if (itemIndex > -1) {
      superHeros.splice(itemIndex, 1);
      renderButtons();
  }
}

function playGif () {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
$("#add-hero").on("click", function(event){
  event.preventDefault();

  var hero = $("#input-hero").val().trim();

  if  (superHeros.toString().toLocaleLowerCase().indexOf(hero.toLocaleLowerCase()) != -1) {
    alert("Hero already exists!");
  } else {
    superHeros.push(hero);
    renderButtons();
  }
  console.log(hero)
})


})