<?php

// ##################################################################### //
// ######################### UPDATE TAG PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$rqst = rqst($_POST);

if(isset($rqst['tags'])){
    $tags = implode(',',$rqst['tags']);
}else{
    $tags = '';
}

if(isset($rqst['blocks'])){
    $blocks = implode(',',$rqst['blocks']);
}else{
    $blocks = '';
}

echo mysql_update_preset(
    $rqst['id'],
    $rqst['name'],
    $rqst['template_id'],
    $tags,
    $blocks
);

?>