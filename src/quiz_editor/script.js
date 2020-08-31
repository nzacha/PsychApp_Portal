var quiz;

var page = document.getElementById("quiz_editor");
var modalShowButton = document.getElementById("removeItemModalToggle");

function loadQuestion(value, index, array){
  let question = document.createElement("div");
  question.classList.add("card");
  question.id = "question_"+index;

  let question_header = document.createElement("div");
  question_header.id = "header_"+index;
  question_header.classList.add("card-header");
  question_header.classList.add("mt-1");

  let question_title = document.createElement("h5");
  let question_title_button = document.createElement("button");
  question_title_button.classList.add("btn");
  question_title_button.classList.add("btn-link");
  if(index !=0)
    question_title_button.classList.add("collapsed");
  question_title_button.setAttribute("type", "button");
  question_title_button.setAttribute("data-toggle", "collapse");
  question_title_button.setAttribute("data-target", "#collapse_"+index);
  question_title_button.innerHTML = "Question "+ (index+1);

  question_title.appendChild(question_title_button);
  question_header.appendChild(question_title);
  question.appendChild(question_header);

  let question_delete_button = document.createElement("button");
  question_delete_button.innerHTML = "X";
  //question_delete_button.classList.add("btn btn-danger");
  question_delete_button.setAttribute("type", "button");
  question_delete_button.classList.add("btn");
  question_delete_button.classList.add("btn-danger");
  question_delete_button.classList.add("float-right");
  question_delete_button.setAttribute("data-toggle", "modal");
  question_delete_button.setAttribute("data-target", "#removeItemModal");
  question_delete_button.onclick = function(event){
    event.stopPropagation();
    removeQuestion(value, question);
    modalShowButton.click();
  };
  question_title.appendChild(question_delete_button);

  let question_body_container = document.createElement("div");
  question_body_container.id = "collapse_"+index;
  question_body_container.classList.add("mt-1");
  question_body_container.classList.add("collapse");
  if(index == 0)
    question_body_container.classList.add("show");
  question_body_container.setAttribute("data-parent", "#quiz_editor");
  
  let question_body = document.createElement("div");
  question_body.classList.add("card-body");
  question_body_container.appendChild(question_body);

  let question_id_container = document.createElement("div");
  question_id_container.classList.add("input-group");
  question_id_container.classList.add("mb-3");
  let question_id_title_container = document.createElement("div");
  question_id_title_container.classList.add("input-group-prepend");
  question_id_title_container.style = "width: 70px;";
  question_id_container.appendChild(question_id_title_container);
  let question_id_title = document.createElement("span");
  question_id_title.classList.add("input-group-text");
  question_id_title.style = "width: 70px;";
  question_id_title.innerHTML = "ID: ";
  question_id_title_container.appendChild(question_id_title);
  let question_id_input = document.createElement("label");
  question_id_input.id = "question_id_"+index;
  question_id_input.innerHTML = value.id;
  question_id_input.classList.add("form-control");
  question_id_input.setAttribute("readonly", "readonly");
  question_id_container.appendChild(question_id_input);

  let question_text_container = document.createElement("div");
  question_text_container.classList.add("input-group");
  question_text_container.classList.add("mb-3");
  let question_text_title_container = document.createElement("div");
  question_text_title_container.style = "width: 70px;";
  question_text_title_container.classList.add("input-group-prepend");
  question_text_container.appendChild(question_text_title_container);
  let question_text_title = document.createElement("span");
  question_text_title.classList.add("input-group-text");
  question_text_title.style = "width: 70px;";
  question_text_title.innerHTML = "Text: ";
  question_text_title_container.appendChild(question_text_title);
  let question_text_input = document.createElement("input");
  question_text_input.id = "question_text_"+index;
  question_text_input.style = "text-align: center;";
  question_text_input.placeholder = value.question_text;
  question_text_input.onfocus = function(){
    if(!this.value){
      this.value = this.placeholder;
    }
  };
  question_text_input.onblur = function(){
    if(this.value == this.placeholder){
      this.placeholder = this.value;
      this.value = null;      
    }
  };
  question_text_input.type = "text";
  question_text_input.classList.add("form-control");
  question_text_container.appendChild(question_text_input);

  let question_type_container = document.createElement("div");
  question_type_container.classList.add("input-group");
  question_type_container.classList.add("mb-3");
  let question_type_title_container = document.createElement("div");
  question_type_title_container.classList.add("input-group-prepend");
  question_type_title_container.style = "width: 70px;";
  question_type_container.appendChild(question_type_title_container);
  let question_type_title = document.createElement("span");
  question_type_title.classList.add("input-group-text");
  question_type_title.style = "width: 70px;";
  question_type_title.innerHTML = "Type: ";
  question_type_title_container.appendChild(question_type_title);
  let question_type_combobox = document.createElement("select");
  question_type_combobox.id = "question_type_"+index;
  question_type_combobox.classList.add("form-control");
  question_type_combobox.onchange = function(){ 
    questionTypeOnChange(index, this.value);   
    if(!this.classList.contains("changed"))
      this.classList.add("changed"); 
  };
  let question_type_option_disabled = document.createElement("option");
  question_type_option_disabled.disabled = true;
  question_type_option_disabled.innerHTML = "Choose option";
  let question_type_option_text = document.createElement("option");
  question_type_option_text.value = "Text";
  question_type_option_text.innerHTML = "Text";
  let question_type_option_slider = document.createElement("option");
  question_type_option_slider.value = "Slider";
  question_type_option_slider.innerHTML = "Slider";
  question_type_container.appendChild(question_type_combobox);
  question_type_combobox.appendChild(question_type_option_disabled);
  question_type_combobox.appendChild(question_type_option_text);
  question_type_combobox.appendChild(question_type_option_slider);
  
  let question_levels_container = document.createElement("div");
  question_levels_container.id = "levels_container_" + index;
  question_levels_container.style = "display: none;";
  question_levels_container.classList.add("input-group");
  question_levels_container.classList.add("mb-3");
  let question_levels_title_container = document.createElement("div");
  question_levels_title_container.classList.add("input-group-prepend");
  question_levels_title_container.style = "width: 70px;";
  question_levels_container.appendChild(question_levels_title_container);
  let question_levels_title = document.createElement("span");
  question_levels_title.classList.add("input-group-text");
  question_levels_title.style = "width: 70px;";
  question_levels_title.innerHTML = "Levels: ";
  question_levels_title_container.appendChild(question_levels_title);
  let question_levels_combobox = document.createElement("select");
  question_levels_combobox.id = "question_levels_"+index;
  question_levels_combobox.classList.add("form-control");
  question_levels_combobox.onchange = function(){ 
    if(!this.classList.contains("changed"))
      this.classList.add("changed"); 
  };
  let question_levels_option_disabled = document.createElement("option");
  question_levels_option_disabled.disabled = true;
  question_levels_option_disabled.innerHTML = "Choose option";
  let question_levels_option_0 = document.createElement("option");
  question_levels_option_0.value = "0";
  question_levels_option_0.innerHTML = "NO levels";
  let question_levels_option_3 = document.createElement("option");
  question_levels_option_3.value = "3";
  question_levels_option_3.innerHTML = "3 levels";  
  let question_levels_option_5 = document.createElement("option");
  question_levels_option_5.value = "5";
  question_levels_option_5.innerHTML = "5 levels";  
  question_levels_container.appendChild(question_levels_combobox);
  question_levels_combobox.appendChild(question_levels_option_disabled);
  question_levels_combobox.appendChild(question_levels_option_0);
  question_levels_combobox.appendChild(question_levels_option_3);
  question_levels_combobox.appendChild(question_levels_option_5);

  let question_options = document.createElement("div");

  question_body.appendChild(question_id_container);
  question_body.appendChild(question_text_container);
  question_body.appendChild(question_type_container);
  question_body.appendChild(question_levels_container);
  question_body.appendChild(question_options);

  question.appendChild(question_body_container);
  page.appendChild(question);

  if(value.question_type == "Text")
    question_type_combobox.selectedIndex = 1;
  else if(value.question_type == "Slider"){
    question_type_combobox.selectedIndex = 2;
    questionTypeOnChange(index, "Slider");
  }

  if(value.levels == "0")
    question_levels_combobox.selectedIndex = 1;
  else if(value.levels == "3")
    question_levels_combobox.selectedIndex = 2;
  else if(value.levels == "5")
    question_levels_combobox.selectedIndex = 3;

}

