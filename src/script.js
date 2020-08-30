function setVisible(item_id, value){
  let item = document.getElementById(item_id);
  switch (value){
    case true:
      item.style = "display: block;" 
    break;
    case false:
      item.style = "display: none;" 
    break;
    default:
      item.style = "display: "+value+";";
  }
}

var usernameField = document.getElementById("username_field");
var passwordField = document.getElementById("password_field");

const serverURL = "http://localhost:5050";
var researcher;

function authenticateUser(){
	let username = usernameField.value;
	if(username === ""){
		window.alert("Please provide an email");
		return
	}
	let password = passwordField.value;
	if(password === ""){
		window.alert("Please provide a password");
		return
	}

	var xhr = new XMLHttpRequest();
	xhr.open("GET", serverURL+"/authentication/"+username+"/"+password, true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {
	  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	      // Request finished. Do processing here.
	      // console.log(xhr.response);
	      let pageURL = "./navigation/index";
		  document.getElementById("html_content").innerHTML='<object style="height:100%; width:100%; padding:0px;" class="container-fluid" type="text/html" data="'+pageURL+'.html" ></object>'
		  localStorage.setItem("RESEARCHER", xhr.response); 
	  } else if (this.readyState === XMLHttpRequest.DONE && this.status === 400) {
	      // Request finished. Do processing here.
	      window.alert(xhr.response);
	  }
	}
  xhr.send();
}