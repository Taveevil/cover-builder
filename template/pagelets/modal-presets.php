<?php 
    if(!isset($presets)){
        $presets =  mysql_read_all_tags();
    }

?>

<div class="modal" id="presets">
    <div class="content">
        <header> 
            <h3>Preset Manager</h3>
            <button class="btn btn--modal"><i class="ph ph-x"></i></button>
        </header>
        <table>
                <thead>
                    <tr>
                        <th>Preset ID</th>
                        <th>Name</th>
                        <th>Template</th>
                        <th>Blocks</th>
                        <th>tags</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach($presets as $preset){
                    include 'table_row-tags.php';   
                }?>
                </tbody>
        </table>
    </div>
</div>