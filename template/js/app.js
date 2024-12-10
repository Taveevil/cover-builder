
$(document).on('DOMContentLoaded',function(){
    sessionStorage.clear('preset_cache');
    sessionStorage.clear('preset_bool');
    resizeCover();

    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    

    let block_col = $('#blocks').sortable({
        connectWith: ".cl_content",
        items: "> .block",
        placeholder: "sortable-placeholder",
        helper:'clone',
        handle: '.handle',
        receive:function(event,ui){
            let block = ui.item[0];

        },
    });

    // we initialize our sortable column
    $('.cl_content').sortable(cl_col_init);

});

let cl_col_init = {
    connectWith: "#blocks",
    revert:"true",
    over:function(event,ui){
        let content = $(ui.item).find('.block__copy').get(0);
        $('.cl_content .ui-sortable-placeholder').html($(content).html());

    },
    out:function(event,ui){
        
    },
    receive: function(event,ui){
        let cl_content = $('.cl_content').get(0);

        console.log(cl_content);

        // For our preset function we need to assign a string of our tags seperated by commas
        // Check if the existing content in the cl_content box
        // WITH the placeholder is overflowing
        // if it is then we cancel the request to move the block over
        if (isOverflown(cl_content)) {
                $(ui.sender).sortable('cancel');
                alert('Not enough space on the page!')
        } else {
            // your element doesn't have overflow
        }

        // console.log(getCoverLetterTags());
        
        sessionStorage.setItem('cl_content',$('.cl_content').html());
    },
};

function getCoverLetterTags(){
    // To do that we make an array of the tags attached to the blocks
    let tags = $('.block__tags li','#cover_letter').map(function(i,tag) {
        return $(tag).html();
    }).get();
    
    // and we get the current value of the cover letter tags (if it exists)
    // and make each item seperated by a comma into a key
    let cl_tags = $('#cl_tags').val();
    
    // debugger

    if(cl_tags && tags){
        cl_tags = cl_tags.split(',');
    }else if(tags.length){
        $('#cl_tags').val(tags.toString());
        return tags;
    }else{
        return;
    }

    // once we have those we concatenate them into one array
    const concatArr = cl_tags.concat(tags)
    // and then we filter the concatenated array
    // .filter() spits our a new array based on our callback functino
    // our callback function goes through each item
    // and runs it through another function called IndexOf()
    // which searches the array for the first occurence of our value and returns the key
    // if they idx is the same as the key returned from indexOf() it's included in our resulting array
    const result = concatArr.filter((item, idx) => concatArr.indexOf(item || true) === idx);
    $('#cl_tags').val(result.toString());


    return result;
}


// This function scales our cover letter down or up whenever we resize the window
// this way we keep our aspect ratio
$(window).on('resize',function(){
    resizeCover();
});

function resizeCover(){
    // Get our object and it's container
    let cl = $('#cover_letter');
    let container = $('.cover_letter_container');

    // We get the width of our object
    const width = $(container).width();
    // and the width we want it to be MAX
    const max_width = 816;
    // if our width is smaller than our max width
    // we calculate how much we need to scale the object
    // if not the multiplier returns as 100%
    let mult = width < max_width ? (width/max_width) * 100 : 100;

    // we apply the scale as a CSS transform 
    $(cl).css('transform','scale('+mult+'%)');
}

// Soon to be replaced
$(document).on('keyup', function(event) {
    
    if( event.key === 'Escape'){
        toggleModal();
    }
});

// This function checks if a tag already exists within the block writer's tag container
function validateTags(tag){
    let tags_arr = $('.tag_container .tag').toArray().map(tag => tag.innerHTML);
    let contains_tag = (tags_arr.indexOf(tag) > -1);

    if(!contains_tag){
        writerCreateTag(tag);
    }
}

// This function appends a tag to our tag container in the block writer
function writerCreateTag(tag){
    // append the following html to the tag container of the block writer
    $('#block_writer .tag_container').append(
        `<div class="tag_content">
            <span class="tag">`
                +tag+
            `</span>
            <button type="button" class="tag_btn btn">
                <i class="ph ph-x"></i>
            </button>
        </div>`
    );

    // and give it an event listener that deletes itself when clicked
    $('.tag_btn').on('click',function(){
        $(this).parent('.tag_content').remove();
    });
}

