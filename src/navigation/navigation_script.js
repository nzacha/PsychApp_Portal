function loadHTMLFrom(pageURL, scriptURL){
  //document.getElementById("content").innerHTML='<object style="height:100%; padding:0px; padding-top:10px;" class="container-fluid" type="text/html" data="'+pageURL+'.html" ></object>'
	var xhr = new XMLHttpRequest();
	xhr.open("GET", pageURL+".html", true);
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var parser = new DOMParser();		
			var htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
	        document.getElementById("html-content").innerHTML = htmlDoc.getElementsByTagName("div")[0].innerHTML;			
	        loadJSFrom(scriptURL);
		}
	}
	xhr.send(null);
}

function loadJSFrom(scriptURL){	
	// Create new script element
	const script = document.createElement('script');
	script.src = scriptURL+'.js';

	// Append to the `head` element
	document.head.appendChild(script);
}

$(document).ready(function() {
	$(".navbar-nav .nav-link").on("click", function(){
	   $(".navbar-nav").find(".active").removeClass("active");
	   $(this).addClass("active");
	});
});

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

var queryTab = document.getElementById("tab_query");
var quizTab = document.getElementById("tab_quiz");
var userTab = document.getElementById("tab_user");
var accountTab = document.getElementById("tab_account");
window.onload = function() {
	loadHTMLFrom('../query_selector/index', '../query_selector/query_script');
};