function questionTypeOnChange(id, value){
  switch (value){
    case "Text":
      setVisible("levels_container_"+id, false);
    break;
    case "Slider":
      setVisible("levels_container_"+id, "flex");
    break;
    default:
  }
}

function compareFunction(obj1, obj2){
  return obj1.id-obj2.id;
}

function loadQuestions(){
  quiz.sort(compareFunction);
  quiz.forEach(loadQuestion);
}

let model = {};
function addQuestion(){
  sendAddQuestion();
}
function sendAddQuestion(){
  let researcher_id = JSON.parse(localStorage.getItem("RESEARCHER")).id;
  $.ajax({
    url: serverURL + "/questions/" + researcher_id,
    type: 'POST',
    dataType: 'json',
    success: function(data, textStatus, xhr) {
      if(xhr.status === 200){
        //console.log(data);     
        loadQuestion(data, page.childElementCount);
      } else {
        window.alert("couldn't add user");
      }
    }
  });
}

function loadQuiz(){
  let researcher_id = JSON.parse(localStorage.getItem("RESEARCHER")).id;
  $.ajax({
    url: serverURL + "/questions/" + researcher_id,
    type: 'GET',
    dataType: 'json',
    success: function(data, textStatus, xhr) {
      if(xhr.status === 200){
        //console.log(data);
        quiz = data;
        loadQuestions();
      } else {
        window.alert("couldn't load users");
      }
    }
  });
}
loadQuiz();

