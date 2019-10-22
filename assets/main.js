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
   // console.log(responseJson.Results.Type);
    $("#results-list").append(`
      <ol>
        <li><h3>${responseJson.Similar.Results}</h3></li>
        <li><p>${responseJson.Info[i].Type}</p></li>
      </ol>
      `);
}

function getMovieInfo(query) {
  const params = {
    stateCode: query,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = queryURL + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson.Similar.Results))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-text").val();
    getMovieInfo(searchTerm);
  });
}

$(watchForm);
