"use strict";

var idSession = "";
var previous_time = 0;
var id_info = 1;
var quoteAffich = 0;

var lePlayer = document.getElementById('video');

var fleche_player = document.getElementById('fleche_player');
var fleche_player_back = document.getElementById('fleche_player_back');
var pageRight = document.getElementById('pageRight');
var pageLeft = document.getElementById('pageLeft');
var containerControl = document.getElementById('containerControl');
var header = document.getElementById('header');

var buttonInfos = document.getElementById('buttonInfos');
var buttonRank = document.getElementById('buttonRank');

var rightZone3 = document.getElementById('rightZone3');
var rightZone4 = document.getElementById('rightZone4');

var cadreInfos = document.getElementById("cadreInfos");
var cadreInfoName = document.getElementById("cadreInfoName");
var cadreInfoQuote = document.getElementById("cadreInfoQuote");

var popUp = document.getElementById("popUp");
var popUpLink = document.getElementById("popUpLink");

var pB=document.getElementById('progressBar');

var phoneClick = document.getElementById('phoneClick');

phoneClick.addEventListener('click', popUpConnect, false);

popUpLink.addEventListener('click', closePopUp, false);

fleche_player.addEventListener('click', retract, false);
fleche_player_back.addEventListener('click', extend, false);

buttonInfos.addEventListener('click', affich_infos, false);
buttonRank.addEventListener('click', affich_rank, false);

//AFFICHAGE DE L'ONGLET INFOS
function affich_infos(){
	buttonInfos.classList.add("asideSelected");
	buttonInfos.classList.remove("asideUnselected");

	buttonRank.classList.remove("asideSelected");
	buttonRank.classList.add("asideUnselected");

	rightZone3.classList.remove("unvisible");
	rightZone4.classList.add("unvisible");
}


//AFFICHAGE DE L'ONGLET CLASSEMENT
function affich_rank(){
	buttonRank.classList.add("asideSelected");
	buttonRank.classList.remove("asideUnselected");

	buttonInfos.classList.remove("asideSelected");
	buttonInfos.classList.add("asideUnselected");

	rightZone4.classList.remove("unvisible");
	rightZone3.classList.add("unvisible");
}

//RETRACTER LA ZONE DE DROITE
function retract(e){
	pageLeft.classList.add('pageFull');
	pageLeft.classList.remove('pageLeft');

	pageRight.classList.add('pageNone');
	pageRight.classList.remove('pageRight');

	fleche_player.classList.add('unvisible');

	fleche_player_back.classList.remove('unvisible');

	header.classList.add('full');
	containerControl.classList.add('full');
}

//REAFFICHER LA ZONE DE DROITE
function extend(e){
	pageLeft.classList.remove('pageFull');
	pageLeft.classList.add('pageLeft');

	pageRight.classList.remove('pageNone');
	pageRight.classList.add('pageRight');

	fleche_player.classList.remove('unvisible');

	fleche_player_back.classList.add('unvisible');

	header.classList.remove('full');
	containerControl.classList.remove('full');

	
}

//OBJET PLAYER
var player={};

player.video=document.getElementById('video');
player.button=document.getElementById('button');
player.pausebutton=document.getElementById('pausebutton');
player.pB=document.getElementById('progressBar');
player.container=document.getElementById('containerPlayer');
player.button.classList.add('loading');
player.video.load();

player.setVideoTime = function(e) {
	e.stopPropagation();
	player.video.currentTime=e.offsetX*player.video.duration/this.offsetWidth;
	var newTime = Math.round(e.offsetX*player.video.duration/this.offsetWidth);

	var infosTalker = 0;

	while (infosTalker != 1){
		if (actions[newTime]){
			if (actions[newTime].action){
				if(actions[newTime].action == "talk"){
					doTalk(actions[newTime]);
					infosTalker = 1;
				}
			} 
		}
		newTime--;
	}
}

