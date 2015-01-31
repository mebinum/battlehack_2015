<?php
// -------------------------------------------
// --- Wish Point Function Include Script.
// --- By: Christopher Bartlett
// --- Email: christopher@seedtech.io
// --- Type: Procedual
// --- Returns: Gloabl Functions
// --- Description: 
// --- * JSON_CLEAN_DECODE Fucntion
// --- * DISTANCE function
// --- * POST CLEAN FUNCTION
// -------------------------------------------

// -------------------------------------------
// --- JSON_CLEAN_DECODE Fucntion
// -------------------------------------------  
 
function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) {
    // search and remove comments like /* */ and //
    $json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);
    
    if(version_compare(phpversion(), '5.4.0', '>=')) {
        $json = json_decode($json, $assoc, $depth, $options);
    }
    elseif(version_compare(phpversion(), '5.3.0', '>=')) {
        $json = json_decode($json, $assoc, $depth);
    }
    else {
        $json = json_decode($json, $assoc);
    }

    return $json;
}

// -------------------------------------------
// --- DISTANCE FUNCTION
// -------------------------------------------  
 
function distance($lat1, $lon1, $lat2, $lon2, $unit) {

  $theta = $lon1 - $lon2;

  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));

  $dist = acos($dist);

  $dist = rad2deg($dist);

  $miles = $dist * 60 * 1.1515;

  $unit = strtoupper($unit);

    if ($unit == "K") {

        return ($miles * 1.609344);

    } else if ($unit == "N") {

      return ($miles * 0.8684);

    } else {

        return $miles;

     }
}

// -------------------------------------------
// --- POST CLEAN function
// -------------------------------------------  

function postClean($str){


$str = mb_convert_encoding($str, 'UTF-8', 'UTF-8');
$str = htmlentities($str, ENT_QUOTES, 'UTF-8');

return $str;
}

function isCorsAllowed()
{
  $allowedUrls = array('http://0.0.0.0:9000','http://0.0.0.0');

  if($_SERVER['REQUEST_METHOD'] == 'OPTIONS' || $_SERVER['REQUEST_METHOD'] == 'POST' ) {

    $index = array_search($_SERVER['HTTP_ORIGIN'], $allowedUrls);
    if($index) {
      $url = $_SERVER['HTTP_ORIGIN'][$index];
      header('Access-Control-Allow-Origin: $url');
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type, Accept');
      header('Access-Control-Max-Age: 10');
      header('Content-Length: 0');
      header('Content-Type: text/plain');
      return true;
    } else {
      return false;
    }
  
  return true;
}


}

function notAllowed()
{
    header('HTTP/1.1 403 Access Forbidden');
    header('Content-Type: application/json');
    // -------------------------------------------
    // --- Create JSONP response
    // -------------------------------------------  
    $jsonObject = array(
      "status" => "false",
      "message" => "You shall not pass!! You don't have access to repeat this request",
    );
    echo $jsonObject;
}

?>