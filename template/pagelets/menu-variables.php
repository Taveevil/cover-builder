<?php 
    $templates =array_slice(scandir('template/pagelets/cover_letters'),2);
?>

<aside id="variables">
    <section>
        <div class="input_container">
            <label for="template">Cover Letter Templates</label>
            <select name="template" id="template">
                <?php 
                    foreach($templates as $template):
                ?>
                <option value="<?php echo $template?>"><?php echo str_replace(['.php','_'],' ',$template)?></option>

                <?php endforeach; ?>
            </select>
        </div>
    </section>

    <section id="cl_var">
        <div class="input_container">
            <label for="company_name">Company name</label>
            <input id="company_name" name="company_name" type="text" placeholder="Fake company co">
        </div>

        <div class="input_container">
            <label for="company_address">Company Address</label>
            <input id="company_address" name="company_address" type="text" placeholder="123 Fake St.">
        </div>

        <div class="input_container">
            <label for="manager_name">Hiring manager name</label>
            <input id="manager_name" name="manager_name" type="text" placeholder="John Doe">
        </div>

        <div class="input_container">
            <label for="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="(123)123-1234">
        </div>
        <div class="input_container">
            <label for="email">Email</label>
            <input id="email" name="email" type="text" placeholder="email@email.com">
        </div>
        <div class="input_container">
            <label for="position">Position</label>
            <input id="position" name="position" type="text" placeholder="CEO">
        </div>
    </section>

    <div class="controls">
        <button class="btn btn--modal" data-action="presets">Manage presets<i class="ph ph-paperclip"></i></button>
        <button class="btn btn--modal" data-action="tag_table">Manage tags<i class="ph ph-tag"></i></button>
        <button class="btn btn--modal" data-action="block_writer">Write a new block<i class="ph ph-plus-circle"></i></button>
        <button class="btn btn--clear">Reset Cover Letter<i class="ph ph-backspace"></i></button>
        <div class="save_container input_container">
            <button id="download" class="btn">Download PDF<i class="ph ph-download"></i></button>
            <button class="btn btn--copy"><i class="ph ph-copy"></i></button>
        </div>
    </div>


</aside>