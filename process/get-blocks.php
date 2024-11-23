<?php 
// ##################################################################### //
// ######################### GET BLOCKS PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$blocks = mysql_read_blocks_list();

foreach($blocks as $block){
    include '../template/pagelets/block.php';
}

?>