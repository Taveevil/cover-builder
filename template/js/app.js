
$(document).on('DOMContentLoaded',function(){
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
    });
    
    resizeCover();
    $('.cl_content').sortable(cl_col_init);

    let block_col = $('#blocks').sortable({
        connectWith: ".cl_content",
        items: "> .block",
        placeholder: "sortable-placeholder",
        helper:'clone',
        handle: '.handle',
    });
    
    let tag_list;
    let get_tags = $.ajax({
        method:"GET",
        url:"process/get-tags.php",
        dataType:"json",
        async:false
    }).done(function(response){
        tag_list = response;
    });


    let tag_auto = $('#tag_input').autocomplete({
        source: tag_list,
        appendTo: '.tag_auto',
        autoFocus: true,
        position: { my : "left top", at: "right top" },
        select:function(event, ui){
            validateTags(ui.item.value);
        },
    });

    initEditButton();
    initEditTagButtons();
    
});

function validateTags(tag){
    let tags_arr = $('.tag_container .tag').toArray().map(tag => tag.innerHTML);
    let contains_tag = (tags_arr.indexOf(tag) > -1);

    if(!contains_tag){
        create_tag(tag);
    }
}


function create_tag(tag){
    $('.tag_container').append(
        `
        <div class="tag_content">
        <span class="tag">`+
        tag
        +`</span>
        <button type="button" class="tag_btn btn">
            <i class="ph ph-x"></i>
        </button>
        </div>`
    )

    $('.tag_btn').on('click',function(){
        // console.log($(this).parent('.tag_content'))
        $(this).parent('.tag_content').remove();
    });
}


$(window).on('resize',function(){
    resizeCover();
});

function resizeCover(){
    let cl = $('#cover_letter');
    let container = $('.cover_letter_container');

    let width = $(container).width();
    let max_width = 816;
    let mult = width < max_width ? (width/max_width) * 100 : 100;

    $(cl).css('transform','scale('+mult+'%)');
}

$(document).on('keyup', function(event) {
    
    if( event.key === 'Escape'){

        if($('#block-writer').hasClass('active')){
            toggleWriter(false);
        }
        else if($('#tag_table').hasClass('active')){
            toggleTagtable(false);
        }
    }
});

function toggleWriter(bool){
        if($('#block-writer').hasClass('active') || bool == false){
            $('#block-writer').removeClass('active');

            if(!$('#block-writer #update_block').hasClass('active')){
                // sessionStorage.setItem('write_cache',$('#block-writer').html());
            }
            
            setTimeout(() => {
                $('#block-writer .tag_container').html('');
                $('#block-writer #tag_input').val('');
                $('#block-writer .block_editor .ql-editor').html('');
                $('#block-writer #block_name').val('');
                $('.btn#update_block').removeClass('active');
            }, 200);
        }else{

            if(!$('#block-writer #update_block').hasClass('active')){
                // $('#block-writer').html(sessionStorage.getItem('write_cache'));
            }

            $('#block-writer').addClass('active');
        }
}


$('#block-writer form').on('submit',function(e){
    const clean = DOMPurify.sanitize($('.ql-editor').html());
    $('#block_copy').val(clean);

    const tags = $('.tag_content .tag').toArray().map(t => t.innerHTML);
    $('#block_tags').val(tags.join(', '));

});




const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


