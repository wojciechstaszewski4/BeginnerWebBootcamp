// Performs arithmetic operations (+, -, *, /) based on user input and updates the result
function calculate(operation) {
  const number1 = parseInt(document.getElementById("num1").value);
  const number2 = parseInt(document.getElementById("num2").value);
  let result;

  if (isNaN(number1) || isNaN(number2)) {
    result = "Proszę uzupełnić obie liczby!";
  } else if (operation == 4 && number2 == 0) {
    result = "Nie wolno dzielić przez zero!";
  } else {
    switch (operation) {
      case 1:
        result = number1 + number2;
        break;
      case 2:
        result = number1 - number2;
        break;
      case 3:
        result = number1 * number2;
        break;
      case 4:
        result = number1 / number2;
        break;
      default:
        result = "Nieznana operacja!";
    }

    if (typeof result === "number") {
      result = "Wynik działania wynosi: " + result.toFixed(2);
    }
  }

  document.getElementById("output").value = result;
}
