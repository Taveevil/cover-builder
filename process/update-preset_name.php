<?php

// ##################################################################### //
// ######################### UPDATE TAG PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$rqst = rqst($_POST);

echo mysql_update_preset_name(
    $rqst['id'],
    $rqst['name']
);

?>