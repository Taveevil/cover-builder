

$('#download.btn').on('click',function(){

    let position = $('#position').val();

    if (position){
        position = position.replace(" ","_")+"_";
    }else{
        position = "";
    }

    makePDF(position);


});

function makePDF(title){

    var element = document.querySelector('#cover_letter');

    console.log(element);

    try{
        var opt = {
            margin: 0,
            filename:     'Tavee_Villamar_'+title+'Cover_Letter',
            image:        { type: 'jpeg', quality: 4 },
            html2canvas:  { scale: 5, },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .save();

        

    }catch(msg){
        alert(msg);
    }


};