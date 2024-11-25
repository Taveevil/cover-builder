

$('#download.btn').on('click',function(){
    let size_cache = $('#cover_letter').css('transform');
    $('#cover_letter').css('transform','scale(1)');
    $('#cover_letter').height(1056);
    $('#cover_letter').width(816);
    
    if(makePDF()){
        setTimeout(() => {
            $('#cover_letter').css('transform',size_cache);
        }, 100);
    }
});

function makePDF(){

    var element = document.querySelector('#cover_letter');

    let position = $('#position').val();

    if (position){
        position = position.replace(" ","_")+"_";
    }else{
        position = "";
    }

    try{
        var opt = {
            filename:     'Tavee_Villamar_'+position+'Cover_Letter',
            image:        { type: 'jpeg', quality: 5 },
            html2canvas:  { scale: 5,},
            jsPDF:        { size:'letter',orientation: 'portrait' }
        };
        html2pdf()
        .set(opt)
        .from(element)
        .toPdf(function(){debugger})
        .save();

        $('#cover_letter').css('width','');
        $('#cover_letter').css('height','');


    }catch(msg){
        alert(msg);
        
    }

    return true;
};