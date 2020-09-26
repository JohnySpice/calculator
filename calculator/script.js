let container = document.querySelector(".calculator-grid");
let currentOperand = document.querySelector(".current-operand");
let previousOperand = document.querySelector(".previous-operand");
let equaled = false;

function numberHandler(number) {
  if (currentOperand.innerHTML === "" && number.innerHTML !== ".") {
    currentOperand.innerHTML = number.innerHTML;
  }
  else if (currentOperand.innerHTML === "0" && number.innerHTML === "0") {

  }
  else if (currentOperand.innerHTML === "0" && number.innerHTML !== "0" && number.innerHTML !== ".") {
    currentOperand.innerHTML = number.innerHTML;
  }
  else if ((currentOperand.innerHTML.includes(".") || currentOperand.innerHTML === "" || equaled) && number.innerHTML === ".") {

  }
  else if (equaled && number.innerHTML !== ".") {
    currentOperand.innerHTML = number.innerHTML;
    previousOperand.innerHTML = "";
    equaled = false;
  }
  else {
    currentOperand.innerHTML += number.innerHTML;
  }
}

container.addEventListener("click", (event) => {
  let button = event.target;
  let dataset = button.dataset;
  if (dataset.number === "") {
    numberHandler(button);
  }
});