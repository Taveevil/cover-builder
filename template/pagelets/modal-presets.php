<?php 
    if(!isset($presets)){
        $presets =  mysql_read_all_presets();
    }

?>

<div class="modal" id="presets">
    <div class="content">
        <header> 
            <h3>Preset Manager</h3>
            <h4 class="selected">( Selected: <span class="preset__name"></span> )</h4>
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
                        include 'table_row-presets.php';   
                    }?>
                </tbody>
        </table>
    </div>
    <div class="controls">
        <label for="preset_name-input">
            <p>Preset Name: </p>
            <input type="text" id="preset_name-input" name="preset_name-input">
        </label>
        <div class="input_container">
            <button class="btn btn__preset_save" id="">Save as new preset <i class="ph ph-floppy-disk"></i></button>
            <button class="btn btn__preset_update">Update preset <i class="ph ph-arrow-circle-right"></i></button>
        </div>
    </div>
</div>