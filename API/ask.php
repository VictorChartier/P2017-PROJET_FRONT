<?php
header('Content-Type: application/json');

$people = array(
	"David Pujadas" => 	array(
							"name" => "David Pujadas",
							"id" => 0,
							"family" => "-",
							"familyColor" => "#CCCCCC",
							"description" => "-",
							"img" => "src/img/mini_pol/dp.jpg"
						), 
	"Marine Le Pen" => 	array(
							"name" => "Marine Le Pen",
							"id" => 1,
							"family" => "FN",
							"familyColor" => "#163f89",
							"description" => "-",
							"img" => "src/img/mini_pol/mlp.jpg"
	), 
	"Nathalie Kosciusko-Morizet" => 	array(
							"name" => "Nathalie Kosciusko-Morizet",
							"id" => 2,
							"family" => "UMP",
							"familyColor" => "#215dcb",
							"description" => "-",
							"img" => "src/img/mini_pol/nkm.jpg"
	), 
	"François Bayrou" => 	array(
							"name" => "François Bayrou",
							"id" => 3,
							"family" => "MODEM",
							"familyColor" => "#da7b1f",
							"description" => "-",
							"img" => "src/img/mini_pol/fb.jpg"
	),
	"Pierre Laurent" => 	array(
							"name" => "Pierre Laurent",
							"id" => 4,
							"family" => "PC",
							"familyColor" => "#da2020",
							"description" => "-",
							"img" => "src/img/mini_pol/pl.png",
	),
	"Jean-Christophe Cambadélis" => 	array(
							"name" => "Jean-Christophe Cambadélis",
							"id" => 5,
							"family" => "PS",
							"familyColor" => "#da2020",
							"description" => "-",
							"img" => "src/img/mini_pol/jcc.png"
	)
);


if(isset($_GET['type'])){

	if( $_GET['type'] == "people"){
		$person = $people[$_GET['name']];
		$reponse = 	array(	"name" => $person['name'],
							"id" => $person['id'],
							"family" => $person['family'],
							"familyColor" => $person['familyColor'],
							"img" => $person['img'],
							"description" => $person['description']
						);
		print_r(json_encode($reponse));
	} else {
		
	}

	if( $_GET['type'] == "news"){
		
	} else {
		
	}

	if( $_GET['type'] == "classement"){
		$monfichier = 'scores.json';

		$data = json_decode(file_get_contents($monfichier));
		for($i = count((array)$data) - 1; $i >= 0; $i--) {
			for($j = 1; $j <= $i; $j++) {
				if( ($data->{$j + 1}[0]->true / $data->{$j + 1}[0]->affirmations) > ($data->{$j}[0]->true / $data->{$j}[0]->affirmations) ) {
					$t = $data->{$j + 1};
					$data->{$j + 1} = $data->{$j};
					$data->{$j} = $t;
				}
			}
		}

		$reponse = 	array(	"1" => $data->{1}[0],
							"2" => $data->{2}[0],
							"3" => $data->{3}[0],
							"4" => $data->{4}[0],
							"5" => $data->{5}[0]
						);
		print_r(json_encode($reponse));
	} else {
		
	}

	if( $_GET['type'] == "sendVote"){
		$monfichier = 'votes.json';

		$data = json_decode(file_get_contents($monfichier));

		if($_GET['vote'] == "true"){
			$data->{$_GET['id']}->true = $data->{$_GET['id']}->true + 1;
		} else {
			$data->{$_GET['id']}->false = $data->{$_GET['id']}->false + 1;
		}

		if($_GET['true'] == "true"){
			$reponse_juste = $data->{$_GET['id']}->true;
			$reponse_fausse = $data->{$_GET['id']}->false;
		} else {
			$reponse_juste = $data->{$_GET['id']}->false;
			$reponse_fausse = $data->{$_GET['id']}->true;
		}

		$perc_juste = $reponse_juste / ($reponse_fausse + $reponse_juste) * 100;

		file_put_contents($monfichier, json_encode($data));

		$reponse = array("juste"=> $perc_juste);
		
		print_r(json_encode($reponse));
	} else {
		
	}

}
?>