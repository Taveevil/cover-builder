<?php 
// ##################################################################### //
// ####################### GET TAG TABLE PROCESS ####################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$all_tags =  mysql_read_all_tags();
include '../template/pagelets/modal-tags.php';


?>