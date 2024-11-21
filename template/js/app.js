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

let block_bool;

// $(document).mousemove(function(event) {
//     if(block_bool){

//         let width = $('.block.drag').width()/2;
//         let height = $('.block.drag').height()/2;
        

//         $('.block.drag').css(
//             {
//                 'left': (event.pageX-width) + 'px',
//                 'top': (event.pageY-height) + 'px',
//             }
//         ) 

//         if($('.cl_content').is(':hover')){
//             $('.cl_content').addClass('hover');
//         }else{
//             $('.cl_content').removeClass('hover');
//         }
//     }
// });

// $(document).on('mouseup',function(){
//     if(block_bool == true){
//         if($('.cl_content').hasClass('hover')){
//             let string = $('.block.drag .block__copy').html();
//             let block = '<div class="cl_block">' + string + '</div>';
//             $('.cl_content').append(block);
//             $('.cl_content').removeClass('hover');
//         }
//         $('.block.drag').removeClass('drag');
//         block_bool = false;
//     }else{
//         return;
//     }
// },)

// $('.block').on({
//     mousedown: function(event){
//         event.preventDefault();
//         $(this).addClass('drag');
//         block_bool = true
//     },
// });

$('#block-writer form').on('submit',function(){
    const clean = DOMPurify.sanitize($('.ql-editor').html());
    $('#block_copy').val(clean);
});



const quill = new Quill('.block_editor', {
    theme: 'snow'
});

let cl_col = $('.cl_content').sortable({


});

let block_col = $('#blocks').sortable({
   connectWith: ".cl_content",
   placeholder: "sortable-placeholder"
});
