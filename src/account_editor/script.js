var nameField = document.getElementById("name_input");
var surnameField = document.getElementById("surname_input");
var mobileField = document.getElementById("mobile_input");
var emailField = document.getElementById("email_input");
var passwordField = document.getElementById("password_input");
var descriptionField = document.getElementById("description_input");

var researcher = JSON.parse(localStorage.getItem("RESEARCHER"));

function loadResearcherInfo(){


	nameField.placeholder = researcher.name;
	nameField.onfocus = function(){
	    if(!this.classList.contains("changed"))
	      this.classList.add("changed"); 
	    if(!this.value){
	      this.value = this.placeholder;
	    }
	};
	nameField.onblur = function(){
	    if(this.value == this.placeholder){
	      this.placeholder = this.value;
	      this.value = null;      
	      this.classList.remove("changed");
	    }
	};

	surnameField.placeholder = researcher.surname;
	surnameField.onfocus = function(){
	    if(!this.classList.contains("changed"))
	      this.classList.add("changed"); 
	    if(!this.value){
	      this.value = this.placeholder;
	    }
	};
	surnameField.onblur = function(){
	    if(this.value == this.placeholder){
	      this.placeholder = this.value;
	      this.value = null;      
	      this.classList.remove("changed");
	    }
	};

	if(researcher.phone)
		mobileField.placeholder = researcher.phone;	
	mobileField.onfocus = function(){
	    if(!this.classList.contains("changed"))
	      this.classList.add("changed"); 
	    if(!this.value){
	      this.value = this.placeholder;
	    }
	};
	mobileField.onblur = function(){
	    if(this.value == this.placeholder){
	      this.placeholder = this.value;
	      this.value = null;    
	      this.classList.remove("changed");  
	    }
	};

	emailField.placeholder = researcher.email;	
	emailField.onfocus = function(){
	    if(!this.classList.contains("changed"))
	      this.classList.add("changed"); 
	    if(!this.value){
	      this.value = this.placeholder;
	    }
	};
	emailField.onblur = function(){
	    if(this.value == this.placeholder){
	      this.placeholder = this.value;
	      this.value = null;
	      this.classList.remove("changed");
	    }
	};

	if(researcher.description)
		descriptionField.placeholder = researcher.description;
	descriptionField.onfocus = function(){
	    if(!this.classList.contains("changed"))
	      this.classList.add("changed"); 
	    if(!this.value){
	      this.value = this.placeholder;
	    }
	};
	descriptionField.onblur = function(){
	    if(this.value == this.placeholder){
	      this.placeholder = this.value;
	      this.value = null; 
	      this.classList.remove("changed");
	    }
	};
}
loadResearcherInfo();

function saveResearcherInfo(){
	var data = {};
	if(emailField.value)
		data.email = emailField.value;
	if(passwordField.value)
		data.password = passwordField.value;
	if(nameField.value)
		data.name = nameField.value;
	if(surnameField.value)
		data.surname = surnameField.value;
	if(mobileField.value)
		data.phone = mobileField.value;
	if(descriptionField.value)
		data.description = descriptionField.value;

	if(Object.keys(data).length === 0)
		return;

	  $.ajax({
      url: serverURL + "/researchers/" + JSON.parse(localStorage.getItem("RESEARCHER")).id,
      type: 'PATCH',
      dataType: 'json',
      data: data,
      success: function(data, textStatus, xhr) {
        if(xhr.status === 200){
          	if(emailField.value){
				emailField.placeholder = emailField.value;
				emailField.value = null;
				emailField.classList.remove("changed");
          	}
			if(passwordField.value){
				passwordField.placeholder = passwordField.value;
				passwordField.value = null;
				passwordField.classList.remove("changed");
          	}
			if(nameField.value){
				nameField.placeholder = nameField.value;
				nameField.value = null;
				nameField.classList.remove("changed");
          	}
			if(surnameField.value){
				surnameField.placeholder = surnameField.value;
				surnameField.value = null;
				surnameField.classList.remove("changed");
          	}
			if(mobileField.value){
				mobileField.placeholder = mobileField.value;
				mobileField.value = null;
				mobileField.classList.remove("changed");
          	}
			if(descriptionField.value){
				descriptionField.placeholder = descriptionField.value;
				descriptionField.value = null;
				descriptionField.classList.remove("changed");
          	}
          	location.reload(true);
        } else {
          window.alert("couldn't delete user");
        }
      }
    });
}