function removeQuestion(value, questionObj){
  let modal = document.getElementById("removeItemModal");
  let modalTItle = document.getElementById("removeItemModalTitle");
  modalTItle.innerHTML = "Do you want to delete question " + value.id +"?";
  let modalBody = document.getElementById("removeItemModalBody");
  modalBody.innerHTML = value.question_text;
  let modalAccept = document.getElementById("removeItemModalAccept");
  modalAccept.onclick = function(){
    sendDeleteQuestion(value.id, questionObj);
    modalShowButton.click();
  };  
}

function sendDeleteQuestion(id, node){
  $.ajax({
      url: serverURL + "/questions/" + id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data, textStatus, xhr) {0
        if(xhr.status === 200){
          node.parentNode.removeChild(node);
        } else {
          window.alert("couldn't delete question");
        }
      }
  });
}

function saveQuestion(value, index, array){
  let id_input = document.getElementById("question_id_" +index);
  let text_input = document.getElementById("question_text_" +index);
  let type_input = document.getElementById("question_type_" +index);
  let levels_input = document.getElementById("question_levels_" +index);

  let changes = {};
  if (text_input.value != ""){
    changes.question_text = text_input.value; 
  }
  if (type_input.classList.contains("changed")){
    changes.question_type = type_input.value; 
  }  
  if (levels_input.classList.contains("changed")){
    changes.levels = levels_input.value; 
  }  
  if(Object.keys(changes).length === 0)
    return;
  //console.log(changes);

  $.ajax({
      url: serverURL + "/questions/" + parseInt(id_input.innerHTML),
      type: 'PATCH',
      dataType: 'json',
      data: {"question_text": changes.question_text, "question_type": changes.question_type, "levels": changes.levels},
      success: function(data, textStatus, xhr) {
        if(xhr.status === 200){
          if(changes.question_text){
            text_input.placeholder = text_input.value;          
            text_input.value = null;
          }
          if(changes.question_type)
            type_input.classList.remove("changed");
          if(changes.levels_input)
            levels_input.classList.remove("changed");
        } else {
          window.alert("couldn't delete user");
        }
      }
    });
}

function saveQuestions(){
  page.childNodes.forEach(saveQuestion);
}