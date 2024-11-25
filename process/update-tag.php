<?php

// ##################################################################### //
// ######################### UPDATE TAG PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$rqst = rqst($_POST);

echo mysql_update_tag(
    $rqst['tag_id'],
    $rqst['name']
);

?>