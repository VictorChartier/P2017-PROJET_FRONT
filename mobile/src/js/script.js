'use strict';

var idSession = "0000";
var nav = 0;
var actualPage = "homeScreen";
var actualQuote = 0;
var goodReponse = 0;

var refresh = setInterval( function(){
	if (idSession != "0000"){
			$.getJSON('../exchanges/'+ idSession +'.json?'+ new Date().getTime(), function(data) {
				getData(data);
			})
				.fail(function() {
					//getData("error");
				})		
	}
}, 2000);

var lastAction = 0;

var homeScreen = document.getElementById('homeScreen');
var selectScreen = document.getElementById('selectScreen');
var choice = document.getElementById('choice');
var afterChoice = document.getElementById('afterChoice');
var pagePersos = document.getElementById('pagePersos');
var pageMF = document.getElementById('pageMF');

var selectMF = document.getElementById('selectMF');
var selectPerso = document.getElementById('selectPerso');

var voteQuote = document.getElementById('voteQuote');
var voteSec = document.getElementById('voteSec');
var voteMin = document.getElementById('voteMin');
var voteName = document.getElementById('voteName');

var containerCode = document.getElementById('code');
var buttonCode = document.getElementById('buttonCode');

var backButton = document.getElementById('backButton');

var buttonTrue = document.getElementById('buttonTrue');
var buttonFalse = document.getElementById('buttonFalse');

var pagePersosContent = document.getElementById('pagePersosContent');
var pageMFContent = document.getElementById('pageMFContent');

backButton.addEventListener('click', goBack, false);

buttonTrue.addEventListener('click', getVoteTrue, false);
buttonFalse.addEventListener('click', getVoteFalse, false);
buttonCode.addEventListener('click', openSession, false);

selectPerso.addEventListener('click', goToPerso, false);
selectMF.addEventListener('click', goToMF, false);

// PAGE PRECEDENTE
function goBack(){
	if (nav == 2){
		nav = 1;
		affichPage("selectScreen");
	}else if (nav == 1){
		nav = 0;
		idSession = "0000";
		affichPage("homeScreen");
	}
}

// ALLER A LA PAGE PERSONNALITES
function goToPerso(){
	affichPage("pagePersos");
}

// ALLER A LA PAGE MOMENTS FORTS
function goToMF(){
	affichPage("pageMF");
}

// VOTE "J'y crois"
function getVoteTrue(){
	$.getJSON('../exchanges/send.php', {
		idSession: idSession,
		action: "sendVote", 
		param1: "true", 
		value: actualQuote
	}, function(donnees) {
	});

	$.getJSON('../API/ask.php', {
		id: actualQuote,
		true: goodReponse,
		type: "sendVote", 
		vote: "true"
	}, function(donnees) {
		document.getElementById('percentagevraifaux').innerHTML = Math.round(donnees.juste);
		if (goodReponse == "true"){
			document.getElementById('faux').style.display = "none";
			document.getElementById('vrai').style.display = "block";
		} else {
			document.getElementById('vrai').style.display = "none";
			document.getElementById('faux').style.display = "block";
		}
		affichPage("afterChoice");
	});
}

//VOTE "J'y crois pas"
function getVoteFalse(){
	$.getJSON('../exchanges/send.php', {
		idSession: idSession,
		action: "sendVote", 
		param1: "false", 
		value: actualQuote
	}, function(donnees) {
	});
	
	$.getJSON('../API/ask.php', {
		id: actualQuote,
		true: goodReponse,
		type: "sendVote", 
		vote: "false"
	}, function(donnees) {
		document.getElementById('percentagevraifaux').innerHTML = Math.round(donnees.juste);
		if (goodReponse == "true"){
			document.getElementById('faux').style.display = "none";
			document.getElementById('vrai').style.display = "block";
		} else {
			document.getElementById('vrai').style.display = "none";
			document.getElementById('faux').style.display = "block";
		}
		affichPage("afterChoice");
	});
}

//OUVERTURE DE LA SESSION DE LECTURE
function openSession(e){
	$.getJSON('../exchanges/'+ containerCode.value +'.json', function(data) {
		nav = 1;
		affichPage("selectScreen");
		idSession = containerCode.value;
	})
		.fail(function() {
			alert("Aucune session ne correspond à ce code.");
			containerCode.value = "";
		})
	return false;
}

//AFFICHAGE D'UNE PAGE
function affichPage(page){

	if ((nav == 1)&&(page != "selectScreen")){
		nav = 2;
	}

	homeScreen.style.display = "none";
	selectScreen.style.display = "none";
	choice.style.display = "none";
	afterChoice.style.display = "none";
	pagePersos.style.display = "none";
	pageMF.style.display = "none";

	document.getElementById(actualPage).style.display = "block";
	document.getElementById(page).style.display = "block";
	document.getElementById(actualPage).classList.remove("onScreen");
	document.getElementById(actualPage).classList.add("offScreen");
	setTimeout('document.getElementById("'+page+'").classList.remove("offScreen"); document.getElementById("'+page+'").classList.add("onScreen");',300);

	actualPage = page;
}

//RECUPERER LES DONNEES DYNAMIQUES
function getData(data){
	if(lastAction < data.exchanges.length){
		lastAction = data.exchanges.length;
		if (data.exchanges[lastAction - 1].type == "sendQuote"){
			sendQuote(data.exchanges[lastAction - 1]);
		}
	}
}

