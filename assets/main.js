"use strict";

const apiKey = "348324-Adam-4Z4Z9W83";
const searchUrl = "https://tastedive.com/api/similar";
const queryURL = "https://cors-anywhere.herokuapp.com/" + searchUrl;
let genre = null;
console.log(genre);

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  $("#info-list").empty();
  $("#similar-list").empty();
  $("#results-list").addClass("active");
  $(".more-info").addClass("active");

  for (let i = 0; i < responseJson.Similar.Info.length; i++) {
    displayItem("#info-list", responseJson.Similar.Info[i]);
  }

  for (let i = 0; i < responseJson.Similar.Results.length; i++) {
    displayItem("#similar-list", responseJson.Similar.Results[i]);
  }
}

function displayItem(listname, item) {
  $(listname).append(`
      <span class='divider'>
      <li> ${item.Name} </li>
      </span>
      
    `);
}

function getInfo(genre, query, limit) {
  const params = {
    q: query,
    k: apiKey,
    limit: limit
  };

  const queryString = formatQueryParams(params);
  const url = queryURL + "?" + queryString;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson);
    })
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function changeType() {
  $(".list-genres").click(event => {
    genre = $(event.target).text() + ":";

    console.log(genre);
  });
}

function submitForm() {
  $("form").submit(event => {
    event.preventDefault();

    const searchTerm = $("#js-search-text").val();
    const numberText = $("#js-number").val();

    getInfo(genre, searchTerm, numberText);
  });
}

$(submitForm(), changeType());

//book:harry potter and the half-blood prince
//movie:harry potter and the half-blood prince