<?php 
// ##################################################################### //
// ######################### GET BLOCKS PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);

if($rqst['name']){
    include '../template/pagelets/cover_letters/'.$rqst['name'].'/'.$rqst['name'].'.php';
}

?>