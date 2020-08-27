var users = 
[
  {
      "id": 10,
      "name": "Nicolas",
      "surname": "Zachariou",
      "createdAt": "2020-08-04T20:57:24.465Z",
      "updatedAt": "2020-08-04T20:57:24.465Z",
      "researcherId": 2
  },
  {
      "id": 11,
      "name": "",
      "surname": "",
      "createdAt": "2020-08-25T07:33:32.989Z",
      "updatedAt": "2020-08-25T07:33:32.989Z",
      "researcherId": 2
  }
]

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

/*
let title_text = document.createElement("textarea");
title_text.setAttribute("id","product-" + "infolist-attr-title-"+productId+"-"+listLength);
title_text.setAttribute("style", "resize:none;");
title_text.setAttribute("rows", "1"); 
title_text.setAttribute("cols", "15");  
title_text.onfocus = function(){
  if(!this.value){
    this.value = this.placeholder;
  }
};
title_text.onblur = function(){
  if(this.value == this.placeholder){
    this.placeholder = this.value;
    this.value = null;      
  }
};
*/