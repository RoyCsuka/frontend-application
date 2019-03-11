$('.info-container').click( function(){
    if ( $(this).hasClass('open') ) {
        $(this).removeClass('open');
    } else {
        $('.info-container.open').removeClass('open');
        $(this).addClass('open');    
    }
});