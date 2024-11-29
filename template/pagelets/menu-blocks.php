<?php 
    $block_arr = mysql_read_blocks_list_by_id($_SESSION['user_id']);
?>


<aside id="blocks">
    <?php 
        foreach ($block_arr as $block){
            include 'block.php';
        }
    ?>
</aside>