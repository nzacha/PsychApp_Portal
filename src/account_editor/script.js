var nameField = document.getElementById("name_input");
var surnameField = document.getElementById("surname_input");
var mobileField = document.getElementById("mobile_input");
var emailField = document.getElementById("email_input");
var descriptionField = document.getElementById("description_input");

var researcher = JSON.parse(localStorage.getItem("RESEARCHER"));

function loadResearcherInfo(){
	nameField.placeholder = researcher.name;
	surnameField.placeholder = researcher.surname;
	if(researcher.phone)
		mobileField.placeholder = researcher.phone;
	emailField.placeholder = researcher.email;
	if(researcher.description)
		descriptionField.placeholder = researcher.description;
}
loadResearcherInfo();