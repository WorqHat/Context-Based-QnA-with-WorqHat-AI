/* jshint esversion:9 */

function createBlocks(data, distance) {
  const div = document.createElement("div");
  div.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "bg-white",
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow",
    "md:flex-row",
    "md:max-w-xl",
    "hover:bg-gray-100"
  );

  const img = document.createElement("img");
  img.classList.add(
    "object-cover",
    "w-full",
    "rounded-t-lg",
    "h-96",
    "md:h-auto",
    "md:w-48",
    "md:rounded-none",
    "md:rounded-l-lg"
  );
  img.loading = "lazy"; // add the lazy load attribute
  img.src = data.poster;
  img.alt = data.title;

  const innerDiv = document.createElement("div");
  innerDiv.classList.add(
    "flex",
    "flex-col",
    "justify-between",
    "p-4",
    "leading-normal"
  );

  const h5 = document.createElement("h5");
  h5.classList.add(
    "mb-2",
    "text-2xl",
    "font-bold",
    "tracking-tight",
    "text-gray-900"
  );
  h5.textContent = data.title;

  const p1 = document.createElement("p");
  p1.classList.add("mb-3", "font-normal", "text-gray-700");
  p1.textContent =
    data.overview.length > 200
      ? data.overview.slice(0, 200) + "..."
      : data.overview;

  const p2 = document.createElement("p");
  p2.classList.add("text-sm", "mt-3");

  const span = document.createElement("span");
  span.classList.add("font-medium", "text-gray-900");
  span.textContent = new Date(data.release_date * 1000).toLocaleDateString();

  p2.appendChild(document.createTextNode("Release Date: "));
  p2.appendChild(span);

  const span2 = document.createElement("span");
  span2.className =
    "bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded max-w-max mt-3";
  span2.title = "Distance from the Search Query is " + distance;
  span2.textContent = distance;

  innerDiv.appendChild(h5);
  innerDiv.appendChild(p1);
  innerDiv.appendChild(p2);
  innerDiv.appendChild(span2);

  div.appendChild(img);
  div.appendChild(innerDiv);

  document.getElementById("movieGrid").appendChild(div);
}

window.addEventListener("load", () => {
  movies.forEach((movie) => {
    createBlocks(movie);
  });
});

// Search API Integration

// So I have already created my account on WorqHat, created an Organization Workspace and I now have my API Key. I have also trained my search Model and have the Model ID. I have trained it using the Same Movie Data and I have taken the No-Code Approach. You can also train your data using the APIs as well.

// You can use the Training UI, when your data is going to remain constant and you can use the APIs when your data is going to change frequently. You can also add more data to your model using the APIs and the WorqHat UI as well.

// To create your own workspace, visit https://worqhat.com and click on the Get Started Button to Create a Workspace.

/**
 * The `fetchSearchData` function sends a POST request to an API endpoint with a query and retrieves
 * search results, which are then displayed on a webpage.
 * @param query - The `query` parameter is the search query or question that you want to send to the
 * API for fetching search data. It is the text that represents the user's search input or question.
 */
function fetchSearchData(query) {
  const data = JSON.stringify({
    question: query,
    training_data: "3b6c76a4-04c4-45f2-8372-09e2ee34f33e",
    search_count: 10,
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var content = JSON.parse(this.responseText);
      console.log(content);
      document.getElementById("movieGrid").innerHTML = "";
      content.data.forEach((movie) => {
        createBlocks(movie.results, movie.distance);
      });
      document.getElementById("counter").textContent = content.data.length;
    }
  });

  xhr.open("POST", "https://api.worqhat.com/api/ai/search/v3");
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