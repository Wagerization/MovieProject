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
  for (let i = 0; i < responseJson.Info.length; i++) {
    console.log(responseJson.Results.Type);
    $("#results-list").append(`
      <li><h3>${responseJson.Results[i].Name}</h3></li>
      <li><p>${responseJson.Info[i].Type}</p></li>
      
      `);
  }
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
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $(".js-search-text").val();
    getMovieInfo(searchTerm);
  });
}

$(watchForm);
