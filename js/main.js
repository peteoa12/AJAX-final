
//Sticky form
$(window).scroll(function(){
  if($(this).scrollTop()> 150) {
    $('.sticky').addClass('header-scrolled');
  } else {
    $('.sticky').removeClass('header-scrolled');
  }
})
