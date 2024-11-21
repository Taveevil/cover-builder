<?php 

    if($block->tags){
        $block_tags = explode(',',$block->tags);
    }

?>
<div class="block" draggable id="<?php echo $block->block_id;?>">
    <div class="block__content">
        <h4 class="block__name">
        <?php echo $block->name ?>
        </h4>
        <ul class="block__tags">
            <?php 
            if(isset($block_tags)):
            foreach($block_tags as $tag_id):
                $tag = mysql_read_tag_xid($tag_id);
            ?>
                <li><?php echo $tag->name;?></li>
            <?php endforeach; endif; ?>
        </ul>
        <div class="block__copy" readonly contenteditable="true">
                <?php echo $block->copy ?>
            </div>
    </div>
</div>