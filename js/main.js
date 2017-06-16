
//Sticky form
$(window).scroll(function(){
  if($(this).scrollTop()> 150) {
    $('.stickyForm').addClass('header-scrolled');
  } else {
    $('.stickyForm').removeClass('header-scrolled');
  }
})