$('body').on('click','.btn--insert',function(e){
    e.preventDefault();
    let action = $(this).attr('data-value');
    let insert  = '<span class="'+action+'">'+ action.replace(/_/g, ' ');

    let string = $('.ql-editor .focus').text();
    let before = string.substring(0, pos);
    let after  = string.substring(pos, string.length);
    $('.ql-editor .focus').text(before + insert +'</span>' + after);
});

function initWriter(){
    new Quill('.block_editor', {
        modules: {
            toolbar: [    
                ['bold', 'italic', 'underline', 'strike'],       
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
            ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
    });

    let tag_list;

    const get_tags = $.ajax({
        method:"GET",
        url:"process/get-tags.php",
        dataType:"json",
        async:false
    }).done(function(response){
        tag_list = response;
    });

    $('#tag_input').autocomplete({
        source: tag_list,
        appendTo: '.tag_auto',
        autoFocus: true,
        position: { my : "left top", at: "right top" },
        select:function(event, ui){
            validateTags(ui.item.value);
        },
    });
}




// Whenever the modal buttons OR edit buttons are clicked do the following
$('body').on('click','.btn--modal, .btn--edit',function(e){
    e.preventDefault();
    // We get the value stored within the button
    let action  = $(this).attr('data-action');
    if(toggleModal(action)){
        // if edit returns as true
        // we copy all the data from the selected bot
        // and append the data to it's appropriate fields

        if($(this).hasClass('btn--edit')){
            // We grab the block this button is connected to
            let block = $(this).closest('.block');
            // and we get the block id and other necessary variables
            let id = $(block).attr('data-block');
            let name = $('.block__name',block).html();
            let tags = $('.block__tags li',block).toArray().map(li => li.innerHTML);
            // We grab the copy attached to block and sanitize it
            let copy = DOMPurify.sanitize($('.block__copy',block).html());

            // we empty the block editor
            $('#block_writer .block_editor .ql-editor').html('');

            // Then we check if the copy we grabbed is just a string (contains no html tags)
            if(typeof copy == 'string'){
                // if so we append that string to the block editor
                $('#block_writer .block_editor .ql-editor').append(copy.trim());
                // Otherwise we check if it does contain any html and if it does;
            }else if($(copy).contents().length > 0){
                // we unwrap each element
                copy = $(copy).contents().unwrap();
                $(copy).each(function(idx,text){
                    // and one by one we check if the element is a span
                    if(text.nodeName == 'SPAN'){
                        // if it is then we turn it into a string so we can see the span tags
                        $('#block_writer .block_editor .ql-editor').append(document.createTextNode(text.outerHTML));
                    }else{
                        // otherwise we append like normal
                        $('#block_writer .block_editor .ql-editor').append(text);
                    }
                    
                });
            }

            // for each tag we create a tag for the ui
            for(let i = 0; i < tags.length; i++){
                writerCreateTag(tags[i].trim());
            }
            
            // and apply all the information to the front end
            $('#block_writer #block_id').val(id);
            $('#block_writer #block_name').val(name.trim());
            $('#block_writer #block_tags').val(tags);
            $('.btn#update_block').addClass('active');
        }
    }

});

function toggleModal(action){
    let bool;
    // we get the existing modal
    let modal = $('.modal');

    // if a modal already exists do the following
    if(modal.length){
        // if it's active
        if($(modal).hasClass('active')){
            
            if($('.modal').attr('id') == 'presets'){
                sessionStorage.setItem('preset_cache',$('.modal').html());
            }
            
            // remove the active class
            $(modal).removeClass('active');
            // and after the animation is done remove the modal from the document
            $(modal).on('transitionend webkitTransitionEnd oTransitionEnd',function(){
                $(modal).remove();
            });
        }else{
            // if the modal exists but not active just remove it
            $(modal).remove();
        }
    }else{
        // we use a switch case to execute specific code
        switch (action) {
            case 'tag_table':
                // Get out writer modal
                $.ajax({
                    method:'GET',
                    dataType:'html',
                    url:'process/get-tag_table.php'
                })
                .done(function(html){
                    $('body').prepend(html);
                    setTimeout(() => {
                        $('.modal').addClass('active');
                    }, 10);
                });  
            break;
            case 'block_writer':
                // Get out writer modal
                $.ajax({
                    async:false,
                    method:'GET',
                    dataType:'html',
                    url:'template/pagelets/modal-block_writer.php'
                })
                .done(function(html){
                    $('body').prepend(html);
                    initWriter();
                    bool = true;
                    $('.modal').addClass('active');

                    // When a block is created
                    $('#block_writer form').on('submit',function(e){
                        // When a block is created we scrub our data using DOMPurify
                        const clean = DOMPurify.sanitize($('.ql-editor').html());
                        $('#block_copy').val(clean);

                        // and we make a string of the tags to add to the database
                        const tags = $('.tag_content .tag').toArray().map(t => t.innerHTML);
                        $('#block_tags').val(tags.join(', '));
                    });
                    
                });  
                
            break;
            case 'presets':
                $.ajax({
                    method:'GET',
                    dataType:'html',
                    url:'process/get-preset_table.php'
                }).done(function(html){
                    $('body').prepend(html);
                    setTimeout(() => {
                        $('.modal').addClass('active');
                    }, 10);

                    if(sessionStorage.getItem('preset_cache')){
                        $('.modal').html(sessionStorage.getItem('preset_cache'));
                    }

                    if(sessionStorage.getItem('preset_bool')){
                        $('.btn__preset_update').addClass('active');
                    }
                });  
            break;
            default:
                if($(modal).hasClass('active')){
                    // remove the active class
                    $(modal).removeClass('active');
                    // and after the animation is done remove the modal from the document
                    $(modal).on('transitionend webkitTransitionEnd oTransitionEnd',function(){
                        $(modal).remove();
                    });
                }
            break;
        }
    }
    return bool;
}


// Whenever the varibles are changed in the form
// also change them everywhere else
$('form#cl_var').on('input',function(e){
    let target = $(e.target).get(0);
    let id = $(target).attr('id');
    $('.'+id).html($(target).val());
});

// When the clear button is pressed do the following:
$('.btn--clear').on('click',function(){
     // We use ajax to get all the blocks stored in our system
    $.ajax({
        method: 'GET',
        url:'process/get-blocks.php',
        dataType:'html',
    }).done(function(response){
        $('#blocks').html(response);
        
    });
    // and clear the current data in the HTML
    $('.cl_content').html('');
    sessionStorage.clear();
});


// ====================================================== //
// ==================== VARIABLE MENU =================== //
// ====================================================== //


$('select#template').on('change',function(){
    let path = $(this).val();

    path = path.replace(/ /g,"_");

    let rqst = $.ajax({
        method:"POST",
        url:"process/get-cover_letter.php",
        data:{
            name: path,
        },
        dataType:"html"
    });

    rqst.done(function(msg){
        $('#cover_letter').html(msg);
        if(sessionStorage.getItem('cl_content')){
            $('.cl_content').html(sessionStorage.getItem('cl_content'));
        }

        $('.cl_content').sortable(cl_col_init);
        $('#cl_tags').val('');
    });
});



$('body').on('click','.btn--delete',function(){
    // get the parent container


    let block = $(this).closest('.block');
    let id = $(block).attr('data-block');

    if(!window.confirm('Are you sure you want to delete '+$('.block__name',block).html().trim()+'?')){
        return;
    }

    // send a POST requst to delete-block.php
    $.ajax({
        url:'process/delete-block.php',
        method:"POST",
        data:{
            block_id : id
        },
    }).done(function(response){
        // if successful remove the block parent
        $(block).remove();
    }).fail(function(response){
        console.log(response);
        alert('oops! Something went wrong');
    });
});


$('body').on('click','#block_writer .submit_container .btn',function(e){

    let id = $(this).attr('id');
    if(id == 'create_block'){
        $('#writer').attr('action','process/new-block.php');
    }else if(id == 'update_block') {
        $('#writer').attr('action','process/update-block.php');
    }
    $('form#writer').trigger('submit');

});


// ====================================================== //
// ==================== TAG FUNCTIONS =================== //
// ====================================================== //
// TAG TABLE HEADER
// On click or on enter send the value of the input 
// to our AJAX and create an element on th tag table
$('body').on('click','#create_tag',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    writerCreateTag(tag_name);
});

$('body').on('keyup','#tag_input',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    if(e.which === 13){
        writerCreateTag(tag_name)
    }
});

