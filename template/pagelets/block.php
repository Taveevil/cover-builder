<?php 
    if($block->tags){
        $block_tags = explode(',',$block->tags);
    }else{
        $block_tags = [];
    }
?>
<div class="block" data-block="<?php echo $block->block_id;?>">
    <div class="block__info">
        <h4 class="block__name">
        <?php echo $block->name ?>
        </h4>
        <div class="block__controls">
            <button class="btn btn--delete"><i class="ph ph-trash"></i></button>
            <button class="btn btn--edit" data-action="block_writer"><i class="ph ph-pen-nib"></i></button>
            <span class="btn handle"><i class="ph ph-arrows-out-cardinal"></i></span>
        </div>
        <ul class="block__tags">
            <?php 
            if(isset($block_tags)):
                foreach($block_tags as $tag):
            ?>
                <li><?php echo trim($tag);?></li>
            <?php endforeach; endif; ?>
        </ul>
    </div>
    <div class="block__copy" readonly>
        <?php echo $block->copy ?>
    </div>
</div>