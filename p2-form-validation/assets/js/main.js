$(document).ready(function () {
  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");
  const passElement = document.getElementById("pass");
  const cpassElement = document.getElementById("cpass");
  const courseElement = document.getElementById("course");

  const nameValidationElement = document.getElementById("name-validation");
  const emailValidationElement = document.getElementById("email-validation");
  const passValidationElement = document.getElementById("pass-validation");
  const cpassValidationElement = document.getElementById("cpass-validation");
  const courseValidationElement = document.getElementById("course-validation");

  const form = document.getElementById("regForm");

  const nameRegex = /^\s*[A-Za-z][A-Za-z\s'-]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;

  let validName = false, validEmail = false, validPass = false, validCpass = false;

  $(nameElement).on("input", function () {
    const value = nameElement.value.trim();
    if (!nameRegex.test(value)) {
      $(nameValidationElement).text("Please enter a valid name").addClass("error");
      $(nameElement).addClass("error-field");
      validName = false;
    } else {
      $(nameValidationElement).text("").removeClass("error");
      $(nameElement).removeClass("error-field");
      validName = true;
    }
  });

  $(emailElement).on("input", function () {
    const value = emailElement.value.trim();
    if (!emailRegex.test(value)) {
      $(emailValidationElement).text("Please enter a valid email").addClass("error");
      $(emailElement).addClass("error-field");
      validEmail = false;
    } else {
      $(emailValidationElement).text("").removeClass("error");
      $(emailElement).removeClass("error-field");
      validEmail = true;
    }
  });

  $(passElement).on("input", function () {
    const value = passElement.value.trim();
    if (!passRegex.test(value)) {
      $(passValidationElement).text("Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character").addClass("error");
      $(passElement).addClass("error-field");
      validPass = false;
    } else {
      $(passValidationElement).text("").removeClass("error");
      $(passElement).removeClass("error-field");
      validPass = true;
    }

    const pass = passElement.value.trim();
    const cpass = cpassElement.value.trim();
    if (cpass !== "" && cpass !== pass) {
      $(cpassValidationElement).text("Passwords do not match").addClass("error");
      $(cpassElement).addClass("error-field");
      validCpass = false;
    } else if (cpass !== "") {
      $(cpassValidationElement).text("").removeClass("error");
      $(cpassElement).removeClass("error-field");
      validCpass = true;
    }
  });

  $(cpassElement).on("input", function () {
    const pass = passElement.value.trim();
    const cpass = cpassElement.value.trim();
    if (cpass !== pass) {
      $(cpassValidationElement).text("Passwords do not match").addClass("error");
      $(cpassElement).addClass("error-field");
      validCpass = false;
    } else {
      $(cpassValidationElement).text("").removeClass("error");
      $(cpassElement).removeClass("error-field");
      validCpass = true;
    }
  });

  $(courseElement).on("change", function () {
    const course = courseElement.value;
    if (course !== "default") {
      $(courseValidationElement).text("").removeClass("error");
      $(courseElement).removeClass("error-field");
    }
  });

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();

    let nameFilled = true, emailFilled = true, passFilled = true, cpassFilled = true, courseFilled = true;

    if (nameElement.value.trim() === "") {
      $(nameValidationElement).text("Name is required").addClass("error");
      $(nameElement).addClass("error-field");
      nameFilled = false;
    }

    if (emailElement.value.trim() === "") {
      $(emailValidationElement).text("Email is required").addClass("error");
      $(emailElement).addClass("error-field");
      emailFilled = false;
    }

    if (passElement.value.trim() === "") {
      $(passValidationElement).text("Password is required").addClass("error");
      $(passElement).addClass("error-field");
      passFilled = false;
    }

    if (cpassElement.value.trim() === "") {
      $(cpassValidationElement).text("Confirm password is required").addClass("error");
      $(cpassElement).addClass("error-field");
      cpassFilled = false;
    }

    if (courseElement.value === "default") {
      $(courseValidationElement).text("Please select a course").addClass("error");
      $(courseElement).addClass("error-field");
      courseFilled = false;
    }

    if (
      validName && validEmail && validPass && validCpass &&
      nameFilled && emailFilled && passFilled && cpassFilled &&
      courseFilled
    ) {
      form.submit();
    }
  });
});