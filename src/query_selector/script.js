var content = document.getElementById("query_content");
console.log(content);

function selectQueryContent(value){
  console.log(value);
  switch (value){
    case "1":
      setVisible("query_question", true);
      setVisible("query_user", false);
    break;
    case "2":      
      setVisible("query_question", false);
      setVisible("query_user", true);
    break;
    default:
  }
}

function setVisible(item_id, value){
  let item = document.getElementById(item_id);
  switch (value){
    case true:
      item.style = "display: block;" 
    break;
    case false:
      item.style = "display: none;" 
    break;
  }
}
