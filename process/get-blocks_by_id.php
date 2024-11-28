<?php 
// ##################################################################### //
// ###################### GET BLOCKS BY ID PROCESS ##################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);

$blocks_arr = $rqst['blocks'];

foreach($blocks_arr as $block_id){
    $block = mysql_read_block_by_id($block_id);
    include '../template/pagelets/block.php';
}

?>