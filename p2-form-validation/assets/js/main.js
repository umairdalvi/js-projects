$(document).ready(function () {

  function inputValidation(inputElement, errorElement, regex, errorMessage, setValidFlag) {
    $(inputElement).on("input", function () {
      const value = inputElement.value.trim();

      if (!regex.test(value)) {
        displayErrorMsg(inputElement, errorElement, errorMessage);
        setValidFlag(false);
      } else {
        removeErrorMsg(inputElement, errorElement);
        setValidFlag(true);
      }
    });
  }

  function displayErrorMsg(inputElement, errorBox, message) {
    errorBox.textContent = message
    errorBox.classList.add("error")
    inputElement.classList.add("error-field")
  }

  function removeErrorMsg(inputElement, errorBox) {
    errorBox.textContent = ""
    errorBox.classList.remove("error")
    inputElement.classList.remove("error-field")
  }

  function emptyCheck(inputElement, errorBox, message) {
    if (inputElement.value.trim() === "" || inputElement.value === "default") {
      displayErrorMsg(inputElement, errorBox, message)
      return false
    }
    return true
  }

  function validateGender(inputElement, errorBox, message) {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
      displayErrorMsg(inputElement, errorBox, message)
      return false;
    } else {
      removeErrorMsg(inputElement, errorBox)
      return true;
    }
  }

  function passMatch() {
    const pass = passElement.value.trim()
    const cpass = cpassElement.value.trim()

    if (!(cpass === pass)) {
      displayErrorMsg(cpassElement, cpassValidationElement, "Passwords do not match")
      validCpass = false;
      return validCpass;
    } else {
      removeErrorMsg(cpassElement, cpassValidationElement)
      validCpass = true;
      return validCpass;
    }
  }

  const nameElement = document.getElementById("name")
  const emailElement = document.getElementById("email")
  const passElement = document.getElementById("pass")
  const cpassElement = document.getElementById("cpass")
  const courseElement = document.getElementById("course")
  const genderElement = document.getElementById("gender")

  const nameValidationElement = document.getElementById("name-validation")
  const emailValidationElement = document.getElementById("email-validation")
  const passValidationElement = document.getElementById("pass-validation")
  const cpassValidationElement = document.getElementById("cpass-validation")
  const courseValidationElement = document.getElementById("course-validation")
  const genderValidationElement = document.getElementById("gender-validation");

  const form = document.getElementById("regForm")

  const nameRegex = /^\s*[A-Za-z][A-Za-z\s'-]*$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/

  let validName = false, validEmail = false, validPass = false, validCpass = false;

  inputValidation(nameElement, nameValidationElement, nameRegex, "Please enter a valid name", (val) => { validName = val })
  inputValidation(emailElement, emailValidationElement, emailRegex, "Please enter a valid email", (val) => { validEmail = val })
  inputValidation(passElement, passValidationElement, passRegex, "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character", (val) => { validPass = val })

  $("#pass").on("input", passMatch);
  $("#cpass").on("input", passMatch)

  $("#course").on("change", function () {
    const course = courseElement.value

    if (course !== "default") {
      removeErrorMsg(courseElement, courseValidationElement)
    }
  })

  $('input[name="gender"]').on("click", function () {
    removeErrorMsg(genderElement, genderValidationElement)
  })

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();

    let nameFilled = emptyCheck(nameElement, nameValidationElement, "Name is required")
    let emailFilled = emptyCheck(emailElement, emailValidationElement, "Email is required")
    let passFilled = emptyCheck(passElement, passValidationElement, "Password is required")
    let cpassFilled = emptyCheck(cpassElement, cpassValidationElement, "Confirm password is required")
    let courseFilled = emptyCheck(courseElement, courseValidationElement, "Please select a course")
    let genderFilled = validateGender(genderElement, genderValidationElement, "Please select a gender.")

    if (validName && validEmail && validPass && validCpass && nameFilled && emailFilled && passFilled && cpassFilled && courseFilled && genderFilled) {
      form.submit();
    }
  })
})