<?php
// -------------------------------------------
// --- wish point Query Venue Form.
// --- By: Christopher Bartlett
// --- Email: christopher@seedtech.io
// --- Type: Procedual
// --- Returns: jSON
// -------------------------------------------

// -------------------------------------------
// --- include required functions
// -------------------------------------------  

include '../../include/connection.php';
include '../../include/functions.php';
include '../../include/json.php';



$callback = " var callback = function(";//$_GET['callback'];

$origLat = -37.8195570;//floatval($_GET['lat']);
$origLng = 144.9651480;//floatval($_GET['lng']);

// -------------------------------------------
// --- Create a scope of search in the tags table
// --- Increases if less then 5 results are returned.
// -------------------------------------------  


	$latPos = $origLat + 1;
	$latNeg = $origLat - 1;

	$lngPos = $origLng + 1;
	$lngNeg = $origLng - 1;	



	//select venues from tags list
	$select = "SELECT * 
				FROM  `wishpoint`.`wishpoints` 
				WHERE  `lat` > $latNeg 
				AND `lat` < $latPos
				AND  `lng` > $lngNeg 
				AND `lng` < $lngPos";

			//mySQL query
			$selected = mysql_query($select, $connection);
			if(!$selected){
		
				$status = "Failed";
				$message = "Hal9000 Dave the pheets venue tag query query failed. ".mysql_error();
		
			}else{
		
				$status = "Successful";
				$message = "Hal9000: Dave the pheets venue tag query was successful.";

			}


	$status = "true";

	$result = array();
	$result['status'] = $status;

	echo count($selected);

	while($row = mysql_fetch_array($selected)){
		$wishPoint = array();
		$wishPoint['id'] = $row[0];

		$location = array();
			$location['lat'] = $row[1];
			$location['lng'] = $row[2];
			$location ['distance'] = distance($origLat, $origLng, $row[1], $row[2], "K");

		$wishPoint['location'] = $location;

		$wishPoint['beaconId'] = $row[3];
		$wishPoint['name'] = $row[4];
		$wishPoint['raised'] = $row[5];

		$charity = array();

			$charity['id'] = $row[6];
			$charity['name'] = $row[7];
			$charity['email'] = $row[8];

		$wishPoint['charity'] = $charity;

		array_push($result, $wishPoint);
	}


	$jsonArray['result'] = $result;

// -------------------------------------------
// --- Return results as JSONP
// -------------------------------------------  

		echo $callback."(";
			echo json_encode($jsonArray);
		echo ")";


?>
