var users;

var userList = document.getElementById("user-list");
var modalShowButton = document.getElementById("removeItemModalToggle");

function loadUser(value, index, array){
  let user = document.createElement("div");
  user.classList.add("list-group-item");
  user.classList.add("w-100");

  let user_info = document.createElement("div");
  user_info.classList.add("row");

  let user_id = document.createElement("div");
  user_id.classList.add("col");
  user_id.innerHTML = "ID) ";
  let user_id_value = document.createElement("span");
  user_id_value.innerHTML = value.id;
  user_id.appendChild(user_id_value);
  user_info.appendChild(user_id);

  let user_name = document.createElement("div");
  user_name.classList.add("col-4");
  user_name.style = "text-align:center;"
  user_name.innerHTML = "Name: ";
  let user_name_value = document.createElement("span");
  if(value.name === "")
    user_name_value.innerHTML = "--";
  else
    user_name_value.innerHTML = value.name;
  user_name_value.classList.add("p-2");
  user_name_value.contentEditable = true;
  user_name.appendChild(user_name_value);
  user_info.appendChild(user_name);

  let user_surname = document.createElement("div");
  user_surname.classList.add("col-4");
  user_surname.style = "text-align:center;"
  user_surname.innerHTML = "Surname: ";
  let user_surname_value = document.createElement("span");
  if(value.name === "")
    user_surname_value.innerHTML = "--";
  else
    user_surname_value.innerHTML = value.surname;
  user_surname_value.classList.add("p-2");
  user_surname_value.contentEditable = true;
  user_surname.appendChild(user_surname_value);
  user_info.appendChild(user_surname);

  let delete_user = document.createElement("div");
  delete_user.classList.add("col");
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
    deleteUser(user, value);
    modalShowButton.click();
  }
  delete_user.appendChild(delete_user_button);
  user_info.appendChild(delete_user);

  user.appendChild(user_info);
  userList.appendChild(user);
}

function loadUsers(){
  $.ajax({
      url: serverURL + "/users",
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
          users = res;
          //console.log(res);
          users.forEach(loadUser);
      }
  });
}

$( document ).ready(function() {
    loadUsers();
});

let dummyUser = {
  "researcherId": JSON.parse(localStorage.getItem("RESEARCHER")).id,
  "name":"",
  "surname":""
}
function addUser(){
  $.ajax({
    url: serverURL + "/users",
    type: 'POST',
    dataType: 'json',
    data: dummyUser,
    success: function(data, textStatus, xhr) {0
      if(xhr.status === 200){
        dummyUser.id = data.id;
        loadUser(dummyUser);
      } else {
        window.alert("couldn't add user");
      }
    }
  });
}

function sendDeleteUser(id, node){
  $.ajax({
      url: serverURL + "/users/" + id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data, textStatus, xhr) {0
        if(xhr.status === 200){
          node.parentNode.removeChild(node);
        } else {
          window.alert("couldn't delete user");
        }
      }
  });
}

function deleteUser(userObj, user){
  let modal = document.getElementById("removeItemModal");
  let modalTItle = document.getElementById("removeItemModalTitle");
  modalTItle.innerHTML = "Do you want to delete user " + user.id +"?";
  let modalBody = document.getElementById("removeItemModalBody");
  modalBody.innerHTML = user.name+"\t"+user.surname;
  let modalAccept = document.getElementById("removeItemModalAccept");
  modalAccept.onclick = function(){
    sendDeleteUser(user.id, userObj);
    modalShowButton.click();
  };  
}