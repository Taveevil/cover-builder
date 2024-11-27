
$(document).on('DOMContentLoaded',function(){
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

            $('.cl_content .block').each(function(){
                let copy = $(this).find('.block__copy').get(0);
                $(copy).html(decodeHtml($(copy).html()));
            });


            if (isOverflown(cl_content)) {
                    $(ui.sender).sortable('cancel');
                    alert('Not enough space on the page!')
            } else {
                // your element doesn't have overflow
            }
            
            sessionStorage.setItem('cl_content',$('.cl_content').html());
        },
    };

    $('.cl_content').sortable(cl_col_init);

});

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

        if($('#block_writer').hasClass('active')){
            toggleWriter(false);
        }
        else if($('#tag_table').hasClass('active')){
            toggleTagtable(false);
        }
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
    // we get the existing modal
    let modal = $('.modal');

    // we check if this is an edit or not 
    const edit = $(this).hasClass('btn--edit');
    let block;

    // if it is we set the block variable to our block parent
    if(edit){
        block = $(this).closest('.block');
    }

    // if a modal already exists do the following
    if(modal.length){
        // if it's active
        if($(modal).hasClass('active')){
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
                    method:'GET',
                    dataType:'html',
                    url:'template/pagelets/modal-block_writer.php'
                })
                .done(function(html){
                    $('body').prepend(html);
                    initWriter();
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


                    // if edit returns as true
                    // we copy all the data from the selected bot
                    // and append the data to it's appropriate fields
                    if(edit){
                        let id = $(block).attr('data-block');
                        let copy = $(block).find('.block__copy').html();
                        let name = $(block).find('.block__name').html();
                        let tags = $(block).find('.block__tags li').toArray().map(li => li.innerHTML);
                        
                        for(let i = 0; i < tags.length; i++){
                            writerCreateTag(tags[i].trim());
                        }
                        
                        $('#block_writer #block_id').val(id);
                        $('#block_writer #block_name').val(name.trim());
                        $('#block_writer .block_editor .ql-editor').html(copy.trim());
                        $('.btn#update_block').addClass('active');
                    }

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
                });  
            break;
            default:
                // Do something if anything before this is not true
            break;
        }
    }

});

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
    });
});



$('.btn--delete').on('click',function(){
    // get the parent container
    let block = $(this).closest('.block');
    let id = $(block).attr('data-block');

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
$('#writerCreateTag').on('click',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    writerCreateTag(tag_name);
});

$('.tag_input').on('keyup',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    if(e.which === 13){
        writerCreateTag(tag_name)
    }
});




// Whenever the delete button on a row is clicked
$('body').on('click','#tag_table .tag_row__delete',function(){
    // We get the parent row
    let tag_row = $(this).closest('.tag_row');

    // and the id
    let tag_id = $('.tag_row__id',tag_row).html();
    let tag_name = $('.tag_row__name-input',tag_row).val();

    // if the user confirms that they want to delete
    if(window.confirm('Are you sure you want to delete '+tag_name+'?')){
        // we send that id to our delete-tag.php process
        $.ajax({
            method: 'POST',
            url: 'process/delete-tag.php',
            data: {tag_id:tag_id},
        })
        .fail(function(response){
            alert('Oops! something went wrong')
            console.log(response);
        })
        .done(function(response){
            // if successful alert us that the tag has been deleted
            alert(tag_name + ' has been deleted');
            // and remove it from the table
            $(tag_row).remove();
        });
    }
});

$('body').on('click','#tag_table .tag_row__edit',function(){
    // After pressing the tag button we grab the parent container
    let tag_row = $(this).closest('.tag_row');
    // We save the current name in a cache just in case we change our mind
    let name_cache = $('td.tag_name input').val();

    // We disable the edit button since we're actively editing our element
    $(this).prop('disabled',true);

    // and we shift the focus to our input for our tag's name
    $('.tag_row__name-input',tag_row).trigger('focus');
    $('.tag_row__name-input',tag_row).prop('readonly',false);

    // and reveal the controls that decide whether or not we want to save or revert our changes
    $('.controls',tag_row).addClass('active');

    // This nested function will do the following once called:
    function done(bool){
        // Remove the focus from the input element
        $('.tag_row__name input',tag_row).blur();
        // Hide our controls
        $('.controls',tag_row).removeClass('active');
        // re-enable our edit button for this row
        $('.tag_row__edit',tag_row).prop('disabled',false);
        // and make the input that holds our tag name readonly so we don't change it by mistake
        $('.tag_row__name-input',tag_row).prop('readonly',true);

        // if we pass false into the function
        if(!bool){
            // then revert the name of the tag bag to it's old one
            $('td.tag_row__name-input',tag_row).val(name_cache);
        }

    };


    //If enter or the save tag button are pressed, Then we call out ajaxUpdateTag functino
    // to save our tag in our database
    // and once that's done we call our nested 'done()' function to clear classes
    $('.tag_row__name-input',tag_row).on('keyup',function(e){
        if(e.which === 13){
            e.preventDefault();

            if(ajaxUpdateTag(tag_row)){
                done();
            }
        }
    });

    $('.tag_row__save',tag_row).on('click',function(){
        if(ajaxUpdateTag(tag_row)){
            done();
        }
    });

    // Otherwise we just reset our tagrow back to normal
    $('.tag_row__reset',tag_row).on('click',function(){
        done(false);
    });

});

// This function uses ajax to update a tag if changed
function ajaxUpdateTag(tag){
    // first we find our tag's id and name
    let tag_id = $('.tag_id',tag).html();
    let tag_name = $('.tag_name_input',tag).val();

    // Then we send a POST request to our update-tag.php process
    $.ajax({
        method: 'POST',
        url: 'process/update-tag.php',
        data: {
            tag_id: tag_id,
            name : tag_name
        },
    }).fail(function(response){
        alert('Oops! something went wrong')
        console.log(response);
    })
    .done(function(response){
        // if successful then we alert the user that the task has been completed
        // and return true so that we can move on to the next step
        alert($('.tag_name',tag).val() + ' has been updated');
        return true;
    });
}

function toggleTagtable(bool){
    if($('#tag_table').hasClass('active') || bool == false){
        $('#tag_table').removeClass('active');
    }else{
        $('#tag_table').addClass('active');
    }
}

$('.tag_maker__input').on('keyup',function(e){
    if(e.which === 13){
        let name = $(this).val();
        AJAXCreateTag(name);
    }
});

$('.tag_maker__create').on('click',function(){
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
// =================== MISC FUNCTIONS =================== //
// ====================================================== //

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