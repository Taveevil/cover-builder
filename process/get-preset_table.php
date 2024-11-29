<?php 
// ##################################################################### //
// ####################### GET TAG TABLE PROCESS ####################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$presets =  mysql_read_all_presets_by_id($_SESSION['user_id']);
include '../template/pagelets/modal-presets.php';


?>