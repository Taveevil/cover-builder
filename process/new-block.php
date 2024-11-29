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

mysql_write_new_block(
    $_SESSION['user_id'],
    $rqst['block_name'],
    $rqst['block_copy'],
    $rqst['block_tags']
);

$tags = array_map('trim',explode(',',$rqst['block_tags']));
$db_tags = array_column(mysql_read_all_tags(),'name');
$new_tags = array_diff($tags,$db_tags);

foreach($new_tags as $tag){
    mysql_write_new_tag($tag);
}

header('Location: '.$site['url'].'/index.php');
exit();

?>