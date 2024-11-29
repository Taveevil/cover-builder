<?php 

// ##################################################################### //
// ######################### NEW BLOCK PROCESS ######################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

// Scrub our data
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

echo mysql_write_new_preset(
    $_SESSION['user_id'],
    $rqst['name'],
    $rqst['template_id'],
    $tags,
    $blocks,
);

?>