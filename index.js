
var countries = [];
var inputElem = null;
var resultsElem = null;
var activeIndex = 0;
var filteredResults = [];

let init = () => {
  fetch("example.js").then((response) => response.json())
    .then((data) => (countries = data));
  resultsElem = document.querySelector("ul");
  inputElem = document.querySelector("input");


  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });
  inputElem.addEventListener("input", (event) => {
    autocomplete(event);
  });

}

let = autocomplete = (event) => {
  const value = inputElem.value;
  if (!value) {
    hideResults();
    inputElem.value = "";
    return;
  }
  if (inputElem.value.length > 1) {
    filteredResults = filteredResults.filter((country) => {
      return country.Producto.toLowerCase().includes(value.toLowerCase());
    });
  } else {
    filteredResults = countries.filter((country) => {
      return country.Producto.toLowerCase().includes(value.toLowerCase());
    });
  }

  resultsElem.innerHTML = filteredResults.map((result, index) => {
    const isSelected = index === 0;
    return `<li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
          ${result.Producto}
        </li>
      `;
  }).join("");
  resultsElem.classList.remove("hidden");
}

let handleResultClick = () => {
  if (event.target && event.target.nodeName === "LI") {
    let variables = countries.filter((country) => {
      return country.Producto.toLowerCase().includes(event.target.innerText.toLowerCase());
    });
    inputElem.setAttribute("value", event.target.innerText);
    inputElem.setAttribute("data-id", `${variables[0].ID}`);
    console.log(resultsElem);

    selectItem(event.target);
  }
}

let selectFirstResult = () => {
  activeIndex = 0;
}

let selectResult = () => {
  const value = inputElem.value;
  const autocompleteValue = filteredResults[activeIndex].Producto;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
    activeItem.classList.add('selected');
    activeItem.setAttribute('aria-selected', 'true');
  }
  if (!value || !autocompleteValue) {
    return;
  }
  if (value !== autocompleteValue) {
    inputElem.value = autocompleteValue;
    inputElem.setSelectionRange(value.length, autocompleteValue.length);
  }
}
let selectItem = (node) => {
  if (node) {
    console.log(node);
    inputElem.value = node.innerText;
    hideResults();
  }
}

let hideResults = () => {
  this.resultsElem.innerHTML = "";
  this.resultsElem.classList.add("hidden");
}

let getItemAt = (index) => {
  return this.resultsElem.querySelector(`#autocomplete-result-${index}`)
}

init();