// This function uses ajax to update a tag if changed
function ajaxUpdateRow(row){

    let url;
    let bool;
    let item = $(row).closest('.modal');

    switch ($(row).closest('.modal').attr('id')) {
        case 'presets':
            url = 'update-preset_name.php'
        break;
        case 'tag_table':
            url = 'update-tag.php'
        break;
    }



    // first we find our tag's id and name
    let row_id = $('.row__id',item).html();
    let row_name = $('.row__name-input',item).val();


    // Then we send a POST request to our update-tag.php process
    $.ajax({
        method: 'POST',
        url: 'process/'+url,
        data: {
            id: row_id,
            name : row_name
        },
    }).fail(function(response){
        alert('Oops! something went wrong')
        console.log(response);
    })
    .done(function(response){
        // if successful then we alert the user that the task has been completed
        // and return true so that we can move on to the next step
        alert($('.row__name-input',item).val() + ' has been updated');
        bool = true;
    });

    return bool;
}

$('body').on('keyup','.tag_maker__input',function(e){
    if(e.which === 13){
        let name = $(this).val();
        AJAXCreateTag(name);
    }
});

$('body').on('click','.tag_maker__create',function(){
    let name = $(this).siblings('.tag_maker__input').val();
    AJAXCreateTag(name);
});

