<?php 


    if(isset($rqst)){
        $id  = $rqst['tag_id'];
        $name  = $rqst['name'];
    }else{
        $id = $tag->tag_id;
        $name = $tag->name;
    }

    $tags = explode(',',$preset->tags);
    $blocks = explode(',',$preset->blocks);

?>


<tr class="preset_row">
        <td class="preset_row__id">
            <?php echo $preset->preset_id; ?>
        </td>
        <td class="preset_row__template_id">
            <?php echo $preset->template_id; ?>
        </td>
        <td class="preset_row__name">
            <input readonly="" class="preset_row__name-input" type="text" value="<?php echo $name; ?>">
            <div class="controls">
                <button class="btn preset_row__save"><i class="ph ph-check-fat"></i></button>
                <button class="btn preset_row__reset"><i class="ph ph-x"></i></button>
            </div>
        </td>
        <td class="preset_row__blocks">
            <ul>
                <?php foreach($blocks as $block): ?>
                    <li><?php echo $block->block_id ?></li>
                <?php endforeach; ?>
            </ul>
        </td>
        <td class="preset_row__tags">
            <ul>
                <?php foreach($tags as $tag): ?>
                    <li><?php $tag->tag_id ?></li>
                <?php endforeach; ?>
            </ul>
        </td>
        <td class="actions">
            <button class="btn preset_row__edit"><i class="ph ph-pen"></i></button>
            <butto class="btn preset_row__delete"><i class="ph ph-trash"></i></button>
        </td>
</tr>