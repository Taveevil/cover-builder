<?php 
    $block_arr = mysql_read_blocks_list_by_id($_SESSION['user_id']);
    $db_tags = mysql_read_all_tags();
    $user_tags = [];

    foreach ($block_arr as $value) {
        $tags = explode(',',$value->tags);
        $user_tags = array_unique(array_merge($user_tags,$tags));
    }
?>


<aside id="blocks_menu">
    <section class="filter">
        <ul class="filter__container">
        <?php foreach($user_tags as $tag):?>
            <li class="filter__tag" id="">
                <?php echo trim($tag); ?>
            </li>
        <?php endforeach; ?>
        </ul>
    </section>
    <section id="blocks">
        <?php 
        foreach ($block_arr as $block){
            include 'block.php';
        }
        ?>
    </section>
</aside>