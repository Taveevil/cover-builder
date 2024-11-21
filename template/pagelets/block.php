<?php 

    if($block->tags){
        $block_tags = explode(',',$block->tags);
    }

?>
<div class="block" id="<?php echo $block->block_id;?>">
    <div class="block__info">
        <h4 class="block__name">
        <?php echo $block->name ?>
        </h4>
        <div class="block__controls">
            <span class="handle"><i class="ph ph-arrows-out-cardinal"></i></span>
            <span class="delete"><i class="ph ph-trash"></i></span>
            <span class="edit"><i class="ph ph-pen-nib"></i></span>
        </div>
        <ul class="block__tags">
            <?php 
            if(isset($block_tags)):
            foreach($block_tags as $tag_id):
                $tag = mysql_read_tag_xid($tag_id);
            ?>
                <li><?php echo $tag->name;?></li>
            <?php endforeach; endif; ?>
        </ul>
    </div>


    <div class="block__copy" readonly contenteditable="true">
        <?php echo $block->copy ?>
    </div>
</div>