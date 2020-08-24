"use strict";

$(document).ready(function() {
  console.log("Ready to fetch GitHub User Repo!");
  watchSubmitButton();
});

function userInput() {
  let wordInput = $("#js-username").val();
  return wordInput;
}

function watchSubmitButton() {
  $("#js-form").submit(e => {
    console.log("it works!");
    e.preventDefault();
    fetchUserName(userInput);
  });
}

//Make Request to GitHub API
function fetchUserName() {
  fetch("https://api.github.com/users/" + userInput() + "/repos")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Hmmm. Cannot find GitHub UserName"));
}

//Render Repos to the DOM
function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  let responseHtml = "";
  responseJson.forEach(userRepo => {
    responseHtml += `<li>
      <h3>${userRepo.name}</h3>
     <a href=" ${userRepo.html_url}">Repo URL Link</a>
     <hr>
      </li>`;
  });
  $("#results-list").html(responseHtml);
  $("#results").removeClass("hidden");
}