player.playProgress = function() {
	var self=this;
	var progress=self.currentTime*100/self.duration;
	document.querySelector('.progressBar').style.width=progress+'%';
	if (previous_time != Math.round(self.currentTime)){
		previous_time = Math.round(self.currentTime);
		if (actions[Math.round(self.currentTime)]){
			doAction(actions[Math.round(self.currentTime)]);
		}
		if (quoteAffich == 0){
			var min = Math.floor(previous_time / 60);
			if (min < 10){
				min = "0"+min;
			}
			var sec = previous_time % 60;
			if (sec < 10){
				sec = "0"+sec;
			}
			cadreInfoQuote.innerHTML = min+":"+sec;
		}
	}
}

player.playPause = function(e){
	if(e.type=='canplaythrough'){
		player.video.removeEventListener('canplaythrough',player.playPause,false);
	}
	player.button.classList.remove('loading');
	if(player.video.paused){
		player.video.play();
		player.button.classList.add('unvisible');
		player.pausebutton.classList.remove('unvisible');
	}
	else{
		player.video.pause();
		player.button.classList.remove('unvisible');
		player.pausebutton.classList.add('unvisible');
	}
}

//player.video.addEventListener('canplaythrough',player.playPause,false);
player.button.addEventListener('click',player.playPause,false);
player.pausebutton.addEventListener('click',player.playPause,false);
player.container.addEventListener('click',player.playPause,false);
player.video.addEventListener('timeupdate',player.playProgress,false);
player.pB.addEventListener('click',player.setVideoTime,false);


//EFFECTUER UNE ACTION
function doAction(action){
	if (action.action == "lieu"){
		doLieu(action);
	}

	if (action.action == "start"){
		console.log("L'émission commence !");
	}

	if (action.action == "quote"){
		doQuote(action);
	}

	if (action.action == "talk"){
		doTalk(action);
	}
}

//AFFICHER UN LIEU
function doLieu(action){
	rightZone3.innerHTML = '<div id="info_'+id_info+'" class="infoLieu"><div class="infoLieuMap" style="background:url(\'https://maps.googleapis.com/maps/api/staticmap?center='+action.param1+','+action.param2+'&zoom=4&size=512x512&maptype=terrain\
&markers=size:mid%7Ccolor:red%7C'+action.param1+','+action.param2+'\'); background-position:50% 50%;"></div><div class="lieuMore"><div class="lieuMoreName"><p class="nameVille">'+action.param1+'</p><p class="namePays">'+action.param2+'</p></div><div class="lieuMoreImg" style="background:url(\'https://maps.googleapis.com/maps/api/streetview?size=200x200&location='+action.param1+','+action.param2+'&heading=235\'); background-position:50% 50%; background-size:cover;"></div></div></div>' + rightZone3.innerHTML;
	setTimeout('document.getElementById("info_'+id_info+'").classList.add("visibleInfo");',10);
	id_info++;
}

//AFFICHER UNE CITATION
function doQuote(action){
	$.getJSON('exchanges/send.php', {
		idSession: idSession,
		action: "sendQuote", 
		param1: action.param1, 
		param2: action.param2, 
		param3: action.param3, 
		timer: action.timer, 
		value: action.value
	}, function(donnees) {
	});

	quoteAffich = 1;

	cadreInfoName.innerHTML = action.param2;
	cadreInfoQuote.innerHTML = action.param1;

	setTimeout("cadreInfoName.innerHTML = 'Grâce à votre smartphone, vous pouvez donner votre opinion.'; cadreInfoQuote.innerHTML = ''; quoteAffich = 0;", 20000);

	var quoteImg = "";
	var quoteName = "";
	var quoteQuote = "";
	$.getJSON('https://www.googleapis.com/freebase/v1/mqlread?query={"type":"/common/topic","name":"'+action.param2+'","id":null}', function(donnees) {
		var topic_id = donnees.result.id;
      	var service_url = 'https://www.googleapis.com/freebase/v1/topic';
      	var params = {"lang":"fr"};
      	var datas;
      	$.getJSON('API/ask.php', {"type":"people", "name":action.param2}, function(donnees) {
      		datas = donnees;
			$.getJSON(service_url + topic_id + '?callback=?', params, function(topic) {	
				

				if(typeof(topic.property["/common/topic/image"]) != "undefined") {
					quoteImg = "https://www.googleapis.com/freebase/v1/image"+topic.property["/common/topic/image"].values[0].id+"?maxwidth=1000&maxheight=1000";
				} else {
					quoteImg = datas.img;
				}
				quoteName = action.param2;
				quoteQuote = action.param1;

				rightZone3.innerHTML = '<div id="info_'+id_info+'" class="infoQuote"><div class="infoQuoteTxt"><p>"<span>'+ quoteQuote +'</span>"</p></div><div class="quoteMore"><div class="quoteMoreImg" style="background:url(\''+ quoteImg +'\'); background-position:50% 50%; background-size:cover;"></div><div class="quoteMoreName"><p class="namePerso">'+ quoteName +'</p></div></div></div></div>' + rightZone3.innerHTML;
				setTimeout('document.getElementById("info_'+id_info+'").classList.add("visibleInfo");',10);
				id_info++;
			});
		});
	}).fail(function(){
		$.getJSON('API/ask.php', {"type":"people", "name":action.param2} , function(donnees) {
      		var datas = donnees;
				quoteImg = datas.img;
				quoteName = action.param2;
				quoteQuote = action.param1;

				rightZone3.innerHTML = '<div id="info_'+id_info+'" class="infoQuote"><div class="infoQuoteTxt"><p>"<span>'+ quoteQuote +'</span>"</p></div><div class="quoteMore"><div class="quoteMoreImg" style="background:url(\''+ quoteImg +'\'); background-position:50% 50%; background-size:cover;"></div><div class="quoteMoreName"><p class="namePerso">'+ quoteName +'</p></div></div></div></div>' + rightZone3.innerHTML;
				setTimeout('document.getElementById("info_'+id_info+'").classList.add("visibleInfo");',10);
				id_info++;
		});
	});
}

