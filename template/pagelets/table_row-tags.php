<?php 


    if(isset($rqst)){
        $id  = $rqst['tag_id'];
        $name  = $rqst['name'];
    }else{
        $id = $tag->tag_id;
        $name = $tag->name;
    }
?>


<tr class="tag_row">
    <td class="tag_row__id"><?php echo $id; ?></td>
        <td class="tag_row__name">
            <input readonly="" class="tag_row__name-input" type="text" value="<?php echo $name; ?>">
            <div class="controls">
                <button class="btn tag_row__save"><i class="ph ph-check-fat"></i></button>
                <button class="btn tag_row__reset"><i class="ph ph-x"></i></button>
            </div>
        </td>
        <td class="actions">
            <button class="btn tag_row__edit"><i class="ph ph-pen"></i></button>
            <butto class="btn tag_row__delete"><i class="ph ph-trash"></i></button>
        </td>
</tr>