//RECEVOIR UNE CITATION
function sendQuote(data){

	actualQuote = data.value;

	voteQuote.innerHTML = data.param1;
	voteName.innerHTML = data.param2;

	var min = Math.floor(data.timer / 60);
	var sec = data.timer % 60;

	voteMin.innerHTML = min;
	voteSec.innerHTML = sec;

	resQuote.innerHTML = data.param1;
	resName.innerHTML = data.param2;

	resMin.innerHTML = min;
	resSec.innerHTML = sec;

	goodReponse = data.param3;

	affichPage("choice");
}


//AFFICHER LES CLASSEMENT
function affichClassement(){
	$.getJSON('../API/ask.php', {"type":"classement"} , function(donnees) {
		var i = 1;
		pagePersosContent.innerHTML = "";
			while(typeof(donnees[i]) != "undefined"){
				setTimeout("createRank("+i+", \""+donnees[i].name+"\", \""+donnees[i].affirmations+"\", \""+ donnees[i].true +"\")",i*300);
				i++;
			}
		});
}

//AFFICHER UNE PLACE DU CLASSEMENT
function createRank(rank, name, affirmations, truth){
	$.getJSON('https://www.googleapis.com/freebase/v1/mqlread?query={"type":"/common/topic","name":"'+name+'","id":null}', function(donnees) {
		var topic_id = donnees.result.id;
      	var service_url = 'https://www.googleapis.com/freebase/v1/topic';
      	var params = {"lang":"fr"};
      	var datas;
      	$.getJSON('../API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		datas = donnees;
			$.getJSON(service_url + topic_id + '?callback=?', params, function(topic) {	
				if(typeof(topic.property["/common/topic/image"]) != "undefined") {
					var image = "https://www.googleapis.com/freebase/v1/image"+topic.property["/common/topic/image"].values[0].id+"?maxwidth=1000&maxheight=1000";
				} else {
					var image = "../"+datas.img;
				}

				pagePersosContent.innerHTML += '<div class="unPerso"><span class="pagePersosRank">'+ rank +'</span><span class="pagePersosImg" style="background:url(\''+ image +'\'); background-size:cover; background-position:50% 50%;"></span><span class="pagePersosName">'+ name +'</span><div class="pagePersosContainerBar"><div class="pagePersosBar" style="width:'+ Math.round(truth / affirmations * 100) +'%"></div></div><p class="pagePersosTxt">'+ Math.round(truth / affirmations * 100) +'% de vérité</p></div>';

			});
		});
	}) .fail(function(){
		$.getJSON('../API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		var datas = donnees;	
			var image = "../"+datas.img;

			pagePersosContent.innerHTML += '<div class="unPerso"><span class="pagePersosRank">'+ rank +'</span><span class="pagePersosImg" style="background:url(\''+ image +'\'); background-size:cover; background-position:50% 50%;"></span><span class="pagePersosName">'+ name +'</span><div class="pagePersosContainerBar"><div class="pagePersosBar" style="width:'+ Math.round(truth / affirmations * 100) +'%"></div></div><p class="pagePersosTxt">'+ Math.round(truth / affirmations * 100) +'% de vérité</p></div>';

		});
	});
}

//AFFICHER LES MOMENTS FORTS
function affichMF(){
	$.getJSON('../src/js/actions.json', function(donnees) {
		var i;
	    for(i = 0; i < donnees.actions.length; i++) {
	       if (donnees.actions[i].action == "quote"){
	       		setTimeout("createMF(\""+ donnees.actions[i].timer +"\", \""+ donnees.actions[i].param2 +"\", \""+ donnees.actions[i].param1 +"\")", 300*i);
	       }
	    }
	});
}

//AFFICHER UN MOMENT FORT
function createMF(rank, name, quote){
	var min = Math.floor(rank / 60);
	if (min < 10){
		min = "0" + min;
	}
	var sec = Math.round(rank % 60);
	if (sec < 10){
		sec = "0" + sec;
	}
	$.getJSON('https://www.googleapis.com/freebase/v1/mqlread?query={"type":"/common/topic","name":"'+name+'","id":null}', function(donnees) {
		var topic_id = donnees.result.id;
      	var service_url = 'https://www.googleapis.com/freebase/v1/topic';
      	var params = {"lang":"fr"};
      	var datas;
      	$.getJSON('../API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		datas = donnees;
			$.getJSON(service_url + topic_id + '?callback=?', params, function(topic) {	
				if(typeof(topic.property["/common/topic/image"]) != "undefined") {
					var image = "https://www.googleapis.com/freebase/v1/image"+topic.property["/common/topic/image"].values[0].id+"?maxwidth=1000&maxheight=1000";
				} else {
					var image = "../"+datas.img;
				}



				pageMFContent.innerHTML += '<div class="unMoment"><span class="pageMFRank">'+ min +'\''+ sec +'</span><span class="pageMFImg" style="background:url(\''+ image +'\'); background-size:cover; background-position:50% 50%;"></span><span class="pageMFName">'+ name +'</span><p class="pageMFTxt">"<span>'+ quote +'</span>"</p></div>';

			});
		});
	}) .fail(function(){
		$.getJSON('../API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		var datas = donnees;	
			var image = "../"+datas.img;

			pageMFContent.innerHTML += '<div class="unMoment"><span class="pageMFRank">'+ min +'\''+ sec +'</span><span class="pageMFImg" style="background:url(\''+ image +'\'); background-size:cover; background-position:50% 50%;"></span><span class="pageMFName">'+ name +'</span><p class="pageMFTxt">"<span>'+ quote +'</span>"</p></div>';

		});
	});
}


affichMF();
affichClassement();