var asidePolName = document.getElementById("asidePolName");
var asidePolTexte = document.getElementById("asidePolTexte");
var asidePolImg = document.getElementById("asidePolImg");
var asidePolFamille = document.getElementById("asidePolFamille");

//MODIFIER LA PERSONNE QUI PARLE
function doTalk(action){

	$.getJSON('https://www.googleapis.com/freebase/v1/mqlread?query={"type":"/common/topic","name":"'+action.param1+'","id":null}', function(donnees) {
		var topic_id = donnees.result.id;
      	var service_url = 'https://www.googleapis.com/freebase/v1/topic';
      	var params = {"lang":"fr"};
      	var datas;
      	$.getJSON('API/ask.php', {"type":"people", "name":action.param1} , function(donnees) {
      		datas = donnees;
			$.getJSON(service_url + topic_id + '?callback=?', params, function(topic) {	
				
				asidePolName.innerHTML = topic.property['/type/object/name'].values[0].text;
				if(topic.property["/common/topic/description"].values[0].text){
					asidePolTexte.innerHTML = topic.property["/common/topic/description"].values[0].text;
				} else {
					asidePolTexte.innerHTML = datas.description;
				}
				

				if(typeof(topic.property["/common/topic/image"]) != "undefined") {
					asidePolImg.style.background = "url('https://www.googleapis.com/freebase/v1/image"+topic.property["/common/topic/image"].values[0].id+"?maxwidth=1000&maxheight=1000')";
				} else {
					asidePolImg.style.background = "url('"+datas.img+"')";
				}
				asidePolImg.style.backgroundSize = "cover";
				asidePolFamille.innerHTML = datas.family;
				asidePolFamille.style.color = datas.familyColor;
			});
		});
	}).fail(function(){
		$.getJSON('API/ask.php', {"type":"people", "name":action.param1} , function(donnees) {
      		var datas = donnees;
				
				asidePolName.innerHTML = action.param1;
				asidePolTexte.innerHTML = datas.description;
				asidePolImg.style.background = "url('"+datas.img+"')";
				asidePolImg.style.backgroundSize = "cover";
				asidePolFamille.innerHTML = datas.family;
				asidePolFamille.style.color = datas.familyColor;
		});
	});

}

//RECUPERER LES ACTIONS DU REPLAY
var actions = new Array();

$.getJSON('src/js/actions.json', function(donnees) {
	var i;
    for(i = 0; i < donnees.actions.length; i++) {
       actions[donnees.actions[i].timer] = {"action" : donnees.actions[i].action, "value": donnees.actions[i].value,
          "param1": donnees.actions[i].param1,
          "param2": donnees.actions[i].param2,
          "param3": donnees.actions[i].param3,
      	  "timer": donnees.actions[i].timer};
    }
});

