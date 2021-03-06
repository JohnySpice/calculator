let container = document.querySelector(".calculator-grid");
let currentOperand = document.querySelector(".current-operand");
let previousOperand = document.querySelector(".previous-operand");
let equaled = false;

function numberHandler(number) {
  if (currentOperand.innerHTML === "" && number.innerHTML !== ".") {
    currentOperand.innerHTML = number.innerHTML;
  }
  else if (currentOperand.innerHTML === "0" && number.innerHTML === "0") {
    return;
  }
  else if (currentOperand.innerHTML === "0" && number.innerHTML !== "0" && number.innerHTML !== ".") {
    currentOperand.innerHTML = number.innerHTML;
  }
  else if ((currentOperand.innerHTML.includes(".") || currentOperand.innerHTML === "" || equaled) && number.innerHTML === ".") {
    return;
  }
  else if (equaled && number.innerHTML !== "." && previousOperand.innerHTML === "") {
    currentOperand.innerHTML = number.innerHTML;
    previousOperand.innerHTML = "";
    equaled = false;
  }
  else {
    currentOperand.innerHTML += number.innerHTML;
  }
}

function operationHandler(operation) {
  if (operation.innerHTML === "√" && currentOperand.innerHTML !== "") {
    previousOperand.innerHTML = currentOperand.innerHTML + " " + operation.innerHTML;
    currentOperand.innerHTML = equalsHandler(operation.innerHTML[0]);
    equaled = true;
  }
  else if (operation.innerHTML[0] === "x" && currentOperand.innerHTML !== "") {
    previousOperand.innerHTML = currentOperand.innerHTML + " " + operation.innerHTML;
    currentOperand.innerHTML = "";
  }
  else if (currentOperand.innerHTML === "" && operation.innerHTML === "-") {
    currentOperand.innerHTML = operation.innerHTML;

  }
  else if (currentOperand.innerHTML !== "" && previousOperand.innerHTML === "") {
    previousOperand.innerHTML = currentOperand.innerHTML + " " + operation.innerHTML;
    currentOperand.innerHTML = "";
  }
  else if (currentOperand.innerHTML !== "" && previousOperand.innerHTML !== "" && previousOperand.innerHTML[previousOperand.innerHTML.length - 2] !== "x" && previousOperand.innerHTML[previousOperand.innerHTML.length - 1] !== "√") {
    previousOperand.innerHTML = equalsHandler(previousOperand.innerHTML[previousOperand.innerHTML.length - 1]) + " " + operation.innerHTML;
    currentOperand.innerHTML = "";
  }
  else if (currentOperand.innerHTML !== "") {
    previousOperand.innerHTML = currentOperand.innerHTML + " " + operation.innerHTML;
    currentOperand.innerHTML = "";
  }
}

function equalsHandler(operation) {
  previousOperandValue = 10 * parseFloat(previousOperand.innerHTML);
  currentOperandValue = 10 * parseFloat(currentOperand.innerHTML);
  switch (operation) {
    case "÷":
      return (previousOperandValue / currentOperandValue);
    case "*":
      return (previousOperandValue * currentOperandValue) / 100;
    case "+":
      return (previousOperandValue + currentOperandValue) / 10;
    case "-":
      return (previousOperandValue - currentOperandValue) / 10;
    case ">":
      return Math.pow(parseFloat(previousOperandValue / 10), currentOperandValue / 10);
    case "√":
      return currentOperandValue >= 0 ? Math.sqrt(currentOperandValue / 10) : "Invalid input";
  }
}

container.addEventListener("click", (event) => {
  let button = event.target;
  let dataset = button.dataset;
  if (dataset.number === "") {
    numberHandler(button);
  }
  else if (dataset.operation === "") {
    operationHandler(button);
  }
  else if (dataset.delete === "" && !equaled) {
    currentOperand.innerHTML = currentOperand.innerHTML.slice(0, currentOperand.innerHTML.length - 1);
  }
  else if (dataset.allClear === "") {
    currentOperand.innerHTML = "";
    previousOperand.innerHTML = "";
    equaled = false;
  }
  else if (dataset.equals === "" && currentOperand.innerHTML !== "" && previousOperand.innerHTML !== "") {
    currentOperand.innerHTML = equalsHandler(previousOperand.innerHTML[previousOperand.innerHTML.length - 1]);
    previousOperand.innerHTML = "";
    equaled = true;
  }
});