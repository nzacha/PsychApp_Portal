function loadHTMLFrom(pageURL){
  document.getElementById("content").innerHTML='<object style="height:100%; padding:0px; padding-top:10px;" class="container-fluid" type="text/html" data="'+pageURL+'.html" ></object>'
}

$(document).ready(function() {
	$(".navbar-nav .nav-link").on("click", function(){
	   $(".navbar-nav").find(".active").removeClass("active");
	   $(this).addClass("active");
	});
});

var queryTab = document.getElementById("tab_query");
var quizTab = document.getElementById("tab_quiz");
var userTab = document.getElementById("tab_user");
var accountTab = document.getElementById("tab_account");
window.onload = function() {
	loadHTMLFrom('../query_selector/index')
};