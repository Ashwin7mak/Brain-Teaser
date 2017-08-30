/* Firebase Database */
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPjW7mYcTsb-QaQfrRk87loBtK6GJKG4g",
    authDomain: "puzzle-59ba0.firebaseapp.com",
    databaseURL: "https://puzzle-59ba0.firebaseio.com",
    projectId: "puzzle-59ba0",
    storageBucket: "puzzle-59ba0.appspot.com",
    messagingSenderId: "782684186013"
  };
  firebase.initializeApp(config);

database = firebase.database();
  var ref = database.ref('puzzle-59ba0');

/* 
	Function to do email Validation

var x = document.getElement
var btn = document.getElementById('subclick');
var emailField = document.getElementById('email');
var myForm = document.getElementById('sendform');

emailField.oninvalid =function(e){
	e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
    e.target.setCustomValidity("Enter email ID");
  }
};

emailField.oninput = function(e) {
  e.target.setCustomValidity("");
};

btn.addEventListener('click',function(e) {
	document.querySelector('#submitBtn').click();
});
*/
/* 
	Function : dragStart
	Purpose  : Used to drag box from 
*/
function dragStart(e){
	e.stopPropagation();
	var boxObj = this,
	dataObj = this.text;
	boxObj.className = boxObj.className + " is-dragged";
	e.dataTransfer.effectAllowed = 'copy';
	e.dataTransfer.setData('text', dataObj); 
}

/* 
	Function : dragStart
	Purpose  : Used to drag box to
*/
function dragEnd(e){
	e.stopPropagation();
	var boxObj = this;
	boxObj.className = boxObj.className.replace('is-dragged',''); 
}

/* 
	Function : dragEnter
	Purpose  : Used to drag enter
*/
function dragEnter(e){
	if (e.stopPropagation) e.stopPropagation();
	this.className = this.className + " dropover";
}

/* 
	Function : dragLeave
	Purpose  : Used to drag leave
*/
function dragLeave(e){
	if (e.stopPropagation) e.stopPropagation();
	this.className = this.className.replace('dropover','');
}

/* 
	Function : dragOver
	Purpose  : Used to drag Over
*/
function dragOver(e){
	if (e.stopPropagation) e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
	return false; 
}


function drag(e) {
	e.dataTransfer.setData('Text/html', e.target.id);
}



/* 
	Function : drop
	Purpose  : Used to drop box
*/
function drop(e,target){
	if (e.stopPropagation) e.stopPropagation();
	var removeEl = e.dataTransfer.getData('text'),
	boxes = document.getElementsByClassName('box'),
	dropZone = document.getElementById('dropzone');
	
	//alert($('#dropzone').attr('id'));
	
	var data = e.dataTransfer.getData("text/html");
    //alert(data);
	//alert(localStorage.getItem(data));
	
	//alert(e.target.id);
	
	localStorage.setItem(e.target.id,localStorage.getItem(data));
	
	//alert(localStorage.getItem(e.target.id)+" is stored in "+e.target.id);
	
	
	//alert(removeEl);
	
	//$(e.target).effect("highlight", {}, 3000);
	
	for( var i=0; i<boxes.length; i++ ){
		if( boxes[i].text == removeEl ){
			boxes[i].parentNode.removeChild(boxes[i]);			
			if( boxes.length <= 0 ){
				var a = document.createElement('a'),
				h3 = document.createElement('h3'),
				boxWrapper = document.getElementsByClassName('drop-boxes');
				//h3.innerHTML = "Hooray! You removed all the boxes.";
				//a.setAttribute('href','sample.html');
				//a.setAttribute('id','restartLink');
				//a.addEventListener('click',restartLink,false);
				//a.className = 'show';
				//a.innerHTML = 'Click me to restart.';
				
				boxWrapper[0].appendChild(h3);
				boxWrapper[0].appendChild(a);
				//dropZone.className = 'hide';
				$("#showtextimg").hide();
			}
		}
	}
	
	this.className = this.className.replace('dropover','');
	return false;
}

/* 
	Function : restartLink
	Purpose  : Used to restart game
*/
function restartLink(e){
	e.preventDefault();
	var h3 = document.getElementsByTagName('h3')[0],
	dropBoxes = document.getElementsByClassName('drop-boxes')[0],
	dropZone = document.getElementById('dropzone');
	this.className = this.className.replace('show','') + 'hide';
	dropZone.className = dropZone.className.replace('hide','show');
	h3.parentNode.removeChild(document.getElementsByTagName('h3')[0]);
	
	//Initialize Clicks = 0
	localStorage.setItem('clicks',0);
	
	
	boxids = ['apple','orange','mixed'];
	for( var i=0,box=''; i<3; i++ ){
		box = document.createElement('a');
		box.className = 'box';
		//box.setAttribute('href','#');
		box.setAttribute('draggable','true');
		box.setAttribute('id',boxids[i]);
		box.ondragstart = function () {drag(event)};
		//box.addEventListener('ondragstart', function () { drag(event); }, false)
		//box.click = function () {$('.sbox').click;};
		//box.setAttribute('ondragstart','drag(event)');
		box.text = boxids[i].toUpperCase();
		dropBoxes.appendChild(box);
	}
	this.parentNode.removeChild(this);
	init();
}

