<?php

// Include our libraries
include '../libraries/config.php';
include '../libraries/functions.php';
include '../libraries/read.php';
include '../libraries/write.php';


// Clean data passed from form POST
$rqst = rqst($_POST);


// Empty the session and destroy it
$_SESSION = NULL;

session_destroy();


// User was logged out
// Kick to index langing page
header('Location: '.$site['url'].'/?logout=success');
die();

?>