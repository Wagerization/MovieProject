"use strict";

const apiKey = "348324-Adam-K01H3VNV";
const searchUrl = "https://tastedive.com/api/similar";
const queryURL = "https://cors-anywhere.herokuapp.com/" + searchUrl;

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  $("#results-list").empty();

  const li = responseJson.Similar.Results.map(l => `<li>${l.Name} - ${l.Type}</li>`)

  $("#results-list").append(`<ol>${li}</ol>`);
}

function getMovieInfo(query) {
  const params = {
    q: query,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = queryURL + "?" + queryString;
  console.log(params);
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

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-text").val();
    console.log($("#js-search-text"));
    console.log(searchTerm);
    getMovieInfo(searchTerm);
  });
}

$(watchForm);