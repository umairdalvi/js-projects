$(document).ready(function () {
  const num1Element = document.getElementById("num1");
  const num2Element = document.getElementById("num2");
  const ansElement = document.getElementById("ans");

  $("#sumBtn").on("click", function () {
    let num1 = Number(num1Element.value);
    let num2 = Number(num2Element.value);
    ansElement.value = `${num1 + num2}`;
  });

  $("#subtractBtn").on("click", function () {
    let num1 = Number(num1Element.value);
    let num2 = Number(num2Element.value);
    ansElement.value = `${num1 - num2}`;
  });

  $("#productBtn").on("click", function () {
    let num1 = Number(num1Element.value);
    let num2 = Number(num2Element.value);
    ansElement.value = `${num1 * num2}`;
  });

  $("#divideBtn").on("click", function () {
    let num1 = Number(num1Element.value);
    let num2 = Number(num2Element.value);
    ansElement.value = `${num1 / num2}`;
  });
});
