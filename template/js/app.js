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



const quill = new Quill('.block_editor', {
    theme: 'snow'
});

let cl_col = $('.cl_content').sortable({
    connectWith: "#blocks",
    revert:"true",
    over:function(event,ui){
        let content = $(ui.item).find('.block__copy')[0];
        $('.cl_content .ui-sortable-placeholder').html($(content).html());

    },
    receive: function(event,ui){
        let cl_content = $('.cl_content').get(0);

        
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
});

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

$('form#cl_var').on('input',function(e){
    let target = $(e.target).get(0);
    let id = $(target).attr('id');


    $('.'+id).html($(target).val());


})