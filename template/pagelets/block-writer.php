
    <div id="block-writer">
        <form action="process/new-block.php" method="post">
            <label for="block_name">
                <h4>Name</h4>
                <input name="block_name" id="block_id" type="text">
            </label>
            <label for="block_copy">
                <h4>What do you want to say?</h4>
                <textarea name="block_copy" id="block_copy" hidden></textarea>
                <div class="block_editor"></div>
            </label>
            
            <div class="tags">
                <input id="block_tags" name="block_tags" type="text" value="1,2,3">
                <div class="tag_container">
                    <label for="tag_input">
                        <h4>Tags</h4>
                        <input id="tag_input" name="tag_input" type="text">
                    </label>
                </div>
            </div>

            <input type="submit">
        </form>
    </div>
