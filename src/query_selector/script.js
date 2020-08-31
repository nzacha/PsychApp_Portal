var users;

function selectQueryContent(value){
  switch (value){
    case 1:
      setVisible("query_content", false);
    break;
    case 2:
      setVisible("query_content", true);
      setVisible("questions_content", true);
      setVisible("users_content", false);
    break;
    case 3:
      setVisible("query_content", true);
      setVisible("questions_content", false);
      setVisible("users_content", true);
    break;
    default:
  }
}
selectQueryContent(3);

var page = document.getElementById("content");

function loadAnswer(value, index, array){
  let answer_card = document.createElement("div");
  answer_card.classList.add("mt-1");
  answer_card.classList.add("card");

  let answer_body = document.createElement("div");
  answer_body.classList.add("card-body");
  answer_card.appendChild(answer_body);

  let answer_id_container = document.createElement("div");
  answer_id_container.classList.add("input-group");
  answer_id_container.classList.add("mb-3");
  let answer_id_title_container = document.createElement("div");
  answer_id_title_container.classList.add("input-group-prepend");
  answer_id_title_container.style = "width: 80px;";
  answer_id_container.appendChild(answer_id_title_container);
  let answer_id_title = document.createElement("span");
  answer_id_title.classList.add("input-group-text");
  answer_id_title.style = "width: 80px;";
  answer_id_title.innerHTML = "Question: ";
  answer_id_title_container.appendChild(answer_id_title);
  let answer_id_input = document.createElement("label");
  answer_id_input.innerHTML = value.question.question_text;
  answer_id_input.classList.add("form-control");
  answer_id_input.setAttribute("readonly", "readonly");
  answer_id_container.appendChild(answer_id_input);

  let answer_text_container = document.createElement("div");
  answer_text_container.classList.add("input-group");
  answer_text_container.classList.add("mb-3");
  let answer_text_title_container = document.createElement("div");
  answer_text_title_container.style = "width: 80px;";
  answer_text_title_container.classList.add("input-group-prepend");
  answer_text_container.appendChild(answer_text_title_container);
  let answer_text_title = document.createElement("span");
  answer_text_title.classList.add("input-group-text");
  answer_text_title.style = "width: 80px;";
  answer_text_title.innerHTML = "Answer: ";
  answer_text_title_container.appendChild(answer_text_title);
  let answer_text_input = document.createElement("input");
  answer_text_input.style = "text-align: center;";
  answer_text_input.placeholder = value.text;
  answer_text_input.type = "text";
  answer_text_input.classList.add("form-control");
  answer_text_input.setAttribute("readonly", "readonly");
  answer_text_container.appendChild(answer_text_input);

  answer_body.appendChild(answer_id_container);
  answer_body.appendChild(answer_text_container);

  page.appendChild(answer_card);
}

function loadQuery(){
  page.innerHTML = "";
  let user_id = parseInt(document.getElementById("user_id_value").innerHTML);  
  //console.log(user_id);
  $.ajax({
    url: serverURL + "/answers/" + user_id,
    type: 'GET',
    dataType: 'json',
    success: function(data, textStatus, xhr) {      
      if(xhr.status === 200){
        //console.log(data);
        if(Object.keys(data).length === 0)
          window.alert("no answers found");
        else
          data.forEach(loadAnswer);        
      } else {
        window.alert("an error occured");
      }
    }
  });
}