/* 
	Function : init
	Purpose  : Used to initialize game
*/
function init(){
	var boxes = document.querySelectorAll('.box'),
	dropZone = document.getElementById('dropzone');
	
	for( var i=0,len=boxes.length; i<len; i++ ){
		boxes[i].addEventListener('dragstart', dragStart, false);
		boxes[i].addEventListener('dragend', dragEnd, false);
	}
	dropZone.addEventListener('dragenter', dragEnter, false);
	dropZone.addEventListener('dragleave', dragLeave, false);
	dropZone.addEventListener('dragover', dragOver, false);
	dropZone.addEventListener('drop', drop, false);
}

// After Document Ready
$(document).ready(function(){
	init();
    
    var emailid = document.getElementById('email');
    //var emailvalue = $('#email').val();
    //alert(emailValue);
    //if(emailvalue == "" ||emailvalue == "Enter your E-mail id" ){
    //    alert("Please Enter email");
    function validateEmail(){
        var email = $(this).val();
        //alert(email);
    
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        if (!filter.test(email)) { 
            alert('Please provide a valid email address');
            emailid.focus; 
            return false;
        }
    }
    $('#email').on('change',function(e){
        validateEmail();
    });
    
	var random = Math.floor(Math.random() * 2) + 1;
	
	//Initialize Clicks = 0
	localStorage.setItem('clicks',0);
	var correct = 0;
    var	incorrect = 0;
	var actualMixed ="";
	if(random%2 == 0){
		localStorage.setItem('mixed','orange');
		localStorage.setItem('orange','apple');
		localStorage.setItem('apple','mixed');
        actualMixed = "apple";
        //alert("mix fruits are in box "+actualMixed);
	}else{
		localStorage.setItem('mixed','apple');
		localStorage.setItem('apple','orange');
		localStorage.setItem('orange','mixed');
        actualMixed = "orange";
       // alert("mix fruits are in box "+actualMixed);
	}
	
	//Click on Source Box - Click allow only once
	$('.sbox').on('click', function(e) {
		 boxid = $(this).attr('id');
        var boxname = boxid;
        //alert("box clicked:"+boxid);
		if(localStorage.getItem('clicks') == 0){
			localStorage.setItem('clicks',1);
            //if user clicks on a box which actually contains mixed fruit, the negation of its label will be displayed.
            if(boxname == actualMixed){
                //alert("box clicked contains mixed fruit");
                if(boxname == "apple"){
                    //alert("assigned orange to boxid");
                    boxname = "orange";
                     $("#showtextimg").show();
			$("#showtextimg h2").text("Hey It is.. "+ boxname);
			$("#showimg").attr('src','images/'+boxname+'.png');
                }
                else if(boxid == "orange"){
                    alert("assigned apple to boxid");
                    boxname = "apple";
                   // localStorage.setItem('boxid','apple');
                     $("#showtextimg").show();
			$("#showtextimg h2").text("Hey It is.. "+ boxname);
			$("#showimg").attr('src','images/'+boxname+'.png');
                }
                
            }
            
            else{
            $("#showtextimg").show();
			$("#showtextimg h2").text("Hey It is.. "+ localStorage.getItem(boxid));
			$("#showimg").attr('src','images/'+localStorage.getItem(boxid)+'.png');
            }
        }
        else{
			alert('You can click on only one box');			
		}							 
	});
	   function checkemail(){
           if($("#email").val()==""){
           alert("Email ID is required");
               return false;
            }
           else{
               var email = document.getElementById('email'); 
               var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
               if (!filter.test(email.value))
                   { 
                       alert('Please provide a valid email address'); 
                       email.focus; 
                       return false;
                   }

           return true;
       }}
	
	
$('.submit-game').on('click', function(e) {
        var flagEmail = checkemail();
        if(flagEmail === false){
            $('#email').focus();
        }
    else {
		var boxes = document.querySelectorAll('.box');	
		if(boxes.length>0){
			alert('Drag all fruit boxes');	
			return false;
		}else{
			boxids = ['apple','orange','mixed'];
			for( var cnt=0; cnt<boxids.length; cnt++ ){
				//alert(cnt);
				//alert(localStorage.getItem('d'+boxids[cnt]));
				if(localStorage.getItem('d'+boxids[cnt]) == boxids[cnt]){
                    e.stopPropagation();
					$('#d'+boxids[cnt]).append('<p class="correct">Correct</p>');
					correct = correct + 1;
				}else{
                    e.stopPropagation();
					$('#d'+boxids[cnt]).append('<p class="incorrect">In Correct</p>');
					incorrect = incorrect + 1;
				}
			}
			
			
			//Checking counts
			if(correct == 3){
                document.getElementById("valueStorage").value = "Successful";
                $('#dropzone').append('<h1 class="success">Congratulations. You Win Game</h1>');}
			else{
                document.getElementById("valueStorage").value = "Failure";
                $('#dropzone').append('<h1 class="failed">Sorry! try again</h1>');}
            $(".submit-game").css("background-color", "#999999");
            $(".submit-game").prop("disabled", true);
			
		}
		$('#restartGame').on('click', function(e) {
            $(".submit-game").prop("disabled", false);    
            });
        }
        
        //Saving the Email and Answer of the user to the Firebase
          var email = $('#email').val();
		  var answer = $('#valueStorage').val();
		
		  writeFirebase(email,answer);
		  
		  function writeFirebase(email,answer){
		  	var postData = {
		    "email": email,
		    "answer": answer,
		  };

		var newPostKey = firebase.database().ref().child('posts').push().key;
		var updates = {};
					 
		updates["/"+newPostKey+"/"] = postData;
		  
		console.log("writepost function finished successfully");
		return firebase.database().ref().update(updates);
		}
	});
});