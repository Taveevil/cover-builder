
<?php

// ##################################################################### //
// ######################## DELETE BLOCK PROCESS ####################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 


$rqst = rqst($_POST);

echo mysql_delete_block($rqst['block_id']);

?>