const quill = new Quill('.block_editor', {
    modules: {
        toolbar: toolbarOptions
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
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

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

$('form#cl_var').on('input',function(e){
    let target = $(e.target).get(0);
    let id = $(target).attr('id');
    $('.'+id).html($(target).val());
})

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

$('.writer_toggle').on('click',(e)=>{
    e.preventDefault();
    toggleWriter();
});

$('#clear').on('click',function(){
    $.ajax({
        method: 'GET',
        url:'process/get-blocks.php',
        dataType:'html',
    }).done(function(response){
        $('#blocks').html(response);
        initEditButton();
    });
    $('.cl_content').html('');
    sessionStorage.clear();
});

$('.btn.delete').on('click',function(){
    let block = $(this).closest('.block');
    let id = $(block).attr('data-block');

    $.ajax({
        url:'process/delete-block.php',
        method:"POST",
        data:{
            block_id : id
        },
    }).done(function(response){
        $(block).remove();
    }).fail(function(response){
        console.log(response);
        alert('oops! Something went wrong');
    });
});


function initEditButton(){
    $('.btn.edit').on('click',function(){
        let block = $(this).closest('.block');
        let id = $(block).attr('data-block');
    
        let copy = $(block).find('.block__copy').html();
        let name = $(block).find('.block__name').html();
        let tags = $(block).find('.block__tags li').toArray().map(li => li.innerHTML);
        
        for(let i = 0; i < tags.length; i++){
            create_tag(tags[i].trim());
        }
        
        $('#block-writer #block_id').val(id);
        $('#block-writer #block_name').val(name.trim());
        $('#block-writer .block_editor .ql-editor').html(copy.trim());
        $('.btn#update_block').addClass('active');
    
        toggleWriter(true);
    });
}


$('#block-writer .submit_container .btn').on('click',function(e){

    let id = $(this).attr('id');
    if(id == 'create_block'){
        $('#writer').attr('action','process/new-block.php');
    }else if(id == 'update_block') {
        $('#writer').attr('action','process/update-block.php');
    }
    $('#block-writer form').trigger('submit');

});

$('#create_tag').on('click',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    create_tag(tag_name);
});

$('#tag_input').on('keyup',function(e){
    e.preventDefault();
    let tag_name =  $('#tag_input').val();
    if(e.which === 13){
        create_tag(tag_name)
    }
});


$('.tag_manager_toggle').on('click',function(){
    toggleTagtable();
});

$('.manage_tags').on('click',function(){
    toggleTagtable();
});

$('.btn__delete_tag').on('click',function(){
    let tag = $(this).closest('.tag_row');
    let tag_id = $(tag).find('.tag_id').html();


    $.ajax({
        method: 'POST',
        url: 'process/delete-tag.php',
        data: {tag_id:tag_id},
    })
    .done(function(response){
        console.log(response);
        alert($(tag).find('.tag_name').val() + ' has been deleted');
        $(tag).remove();
    });
});

function initEditTagButtons(){
    $('.btn__edit_tag').on('click',function(){
        let tag_row = $(this).closest('.tag_row');
        let name_cache = $('td.tag_name input').val();
        $(this).prop('disabled',true);
        $('td.tag_name input',tag_row).trigger('focus');
        $('td.tag_name input',tag_row).prop('readonly',false);
        $('.controls',tag_row).addClass('active');

        $('.tag_name_input',tag_row).on('keyup',function(e){
            if(e.which === 13){
                e.preventDefault();

                if(updateTag(tag_row)){
                    $(this).prop('disabled',false);
                    $('td.tag_name input',tag_row).prop('readonly',true);
                }

                $('td.tag_name input',tag_row).blur();
                $('.controls',tag_row).removeClass('active');
                $('.btn__edit_tag',tag_row).prop('disabled',false);
                $('td.tag_name input',tag_row).prop('readonly',true);
            }
        });

        $('.save_tag',tag_row).on('click',function(){
            if(updateTag(tag_row)){
                $(this).prop('disabled',false);
                $('td.tag_name input',tag_row).prop('readonly',true);
            }
            $('td.tag_name input',tag_row).blur();
            $('.controls',tag_row).removeClass('active');
            $('.btn__edit_tag',tag_row).prop('disabled',false);
            $('td.tag_name input',tag_row).prop('readonly',true);
        });

        $('.reset_tag',tag_row).on('click',function(){
            $('td.tag_name input',tag_row).blur();
            $('.controls',tag_row).removeClass('active');
            $('.btn__edit_tag',tag_row).prop('disabled',false);
            $('td.tag_name input',tag_row).val(name_cache);
            $('td.tag_name input',tag_row).prop('readonly',true);
        });

    });
}

function updateTag(tag){
    let tag_id = $('.tag_id',tag).html();
    let tag_name = $('.tag_name_input',tag).val();

    $.ajax({
        method: 'POST',
        url: 'process/update-tag.php',
        data: {
            tag_id: tag_id,
            name : tag_name
        },
    })
    .done(function(response){
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

$('#tag_maker').on('keyup',function(e){
    if(e.which === 13){
        let name = $('#tag_maker').val();
        AJAXCreateTag(name);
    }
});

$('.make_tag').on('click',function(){
    let name = $('#tag_maker').val();
    AJAXCreateTag(name);
});

function AJAXCreateTag(tag){

    $.ajax({
        method: 'POST',
        url: 'process/new-tag.php',
        data: {
            name : tag
        },
    })
    .done(function(response){
        alert(tag + ' has been created');

        let tag_row = 
        `
        <tr class="tag_row">
            <td class="tag_id">`+response+`</td>
            <td class="tag_name">
                <input readonly="" class="tag_name_input" type="text" value="`+tag+`">
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
        `

        $('tbody').append(tag_row);
        initEditTagButtons();
    });


    

    initEditTagButtons();

}