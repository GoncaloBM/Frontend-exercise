let input = document.getElementById("autocomplete-input");

let resultsFromJson = [];

const autocomplete = (valueFromInput) => {
  let results = [];

  fetch("../products.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultsFromJson = data.items;
    });

  for (let i = 0; i < resultsFromJson.length; i++) {
    if (
      valueFromInput.toLowerCase() ===
      resultsFromJson[i].title.toLowerCase().slice(0, valueFromInput.length)
    ) {
      results.push(resultsFromJson[i]);
    }
  }

  return results;
};

input.onkeyup = function (e) {
  let input_val = this.value;

  let resultsToShow = [];

  let autocompleteFound = document.getElementById("autocomplete-found");
  let numberOfResults = document.getElementById("number-of-results");
  autocompleteFound.innerHTML = "";
  resultsToShow = autocomplete(input_val);

  if (input_val.length > 0) {
    input.classList.add("input-focus");
    input.classList.remove("input-unfocus");
    input.style.backgroundImage = "url(images/red-search.png)";
  } else {
    input.classList.remove("input-focus");
    input.classList.add("input-unfocus");
    input.style.backgroundImage = "url(images/black-search.png)";
  }

  if (input_val.length > 2) {
    numberOfResults.innerHTML = `${resultsToShow.length} Results Found`;

    for (let i = 0; i < resultsToShow.length; i++) {
      autocompleteFound.innerHTML += `<div class='result-container'>
          <div class='result-image' style="background-image : url(${resultsToShow[i].image})"></div>
          <div class='result-infos'>
            <div class='result-name'>${resultsToShow[i].title}</div>
            <div class='result-path'>${resultsToShow[i].path}</div>
          </div>
        </div>`;
    }
    autocompleteFound.style.display = "block";
  } else {
    resultsToShow = [];
    autocompleteFound.innerHTML = "";
    numberOfResults.innerHTML = `0 Results Found`;
  }
};
