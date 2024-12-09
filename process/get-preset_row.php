<?php 
// ##################################################################### //
// ######################## GET TAG ROW PROCESS ######################## //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);
$preset = mysql_read_preset_by_id($rqst['id']);

include '../template/pagelets/table_row-presets.php';

?>