$(document).bind('keypress', function(event) {

    if( event.which === 78 && event.shiftKey ) {
        toggleWriter();
    }
});

function toggleWriter(){
    if($('#block-writer').hasClass('active')){
        $('#block-writer').removeClass('active');
    }else{
        $('#block-writer').addClass('active');
    }
}

$('#block-writer form').on('submit',function(){
    const clean = DOMPurify.sanitize($('.ql-editor').html());
    $('#block_copy').val(clean);
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

let cl_col = $('.cl_content').sortable({
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
            $(copy).html($(copy).text());
        });


        if (isOverflown(cl_content)) {
                $(ui.sender).sortable('cancel');
                alert('Not enough space on the page!')
        } else {
            // your element doesn't have overflow
        }
    },

});

let block_col = $('#blocks').sortable({
    connectWith: ".cl_content",
    items: "> .block",
    placeholder: "sortable-placeholder",
    helper:'clone',
    handle: '.handle',
});

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

$('form#cl_var').on('input',function(e){
    let target = $(e.target).get(0);
    let id = $(target).attr('id');


    $('.'+id).html($(target).val());


})