<?php 


    if(isset($rqst)){
        $preset = mysql_read_preset_by_id($rqst['id']);
    }
    
    $id = $preset->preset_id;
    $name = $preset->name;
    $tags = explode(',',$preset->tags);
    $blocks = explode(',',$preset->blocks);

?>


<tr class="row row__preset">
        <td class="row__id">
            <?php echo $preset->preset_id; ?>
        </td>
        <td class="row__name">
            <input readonly="" class="row__name-input" type="text" value="<?php echo $name; ?>">
            <div class="input_container">
                <button class="btn row__save"><i class="ph ph-check-fat"></i></button>
                <button class="btn row__reset"><i class="ph ph-x"></i></button>
            </div>
        </td>
        <td class="row__template_id">
            <?php echo $preset->template_id; ?>
        </td>
        <td class="row__blocks">
            <ul>
                <?php foreach($blocks as $block): ?>
                    <li><?php echo $block?></li>
                <?php endforeach; ?>
            </ul>
        </td>
        <td class="row__tags">
            <ul>
                <?php foreach($tags as $tag): ?>
                    <li><?php echo $tag ?></li>
                <?php endforeach; ?>
            </ul>
        </td>
        <td class="actions">
            <button class="btn row__edit"><i class="ph ph-pen"></i></button>
            <button class="btn row__delete"><i class="ph ph-trash"></i></button>
            <button class="btn row__apply"><i class="ph ph-hand-pointing"></i></button>
        </td>
</tr>