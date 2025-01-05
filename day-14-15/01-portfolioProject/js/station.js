// Calculates fuel cost based on type and amount, with input validation:

function fuelCost() {
  const fuelType = document.getElementById("number1").value;
  const fuelAmount = parseFloat(document.getElementById("number2").value);

  if (fuelType !== "1" && fuelType !== "2") {
    document.getElementById("result").innerHTML = "Nieprawidłowy typ paliwa!";
    return;
  }

  if (!fuelAmount || fuelAmount <= 0) {
    document.getElementById("result").innerHTML = "Koszt paliwa: 0 zł";
    return;
  }

  const pricePerLiter = fuelType === "1" ? 6 : 6.5;
  const totalCost = pricePerLiter * fuelAmount;

  document.getElementById("result").innerHTML =
    "Koszt paliwa: " + totalCost.toFixed(2) + " zł";
}
