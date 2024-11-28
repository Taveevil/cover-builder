<?php 
    if(!isset($tags)){
        $all_tags =  mysql_read_all_tags();
    }

?>

<div class="modal" id="tag_table">
    <header> 
        <h3>Tag Manager</h3>
        <button class="btn btn--modal"><i class="ph ph-x"></i></button>
    </header>
    <div class="content">
        <table>
                <thead>
                    <tr>
                        <th>Tag id</th>
                        <th>Tag Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach($all_tags as $tag){
                    include 'table_row-tags.php';   
                }?>
                </tbody>
        </table>
    </div>
    <div class="tag_maker">
            <input type="text" class="tag_maker__input" placeholder="Tag Name">
            <button class="btn tag_maker__create">Create tag <i class="ph ph-plus-circle"></i></button>
    </div>
</div>