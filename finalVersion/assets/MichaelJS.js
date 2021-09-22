var button = document.getElementById("lengthButton");
button.addEventListener("click", searchMovieLength);
document
  .querySelector(".modal .modal-close")
  .addEventListener("click", closeModal);

function closeModal() {
  document.querySelector("#modal").classList.remove("is-active");
}

function searchMovieLength() {
  var length = document.getElementById("lengthdropdown").value;

  performTimeSearch(length);
}

function performTimeSearch(length) {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_runtime.gte=" +
      length,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGI4NDBhOTQwMjRkYjkyN2UwNGQ3NDI5MDc5YThhMyIsInN1YiI6IjYxMzQyY2FhMGI3MzE2MDAyYWM2YWFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.58X4jp1eA5k7TlNbmZxRphw11xdo28XelQE9Sd-DGLM",
      },
    }
  )
    .then(function (response) {
      console.log(response.status);
      if (response.status !== 200) {
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayLengthSearch(data, false);
      localStorage.lengthResults = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayLengthSearch(data, historic) {
  var html = "";

  if (historic === true) {
    html += '<strong class="bold"><em>Previous Results</em></strong><br>';
  } else if (historic == false) {
    html += '<strong class="bold"><em>Search Results</em></strong><br>';
  }

  for (let i = 0; i < data.results.length && i < 15; i++) {
    var movie = data.results[i];
    html += movie.original_title + "<br>";
  }

  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = html;
}

window.addEventListener("load", function () {
  if (localStorage.lengthResults) {
    var data = JSON.parse(localStorage.lengthResults);
    displayLengthSearch(data, true);
  }

  initYearResults();
  initGenreResults();
});
