<?php 
    $all_tags =  mysql_read_all_tags();
?>


<div class="modal" id="tag_table">
    <div class="content">
        <header> 
            <h3>Tag Manager</h3>
            <button class="btn tag_manager_toggle"><i class="ph ph-x"></i></button>
        </header>
        <div class="tag_maker">
            <input type="text" name="tag_maker" id="tag_maker" placeholder="Tag Name">
            <button class="btn make_tag">Create tag <i class="ph ph-plus-circle"></i></button>
        </div>
        <table>
                <thead>
                    <tr>
                        <th>Tag id</th>
                        <th>Tag Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach($all_tags as $tag): ?>
                    <tr class="tag_row">
                        <td class="tag_id"><?php echo $tag->tag_id ?></td>
                        <td class="tag_name">
                            <input readonly="" class="tag_name_input" type="text" value="<?php echo $tag->name ?>">
                            <div class="controls">
                                <button class="btn save_tag"><i class="ph ph-check-fat"></i></button>
                                <button class="btn reset_tag"><i class="ph ph-x"></i></button>
                            </div>
                        </td>
                        <td class="actions">
                            <button class="btn btn__edit_tag"><i class="ph ph-pen"></i></button>
                            <butto class="btn btn__delete_tag"><i class="ph ph-trash"></i></button>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
        </table>
    </div>
</div>