// This function creates a new table row for our tag database
// and then appends the new element to our table
function AJAXCreateTag(tag){

    // We send a POST request to our new-tag.php
    // and pass our tag param
    $.ajax({
        method: 'POST',
        url: 'process/new-tag.php',
        data: {
            name : tag
        },
    }).fail(function(error){
        // if it fails alert us and send back the error message through the console
        alert('Oops! Something went wrong');
        console.log(error);
    })
    .done(function(id){
        // on success alert us that the tag has been created
        alert(tag + ' has been created');

        // and do another post request to get a new table row
        // we pass the id we get back from our first post request
        // and the name
        $.ajax({
            method: 'POST',
            url: 'process/get-tag_row.php',
            data:{
                tag_id : id,
                name : tag
            }
        }).done(function(html){
            // It will then spit out html of our table row
            $('#tag_table table tbody').append(html);
            // and then we initalize our buttons

        });

    });
}

// ====================================================== //
// ================== PRESET FUNCTIONS ================== //
// ====================================================== //


// Whenever the delete button on a row is clicked
$('body').on('click','.row__delete',function(){
    // We get the parent row
    let row = $(this).closest('.row');
    let id = $('.row__id',row).html();
    let name = $('.row__name-input',row).val();
    let url;
    
    switch ($(row).closest('.modal').attr('id')) {
        case 'presets':
            url = 'delete-preset.php'
        break;
        case 'tag_table':
            url = 'delete-tag.php'
        break;
    }


    // if the user confirms that they want to delete
    if(window.confirm('Are you sure you want to delete '+name+'?')){
        // we send that id to our delete-tag.php process
        $.ajax({
            method: 'POST',
            url: 'process/'+url,
            data: {id:id},
        })
        .fail(function(response){
            alert('Oops! something went wrong')
            console.log(response);
        })
        .done(function(response){
            // remove it from the table
            $(row).remove();

        });
    }

});

$('body').on('click','.row__apply',function(){


    if($('.btn__preset_update')){
        $('.btn__preset_update').addClass('active');
    }

    // If there are any buttons that are currently applied
    // reset them
    $('table .row__detach').addClass('row__apply');
    $('i','table .row__detach').removeClass();
    $('i','table .row__detach').addClass('ph ph-hand-pointing');
    $('table .row__detach').removeClass('row__detach');

    // save our current table in cl_cache, so when we call this window again it saves what we did
    sessionStorage.setItem('cl_cache',$('.cover_letter_container').html());

    // Get our variables
    let row = $(this).closest('.row');
    let path = $('.row__template_id',row).html();
    let blocks =  $('.row__blocks li',row).toArray().map(li => li.innerHTML);
    let name  =$('.row__name-input',row).val();
    let btn = $(this);
    let id =  $('.row__id',row).html().trim();

    // Apply our indicator so we know which template was picked
    $('#cover_letter').attr('data-preset',id)
    $('.selected').addClass('active');
    $('.preset__name').html(name);
    $('#preset_name-input').val(name);
    $(row).addClass('active');

    // remove any excess spaces and make any space between the string into "_"
    path = path.trim().replace(/ /g,"_");

    // Send a post request to get our saved template
    $.ajax({
        method:"POST",
        url:"process/get-cover_letter.php",
        data:{
            name: path,
        },
        dataType:"html"
    }).done(function(msg){
        // get our returned cover letter
        $('#cover_letter').html(msg);
        // re-init the sortable widget within the cover letter
        $('.cl_content').sortable(cl_col_init);
 
        // Once we get our template we can now get the content
        // we send our array of block ids to get-blocks_by_id.php
        $.ajax({
            method:"POST",
            url:"process/get-blocks_by_id.php",
            data:{
                blocks: blocks,
            },
            dataType:"html"
        }).done(function(html){
            // and spit out the html to the .cl_content within the coverletter
            $('.cl_content').html(html);
            // and we convert the apply button to a detach button
            $(btn).removeClass('row__apply');
            $('i',btn).removeClass();
            $('i',btn).addClass('ph ph-x');
            $(btn).addClass('row__detach');
            
            // and set our tags based on the blocks inside
            getCoverLetterTags();
            $('.btn__preset_detach').addClass('active')
        });
    });
});

