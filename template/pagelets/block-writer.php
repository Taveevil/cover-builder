
    <div class="modal" id="block-writer">
        <div class="content">
            <form id="writer"method="post">
                <header>
                    <input type="text" id="block_id" name="block_id" hidden readonly>
                    <input name="block_name" id="block_name" type="text" placeholder="Untitled">
                    <button class="btn writer_toggle"><i class="ph ph-x"></i></button>
                </header>

                <div class="block_content_container">
                    <div class="block_copy_container">
                        <textarea name="block_copy" id="block_copy" hidden></textarea>
                        <div class="block_editor"></div>
                    </div>
                    
                    <div class="tags">
                        <input id="block_tags" name="block_tags" type="text" hidden>
                        <div class="tag_container"></div>
                        <div class="tag_input-container">
                            <label for="tag_input">Tags: </label>
                            <div class="input_container">
                                <input id="tag_input" name="tag_input" type="text">
                                <button class="btn" id="create_tag"><i class="ph ph-plus-circle"></i></button>
                            </div>
                            <div class="tag_auto"></div>
                        </div>
                    </div>
                    <div class="submit_container">
                        <input id="update_block" class="btn" type="submit" value="Update!">
                        <input id="create_block" class="btn active" type="submit" value="Save as new block">
                    </div>
                </div>
            </form>
        </div>
    </div>
