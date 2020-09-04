var users;

var userList = document.getElementById("user-list");
var modalShowButton = document.getElementById("removeItemModalToggle");

var userCount=0;
function loadUser(value, index, array){
  index = ++userCount;
  let user = document.createElement("div");
  user.classList.add("bg-enabled");
  user.classList.add("rounded-pill");
  user.classList.add("list-group-item");
  user.classList.add("mb-2");
  user.classList.add("w-100");

  let user_info = document.createElement("div");
  user_info.classList.add("row");

  let user_id = document.createElement("div");
  user_id.classList.add("col");
  user_id.classList.add("changed");
  //user_id.innerHTML = "ID) ";
  let user_id_value = document.createElement("label");
  user_id_value.innerHTML = value.id;
  user_id_value.id = "user_id_value_"+index;
  user_id_value.classList.add("changed");
  user_id.appendChild(user_id_value);
  user_info.appendChild(user_id);

  let user_name = document.createElement("div");
  user_name.classList.add("col");
  user_name.style = "text-align:center;"
  //user_name.innerHTML = "Name: ";
  let user_name_value = document.createElement("span");
  if(value.name === "")
    user_name_value.innerHTML = "--";
  else
    user_name_value.innerHTML = value.name;
  user_name_value.id = "user_name_value_"+index;
  user_name_value.classList.add("p-2");    
  user_name_value.contentEditable = true;  
  user_name_value.onfocus = function(){
    if(!this.classList.contains("changed"))
      this.classList.add("changed"); 
  };
  user_name.appendChild(user_name_value);
  user_info.appendChild(user_name);

  let user_surname = document.createElement("div");
  user_surname.classList.add("col");
  user_surname.style = "text-align:center;"
  //user_surname.innerHTML = "Surname: ";
  let user_surname_value = document.createElement("span");
  if(value.name === "")
    user_surname_value.innerHTML = "--";
  else
    user_surname_value.innerHTML = value.surname;
  user_surname_value.classList.add("p-2"); 
  user_surname_value.contentEditable = true;
  user_surname_value.id = "user_surname_value_"+index;
  user_surname_value.onfocus = function(){
    if(!this.classList.contains("changed"))
      this.classList.add("changed"); 
  };
  user_surname.appendChild(user_surname_value);
  user_info.appendChild(user_surname);

  let delete_user = document.createElement("div");
  delete_user.classList.add("col");
  if(value.isActive){ 
    let delete_user_button = document.createElement("button");
    delete_user_button .innerHTML = "X";
    delete_user_button.setAttribute("type", "button");
    delete_user_button.classList.add("btn");
    delete_user_button.classList.add("btn-danger");
    delete_user_button.classList.add("float-right");
    delete_user_button.setAttribute("data-toggle", "modal");
    delete_user_button.setAttribute("data-target", "#removeItemModal");
    delete_user_button.onclick = function(event){
      event.stopPropagation();
      modalShowButton.click();
      deleteUser(user, value, delete_user_button, user_name_value, user_surname_value);
      //modalShowButton.click();
    }
    delete_user.appendChild(delete_user_button);
  }else{
    disable(user, delete_user, user_name_value, user_surname_value, value.reason_for_exit);
  }
  user_info.appendChild(delete_user);

  user.appendChild(user_info);
  
  //userList.appendChild(user);
  userList.insertBefore(user, userList.firstChild);
}

function compareFunction(obj1, obj2){
  return obj1.id-obj2.id;
}

function loadUsers(){
  $.ajax({
      url: serverURL + "/users/MyUsers/"+JSON.parse(localStorage.getItem("RESEARCHER")).id,
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
          users = res;
          //console.log(users);
          users.sort(compareFunction);
          users.forEach(loadUser);
      }
  });
}

$( document ).ready(function() {
    loadUsers();
});

researcher = JSON.parse(localStorage.getItem("RESEARCHER"));

dummyUser = {  
  "researcherId": researcher.id,
  "name":"",
  "surname":"",
  "isActive": true,  
  "study_length": researcher.study_length,
  "tests_per_day": researcher.tests_per_day,
  "tests_time_interval": researcher.tests_time_interval,
  "allow_individual_times": researcher.allow_individual_times,
  "allow_user_termination": researcher.allow_user_termination,
  "automatic_termination": researcher.automatic_termination,
}
function addUser(){
  //console.log(dummyUser);
  $.ajax({
    url: serverURL + "/users",
    type: 'POST',
    dataType: 'json',
    data: dummyUser,
    success: function(data, textStatus, xhr) {
      if(xhr.status === 200){
        dummyUser.id = data.id;
        loadUser(dummyUser, userList.childElementCount);
      } else {
        window.alert("couldn't add user");
      }
    }
  });
}

function disable(node, deleteCol, nameInput, surnameInput, reason_for_exit){
  node.classList.remove("bg-enabled");
  node.classList.add("bg-disabled");    

  nameInput.contentEditable = false;
  surnameInput.contentEditable = false;

  let reason_label = document.createElement("label");
  reason_label.innerHTML = reason_for_exit;
  deleteCol.appendChild(reason_label);
  deleteCol.classList.add("text-right");
  deleteCol.classList.add("mr-1");  
}

function sendDeleteUser(id, node, deleteButton, nameInput, surnameInput){
  let reason = "Deleted by Me";
  $.ajax({
      url: serverURL + "/users/" + id,
      type: 'DELETE',
      dataType: 'json',
      data: {"reason": reason},
      success: function(data, textStatus, xhr) {
        if(xhr.status === 200){
          //node.parentNode.removeChild(node);
          disable(node, deleteButton.parentNode, nameInput, surnameInput, reason);
          deleteButton.parentNode.removeChild(deleteButton);
        } else {
          window.alert("couldn't delete user");
        }
      }
  });
}

function deleteUser(userObj, user, deleteButton, nameInput, surnameInput){
  let modal = document.getElementById("removeItemModal");
  let modalTItle = document.getElementById("removeItemModalTitle");
  modalTItle.innerHTML = "Do you want to delete user " + user.id +"?";
  let modalBody = document.getElementById("removeItemModalBody");
  modalBody.innerHTML = user.name+"\t"+user.surname;
  let modalAccept = document.getElementById("removeItemModalAccept");
  modalAccept.onclick = function(){
    sendDeleteUser(user.id, userObj, deleteButton, nameInput, surnameInput);
    modalShowButton.click();
  };  
}

function saveUser(index){
  let id_input = document.getElementById("user_id_value_"+index);
  let name_input = document.getElementById("user_name_value_"+index);
  let surname_input = document.getElementById("user_surname_value_"+index);


  let changes = {};
  if (name_input.classList.contains("changed")){
    changes.name = name_input.innerHTML; 
  }  
  if (surname_input.classList.contains("changed")){
    changes.surname = surname_input.innerHTML; 
  }  
  //console.log(changes);
  if(Object.keys(changes).length === 0)
    return;

  $.ajax({
      url: serverURL + "/users/" + parseInt(id_input.innerHTML),
      type: 'PATCH',
      dataType: 'json',
      data: {"name": changes.name, "surname": changes.surname},
      success: function(data, textStatus, xhr) {
        if(xhr.status === 200){
          if(changes.name)
            name_input.classList.remove("changed");
          if(changes.surname)
            surname_input.classList.remove("changed");
        } else {
          window.alert("couldn't update user");
        }
      }
    });
}

function saveUsers(){ 
  for(var i=1; i<=userCount; i++){
    let id_input = document.getElementById("user_id_value_" +i);
    if(id_input)
      saveUser(i);
  }
}