$('body').on('click','.row__detach',function(){

    if(sessionStorage.getItem('cl_cache')){
        $('.cover_letter_container').html(sessionStorage.getItem('cl_cache'));
    }

    $('.selected').removeClass('active');
    $('.preset__name').html('');
    $('#preset_name-input').val('');

    if($('.btn__preset_update')){
        $('.btn__preset_update').removeClass('active');
    }

    if($('.btn__preset_detach')){
        $('.btn__preset_detach').removeClass('active');
    }

    if($(this).hasClass('btn__preset_detach')){
        $('table .row__detach').addClass('row__apply');
        $('i','table .row__detach').removeClass();
        $('i','table .row__detach').addClass('ph ph-hand-pointing');
        $('table .row__detach').removeClass('row__detach');
        return;
    }



    $(this).removeClass('row__detach');
    $('i',this).removeClass();
    $('i',this).addClass('ph ph-hand-pointing');
    $(this).addClass('row__apply');

});

$('body').on('click','.row__edit',function(){
    // After pressing the tag button we grab the parent container
    let row = $(this).closest('.row');
    // We save the current name in a cache just in case we change our mind
    let name_cache = $('.row__name-input',row).val();

    // We disable the edit button since we're actively editing our element
    $(this).prop('disabled',true);

    // and we shift the focus to our input for our tag's name
    $('.row__name-input',row).trigger('focus');
    $('.row__name-input',row).prop('readonly',false);

    // and reveal the controls that decide whether or not we want to save or revert our changes
    $('.input_container',row).addClass('active');

    // This nested function will do the following once called:
    function done(bool){
        // Remove the focus from the input element
        $('.row__name-input',row).blur();
        // Hide our controls
        $('.input_container',row).removeClass('active');
        // re-enable our edit button for this row
        $('.row__edit',row).prop('disabled',false);
        // and make the input that holds our tag name readonly so we don't change it by mistake
        $('.row__name-input',row).prop('readonly',true);

        // if we pass false into the function
        if(!bool){
            // then revert the name of the tag bag to it's old one
            $('.row__name-input',row).val(name_cache);
        }

    };

    


    //If enter or the save tag button are pressed, Then we call out ajaxUpdateRow functino
    // to save our tag in our database
    // and once that's done we call our nested 'done()' function to clear classes
    $('.row__name-input',row).on('keyup',function(e){
        if(e.which === 13){
            e.preventDefault();
            done(true);
            
        }
    });

    $('.row__save',row).on('click',function(){
        done(true);
        ajaxUpdateRow($(this));
    });

    // Otherwise we just reset our tagrow back to normal
    $('.row__reset',row).on('click',function(){
        done(false);
    });
});

