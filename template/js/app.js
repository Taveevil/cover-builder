
$(document).on('DOMContentLoaded',function(){
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
        select:function(event, ui){
            let tags_arr = Array.from($('.tag_container .tag'));
            let contains_tag = (tags_arr.indexOf(ui.item.value) > -1);

            if(!contains_tag){
                $('.tag_container').append(
                    `
                    <div class="tag_content">
                    <span class="tag">`+
                    ui.item.value
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
        },
    });
    
});



$(window).on('resize',function(){
    let cl = $('#cover_letter');
    let container = $('.cover_letter_container');

    let width = $(container).width();
    let max_width = 816;
    let mult = width < max_width ? (width/max_width) * 100 : 100;

    $(cl).css('transform','scale('+mult+'%)');
});

$(document).bind('keypress', function(event) {

    if( event.which === 27 && event.shiftKey ) {
        toggleWriter();
    }
    if( event.which === 8){
        sessionStorage.clear();
    }
});

function toggleWriter(bool){
    if(typeof bool !== 'undefined'){
        switch(bool){
            case true:
                $('#block-writer').addClass('active');
            break;
            case false:
                $('#block-writer').removeClass('active');
            break;
        }
    }else{
        if($('#block-writer').hasClass('active')){
            $('#block-writer').removeClass('active');
        }else{
            $('#block-writer').addClass('active');
        }
    }
}

$(document).ready(function() {
$(window).keydown(function(event){
    if(event.keyCode == 13) {
    event.preventDefault();
    return false;
    }
});
});

$('#block-writer form').on('submit',function(){
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
            let copy = $(this).find('.block__copy p').get(0);
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

    let rqst = $.ajax({
        method:"GET",
        url:"template/pagelets/templates/"+path,
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
    });
    $('.cl_content').html('');
    sessionStorage.clear();
});
