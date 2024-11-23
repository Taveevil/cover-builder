<?php

// ##################################################################### //
// ########################## GET TAGS PROCESS ######################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$tags = mysql_read_all_tags();
$list = [];
foreach($tags as $tag){
    array_push($list,$tag->name);
}

echo json_encode($list);


?>