$('body').on('click','.btn__preset_save , .btn__preset_update',function(){
    let name = $('#preset_name-input').val();
    let template_id = $('.cl_template').attr('id');
    let blocks = $('.cl_content .block').map(function(i,block) {
        return $(block).attr('data-block');
    }).get();
    let tags = getCoverLetterTags();
    let preset_id = $('#cover_letter').attr('data-preset');

    if($(this).hasClass('btn__preset_save')){
        $.ajax({
            method:'POST',
            url:'process/new-preset.php',
            data:{
                name: name,
                template_id: template_id,
                blocks: blocks,
                tags: tags
            },
        })
        .fail(function(response){
            alert('Uh oh! Something went wrong');
            console.log(response);
        })
        .done(function(response){

            console.log(response);

            $.ajax({
                    method: 'POST',
                    url:'process/get-preset_row.php',
                    dataType:'html',
                    data:{
                        id: response,
                    }
                }).done(function(html){
                    $('#presets tbody').append(html);
                    console.log(html);
                });   
            });

    }else if($(this).hasClass('btn__preset_update')){
        $.ajax({
            method:'POST',
            url:'process/update-preset.php',
            data:{
                id: preset_id,
                name: name,
                template_id: template_id,
                blocks: blocks,
                tags: tags
            },
        })
        .fail(function(response){
            alert('Uh oh! Something went wrong');
            console.log(response);
        })
        .done(function(response){
            console.log(response);
            let row = $('#presets .row.active');
            $('.row__name-input',row).val($('#preset_name-input').val());
            $('.row__template-id',row).html(template_id);
            $('.row__blocks ul',row).html('');
            blocks.forEach(function(block){
                $('.row__blocks ul',row).append('<li>'+block+'</li>')
            }); 
            $('.row__tags ul',row).html('');
            tags.forEach(function(tag){
                $('.row__tags ul',row).append('<li>'+tag+'</li>')
            }); 

        });
    }
    

});

// ====================================================== //
// =================== MISC FUNCTIONS =================== //
// ====================================================== //

$('#cl_var input').on('input',function(){
    let value  = $(this).val();
    let target = $(this).attr('id');

    $('.'+target).html(value);

});

$('.btn--copy').on('click',function(){
    var $temp = $("<textarea>");
    $("body").append($temp);
    
    var test = "";
    let prev = null;
    $($('.cl_content .block__copy >*')).each(function(index, item){
        if($(item).children('br').is('br') || $(prev).children('br').is('br')){
            test = test;
        }else{
            test = test + "\n";
        }
    
        test = test+ "\n" + $(item).text().trim() ;

        prev = item;
        console.log(item);
    });
    
    // test = test.replace(/<\/?[^>]+(>|$)/g, "");
    console.log(test);
    
    $temp.val(test.trim()).select();
    document.execCommand("copy");
    $temp.remove();
});


// This function decodes html incoming from PHP
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// This function checks if the element passed through is bigger than it's parent
function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

let pos;

$('body').on('keydown keyup mousedown mouseup','.ql-editor',function(e){
    let element = document.getSelection().anchorNode;
    if(!element){
        return;
    }
    
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    pos = caretOffset;

    console.log(pos);
    getSelectionStart();
    
});

function getSelectionStart() {
    var node = document.getSelection().anchorNode;
    $('.focus').removeClass('focus');
    if(node){

        if(node.nodeType == 3){
            $(node.parentNode).addClass('focus');
        } else{
            $(node).addClass('focus');
        }
        
        return (node.nodeType == 3 ? node.parentNode : node);
    }
}

// ##################################################################### //
// ########################## LOGIN PAGE CODE ########################## //
// ##################################################################### //

$('body').on('click','.btn--return',function(e){
    e.preventDefault();
    window.location = '/';
});

// ##################################################################### //
// ######################### TAG FILTERING CODE ######################## //
// ##################################################################### //

$('body').on('click','.filter__tag',function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
    filterCheck();
});

function filterCheck(){
    let filter_tags = $('.filter__tag.active').toArray().map(tag => tag.innerText);
    let blocks = $('#blocks .block');

    $(blocks).each(function(idx,item){
        let tags = $('.block__tags li',item).toArray().map(tag => tag.innerText);
        if(filter_tags.length > 0){
            if(!containsFilter(filter_tags,tags)){
                $(item).addClass('hide');
            }else{
                $(item).removeClass('hide');
            }
        }else{
            $(item).removeClass('hide');
        }
    });
}

function containsFilter(arr1, arr2) {
    // Use the jQuery grep function to filter out values in arr1 that exist in arr2
    var result = $.grep(arr1, function(value) {
        return $.inArray(value, arr2) !== -1;
    });

    // If the result array is not empty, it means at least one element is found in both arrays
    return result.length > 0;
};

$('body').on('keyup','',function(){


    
});