var croppie;

//on button click
$('.loadOrg').click(function(){
    // Get values
var src = $('#imgSrc').val();
var x = $('#imgX').val();
var y = $('#imgY').val();
var width = $('#imgWidth').val();
var height = $('#imgHeight').val();

if (src) {
    $('#img').attr('src',`${src}`);
}

if (src && x && y && width && height) {
    initCroppie(src,x,y,width,height)
}
});

$("#getCropped").click(function(){
    if(croppie){
        croppie.result('base64').then(function(blob) {
            $('#croppedImg').attr('src',`${blob}`);
             $('.rf-download').attr('href',`${blob}`);
        });
    }
});

function initCroppie(imgSrc,x,y,w,h){
    if (croppie) {
        croppie.destroy();
    }
    var el = document.getElementById('demo');
    croppie = new Croppie(el, {
        viewport:{
            width:  323,
            height: 323
        }
    });
    croppie.bind({
        url: `${imgSrc}`,
        points: [x,y,w,h],
    });
}