var rightZone4 = document.getElementById("rightZone4");

//RECUPERER ET AFFICHER LES CLASSEMENT
function affichClassement(){
	$.getJSON('API/ask.php', {"type":"classement"} , function(donnees) {
		var i = 1;
		rightZone4.innerHTML = "";
			while(typeof(donnees[i]) != "undefined"){
				setTimeout("createRank("+i+", \""+donnees[i].name+"\", \""+donnees[i].affirmations+"\", \""+ donnees[i].true +"\")",i*300);
				i++;
			}
		});
}

//AFFICHER UN RANG DU CLASSEMENT
function createRank(rank, name, affirmations, truth){
	var pair = " unpair";
	if(rank % 2 == 0){
		pair = "";
	}
	$.getJSON('https://www.googleapis.com/freebase/v1/mqlread?query={"type":"/common/topic","name":"'+name+'","id":null}', function(donnees) {
		var topic_id = donnees.result.id;
      	var service_url = 'https://www.googleapis.com/freebase/v1/topic';
      	var params = {"lang":"fr"};
      	var datas;
      	$.getJSON('API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		datas = donnees;
			$.getJSON(service_url + topic_id + '?callback=?', params, function(topic) {	
				if(typeof(topic.property["/common/topic/image"]) != "undefined") {
					var image = "https://www.googleapis.com/freebase/v1/image"+topic.property["/common/topic/image"].values[0].id+"?maxwidth=1000&maxheight=1000";
				} else {
					var image = datas.img;
				}

				rightZone4.innerHTML += '<div class="containerRank'+ pair +'"><div class="rankRank">'+ rank +'</div> <div class="rankPolImg" id="rankPolImg" style="background:url(\''+ image +'\'); background-size: cover;"></div><div class="rankRight"><p class="rankPolName">'+ name +'</p><p class="rankPolFamille" style="color:'+ donnees.familyColor +'">'+ donnees.family +'</p><div class="rankJaugeContainer"><div class="rankJauge" style="width:'+ Math.round(truth / affirmations * 100) +'%"></div></div><p class="rankPercentage"><span class="rankPercent">'+ Math.round(truth / affirmations * 100) +'%</span> de vérités</p></div></div>';

			});
		});
	}) .fail(function(){
		$.getJSON('API/ask.php', {"type":"people", "name":name} , function(donnees) {
      		var datas = donnees;	
			var image = datas.img;

			rightZone4.innerHTML += '<div class="containerRank'+ pair +'"><div class="rankRank">'+ rank +'</div> <div class="rankPolImg" id="rankPolImg" style="background:url(\''+ image +'\'); background-size: cover;"></div><div class="rankRight"><p class="rankPolName">'+ name +'</p><p class="rankPolFamille" style="color:'+ donnees.familyColor +'">'+ donnees.family +'</p><div class="rankJaugeContainer"><div class="rankJauge" style="width:'+ Math.round(truth / affirmations * 100) +'%"></div></div><p class="rankPercentage"><span class="rankPercent">'+ Math.round(truth / affirmations * 100) +'%</span> de vérités</p></div></div>';

		});
	});
}

//CREATION DE LA SESSION DE LECTURE
function createSession(){
	var ListeCar = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
	for(var i = 0; i < 5; i++)
	{
		idSession = idSession + ListeCar[Math.floor(Math.random()*ListeCar.length)];
	}

	$.getJSON('exchanges/send.php', {
		idSession: idSession,
		action: "newSession"
	}, function(donnees) {
		document.getElementById("spanSession").innerHTML = idSession;
		popUpConnect();
	});
}

//AFFICHAGE DE LA POP UP DE CONNEXION MOBILE
function popUpConnect(){
	popUp.classList.remove("none");
	
	player.button.classList.remove('loading');
	//var self=this;
	player.video.pause();
	player.button.classList.remove('unvisible');
	player.pausebutton.classList.add('unvisible');
}

//FERMETURE DE LA POPUP
function closePopUp(){
	popUp.classList.add("none");
}

//INITIALISATION
function init(){
	createSession();
	affichClassement();
}

init();