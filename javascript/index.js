/* jshint esversion:9 */

// Search API Integration

// So I have already created my account on WorqHat, created an Organization Workspace and I now have my API Key. I have also trained my AI Content Model and have the Model ID. I have trained it using the Same Movie Data and I have taken the No-Code Approach. You can also train your data using the APIs as well.

// You can use the Training UI, when your data is going to remain constant and you can use the APIs when your data is going to change frequently. You can also add more data to your model using the APIs and the WorqHat UI as well.

// To create your own workspace, visit https://worqhat.com and click on the Get Started Button to Create a Workspace.

var md = window.markdownit();
md.set({
  html: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

/**
 * The `fetchSearchData` function sends a POST request to an API endpoint with a query and retrieves
 * search results, which are then displayed on a webpage.
 * @param query - The `query` parameter is the search query or question that you want to send to the
 * API for fetching search data. It is the text that represents the user's search input or question.
 */
function fetchSearchData(query) {
  document.getElementById("searchResults").classList.toggle("hidden");
  document.getElementById("searchLoader").classList.toggle("hidden");

  const data = JSON.stringify({
    question: query,
    datasetId: "1d3f670d-bcdc-4fa3-969f-81476706ed7c",
    randomness: 0.1,
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var content = JSON.parse(this.responseText);
      console.log(content);
      if (this.status != 200) {
        alert("Something went wrong. Please try again later.");
      } else {
        console.log(content.answer);
        content = content.answer;
        content = content.replace(/<br>/g, "\n");
        var result = md.render(content);
        console.log(result);

        document.getElementById("searchResults").innerHTML = result;

        document.getElementById("searchResults").classList.toggle("hidden");
        document.getElementById("searchLoader").classList.toggle("hidden");
      }
    }
  });

  xhr.open("POST", "https://api.worqhat.com/api/ai/content/v2-large/answering");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer sk-721170e3cd914bd08a2f77113815d38e"
  );
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

/*
  First I need to rename by Input Element to searchMovies and the search button to searchButton. I will also add an event listener to the searchButton to listen for the click event. I will then call the fetchSearchData function and pass in the value of the searchMovies input element.
*/

/* This code is adding an event listener to the search button element with the id "searchButton". When
the button is clicked, it will execute the callback function. Inside the callback function, it
retrieves the value of the input element with the id "searchMovies" and assigns it to the variable
"query". It then logs the value of "query" to the console. Finally, it calls the fetchSearchData
function and passes in the value of "query" as an argument. */
document.getElementById("searchButton").addEventListener("click", () => {
  var query = document.getElementById("searchMovies").value;
  console.log(query);
  fetchSearchData(query);
});

var searchElements = document.getElementsByClassName("searchElement");

for (var i = 0; i < searchElements.length; i++) {
  searchElements[i].addEventListener("click", (e) => {
    var query = e.target.textContent;
    console.log(query);
    query = query.replace("/\n/g", "");
    query = query.replace("/\t/g", "");
    query = query.replace("/\r/g", "");
    query = query.trim();
    document.getElementById("searchMovies").value = query;
    fetchSearchData(query);
  });
}
