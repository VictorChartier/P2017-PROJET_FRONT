<?php
header('Content-Type: application/json');

if(isset($_GET['action'])){

	if( $_GET['action'] == "newSession"){
		$monfichier = $_GET['idSession'].'.json';

		$data = (object)array("exchanges" => array(array(
				"type" => "start",
	            "from" => "desktop",
	            "to" => "mobile")
		));
		file_put_contents($monfichier, json_encode($data));

		print_r(json_encode(array("ok" => "ok")));

	} else if( $_GET['action'] == "sendQuote"){
		$monfichier = $_GET['idSession'].'.json';

		$data = json_decode(file_get_contents($monfichier));
		array_push($data->exchanges, array(
				"type" => "sendQuote",
	            "from" => "desktop",
	            "to" => "mobile",
	            "timer" => $_GET['timer'],
	            "param1" => $_GET['param1'],
	            "param2" => $_GET['param2'],
	            "param3" => $_GET['param3'],
	            "value" => $_GET['value']
            ));
		file_put_contents($monfichier, json_encode($data));

		print_r(json_encode(array("ok" => "ok")));

	} else if( $_GET['action'] == "sendVote"){
		$monfichier = $_GET['idSession'].'.json';

		$data = json_decode(file_get_contents($monfichier));
		array_push($data->exchanges, array(
				"type" => "sendVote",
	            "from" => "mobile",
	            "to" => "desktop",
	            "param1" => $_GET['param1'],
	            "value" => $_GET['value']
            ));
		file_put_contents($monfichier, json_encode($data));

		print_r(json_encode(array("ok" => "ok")));
	} else {
		
	}

}



?>