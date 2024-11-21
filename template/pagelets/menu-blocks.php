<?php 
$block_arr = mysql_read_blocks_list();
?>


<aside id="blocks">
    <?php 
        foreach ($block_arr as $block){
            include 'block.php';
        }
    ?>
</aside>