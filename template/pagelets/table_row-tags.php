<?php 


    if(isset($rqst)){
        $id  = $rqst['tag_id'];
        $name  = $rqst['name'];
    }else{
        $id = $tag->tag_id;
        $name = $tag->name;
    }
?>


<tr class="row row__tag">
    <td class="row__id"><?php echo $id; ?></td>
        <td class="row__name">
            <input readonly="" class="row__name-input" type="text" value="<?php echo $name; ?>">
            <div class="input_container">
                <button class="btn row__save"><i class="ph ph-check-fat"></i></button>
                <button class="btn row__reset"><i class="ph ph-x"></i></button>
            </div>
        </td>
        <td class="actions">
            <button class="btn row__edit"><i class="ph ph-pen"></i></button>
            <butto class="btn row__delete"><i class="ph ph-trash"></i></button>
        </td>
</tr>