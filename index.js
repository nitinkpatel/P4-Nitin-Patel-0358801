// /********f***********

// Project 4 : WEBSITE DEPLOYMENT (BTM)
// Name: Nitinkumar Patel
// Date: 01-DEC-2022
// Description: java script file for the validation of contact us form.

// ********************/

// function to validate the information of the form
function validate(e) {
	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();
		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}
	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		return true;
	}
	// Prevents the form from resetting
	e.preventDefault();
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	// Determine if any items are in the cart
	//  check for the name, email and phone number are entered and not empty
	let errorFlag = false;
	let requiredTextFieldIds = ["fullname", "email", "cardnumber"];
	for (requiredTextFieldId of requiredTextFieldIds) {
		let textField = document.getElementById(requiredTextFieldId);
		if (!formFieldHasInput(textField)) {
			errorFlag = true;
		}
	}

	//check the email is entered and valid too
	let regex2 = new RegExp(/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/);
	if (checkInvalidRegEx(regex2, "email", errorFlag)) {
		errorFlag = true;
	}
	// Validate phone number here
	let regex3 = new RegExp(/^\d{10}$/);
	if (checkInvalidRegEx(regex3, "cardnumber", errorFlag)) {
		errorFlag = true;
	}
	return errorFlag;
}

//	Functions to Complete the validations below
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	// below includes double equals, we should avoid that and use triple equals whenever possible.
	if (fieldElement.value === null || fieldElement.value.trim() === "") {
		// Invalid entry
		return false;
	}
	// Valid entry
	return true;
}
function checkInvalidRegEx(regex, elementId, errorFlag) {
	// element's value to test the regex against
	let shippingValue = document.getElementById(elementId).value;
	// if the regex doesn't match
	if (!regex.test(shippingValue)) {
		alert("Please provide correct information");
		if (!errorFlag) {
			document.getElementById(elementId).focus();
			document.getElementById(elementId).select();
		}
		errorFlag = true;
	}
	return errorFlag;
}

function load() {

	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);