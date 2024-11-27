

<?php 

// ##################################################################### //
// ########################## NEW TAG PROCESS ########################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);

$db_tag = mysql_read_all_tags();
$list = [];

foreach($db_tag as $tag){
    array_push($list,$tag->name);
}

if(!in_array($rqst['name'],$list)){
    echo mysql_write_new_tag(
        $rqst['name']
    );
}

?>