<?php 
// ##################################################################### //
// ######################## GET TAG ROW PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);

include '../template/pagelets/table_row-tags.php';


?>