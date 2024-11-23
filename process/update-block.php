
<?php 

// ##################################################################### //
// ######################### NEW BLOCK PROCESS ######################### //
// ##################################################################### //

include '../libraries/config.php';
include '../libraries/read.php'; 
include '../libraries/write.php'; 
include '../libraries/functions.php'; 

$rqst = rqst($_POST);

mysql_update_block(
    $rqst['block_name'],
    $_POST['block_copy'],
    $rqst['block_tags']
);

// pretty_print($rqst);

header('Location: '.$site['url'].'/index.php');
exit();

?>