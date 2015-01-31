<?php
// -------------------------------------------
// --- wish point Connection Include Script.
// --- By: Christopher Bartlett
// --- Email: christopher@seedtech.io
// --- Type: Procedual
// --- Returns: Variables
// --- Description: 
// --- * Build Connections global variables
// --- * Build Connection Object
// --- * Check Connection
// -------------------------------------------

// -------------------------------------------
// --- Build Connections global variables
// -------------------------------------------  
 
		//error_reporting(E_ERROR);
		$host = "localhost";
		$user = "wishpoint";
		$password = "7J8Ky654L0mF345";

// -------------------------------------------
// --- Build Connection Object
// -------------------------------------------  
 
		$connection = mysql_connect($host, $user, $password);

// -------------------------------------------
// --- Check Connection
// -------------------------------------------  
 
?>